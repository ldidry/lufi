// vim:set sw=4 ts=4 sts=4 ft=javascript expandtab:

// total file counter
window.fc = 0;
// Cancelled files indexes
window.cancelled = [];
// Set websocket
window.ws = spawnWebsocket(0, function() {return null;});
// Use slice of 0.75MB
window.sliceLength = 750000;
// Global zip objects for currently created zip file
window.zip = null;
window.zipSize = 0;
// Init the list of files (used by LDAP invitation feature)
window.filesURLs = [];

// Copy a link to clipboard
function copyToClipboard(txt) {
    var textArea = $('<textarea>');
    textArea.addClass('textarea-hidden');
    textArea.val(txt);

    $('body').append(textArea);
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? i18n.copySuccess : i18n.copyFail;
        Materialize.toast(msg, 4000);
    } catch (err) {
        el.focus();
        var len = el.value.length * 2;
        el.setSelectionRange(0, len);
        alert(i18n.hit);
    }

    textArea.remove();
}

// Copy all links to clipboard
function copyAllToClipboard(event) {
    event.preventDefault();
    var text = new Array();
    var a = $('.link-input');
    var i;
    for (i = 0; i < a.length; i++) {
        text.push(a[i].value);
    }
    var textArea = $('<textarea>');
    textArea.addClass('textarea-hidden');
    textArea.val(text.join("\n"));

    $('body').append(textArea);
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? i18n.copySuccess : i18n.copyFail;
        Materialize.toast(msg, 4000);
    } catch (err) {
        textArea.removeClass('textarea-hidden');
        textArea.addClass('white-background');
        alert(i18n.hits);
    }

    textArea.remove();
}

// Add item to localStorage
function addItem(name, url, size, del_at_first_view, created_at, delay, short, token) {
    var files = localStorage.getItem(window.prefix + 'files');
    if (files === null) {
        files = new Array();
    } else {
        files = JSON.parse(files);
    }
    files.push({ name: name, short: short, url: url, size: size, del_at_first_view: del_at_first_view, created_at: created_at, delay: delay, token: token });
    localStorage.setItem(window.prefix + 'files', JSON.stringify(files));
}

// Remove a file block
function destroyBlock(el) {
    $(el).parents('li').remove();

    if ($('.link-input').length === 0) {
        $('#misc').empty();
        if ($('#results li').length === 0 && window.fileList === null) {
            $('#results').hide();
        }
    } else {
        updateMailLink();
    }
}

// When clicking on del at first view checkbox
function firstViewClicking() {
    if ($('#first-view').attr('data-checked') && $('#first-view').attr('data-checked') === 'data-checked') {
        $('#first-view').attr('data-checked', null);
    } else {
        $('#first-view').attr('data-checked', 'data-checked');
    }
}

// When clicking on zip checkbox
function zipClicking () {
    if ($('#zip-files').attr('data-checked') && $('#zip-files').attr('data-checked') === 'data-checked') {
        window.zipSize = 0;
        window.zip = null;
        $('#zip-files').attr('data-checked', null);
        $('#zipname').val('documents.zip');
        $('#zipname-input').addClass('hide');
        $('#zipping').addClass('hide');
        $('#files').removeClass('m6').addClass('m12');
        $('#zip-parts').html('');
        $('#delete-day').attr('disabled', null);
        $('#first-view').attr('disabled', null);
    } else {
        $('#zip-files').attr('data-checked', 'data-checked');
        $('#zipname-input').removeClass('hide');
        $('#zip-size').text(filesize(window.zipSize));
    }
}

// Get the zip file name
function getZipname() {
    var zipname = $('#zipname').val();
    if (zipname === '') {
        zipname = 'documents.zip';
    }
    if (!zipname.endsWith('.zip')) {
        if (zipname.endsWith('.')) {
            zipname += 'zip';
        } else {
            zipname += '.zip';
        }
    }

    return escapeHtml(zipname);
}

// Update the zip name
function updateZipname() {
    $('#zip-name').text(getZipname());
}

// Create blob from zip
function uploadZip(e) {
    e.preventDefault();
    var delay             = $('#delete-day');
    var del_at_first_view = $('#first-view');
    $('#zip-files').attr('disabled', 'disabled');
    $('#file-browser-button').attr('disabled', 'disabled');
    $('#file-browser-span').addClass('disabled');
    $('#uploadZip').addClass('hide');
    $('#zip-parts').text('');

    $('#zip-compressing').removeClass('hide');
    window.zip.generateAsync({type:"blob"})
        .then(function(zipFile) {
            // if $('#zipping') is hidden, the zipping has been aborted
            if (!$('#zipping').hasClass('hide')) {
                window.zip = null;
                $('#zipping').addClass('hide');
                $('#files').removeClass('m6').addClass('m12');
                $('#zipname-input').addClass('hide');
                $('#zip-compressing').addClass('hide');
                $('#uploadZip').removeClass('hide');
                $('#results').show();
                $('#zip-files').attr('disabled', null);

                var zipname = getZipname();
                var file = new File([zipFile], zipname, {type: 'application/zip'});

                Materialize.toast(i18n.enqueued.replace('XXX', zipname), 3000, 'teal accent-3');
                if (window.fileList === undefined || window.fileList === null) {
                    window.fileList = [file];
                    uploadFile(0, delay.val(), del_at_first_view.is(':checked'));
                } else {
                    window.fileList.push(file);
                }
            }
            $('#file-browser-button').attr('disabled', null);
            $('#file-browser-span').removeClass('disabled');
        });
}

// Update the mail link
function updateMailLink() {
    var a = $('.link-input');
    var l = new Array();
    var i;
    for (i = 0; i < a.length; i++) {
        l.push(a[i].id);
    }
    var u = actionURL+'m?links='+JSON.stringify(l);
    $('#mailto').attr('href', u);
}

// [Invitation feature] Send URLs of files to server
function sendFilesURLs() {
    if (window.filesURLs.length > 0) {
        $.ajax({
            url: sendFilesURLsURL,
            method: 'POST',
            dataType: 'json',
            data: {
                urls: window.filesURLs
            },
            success: function(data, textStatus, jqXHR) {
                if (data.success) {
                    Materialize.toast(data.msg, 6000, 'teal accent-3');
                } else {
                    Materialize.toast(data.msg, 10000, 'red accent-2');
                }
            }
        });
    }
}


// Start uploading the files (called from <input> and from drop zone)
function handleFiles(f) {
    var delay             = $('#delete-day');
    var zip_files         = $('#zip-files');
    var del_at_first_view = $('#first-view');

    delay.attr('disabled', 'disabled');
    del_at_first_view.attr('disabled', 'disabled');

    if (zip_files.is(':checked')) {
        if (window.zip === null) {
            window.zip = new JSZip();
        }
        $('#zipping').removeClass('hide');
        $('#files').removeClass('m12').addClass('m6');
        for (var i = 0; i < f.length; i++) {
            var element  = f.item(i);
            var filename = element.name;
            var origname = filename;
            var counter  = 0;
            while (typeof(window.zip.files[filename]) !== 'undefined') {
                counter += 1;
                filename = origname.substring(0, origname.lastIndexOf('.')) + '_(' + counter + ')' + origname.substring(origname.lastIndexOf('.'));
            }

            window.zip.file(filename, element);

            window.zipSize += element.size;
            $('#zip-size').text(filesize(window.zipSize));
            $('#zip-parts').append([
                '<li>',
                    '— ', filename, ' (', filesize(element.size), ')',
                '</li>'
            ].join(''));
        }
    } else {
        if (window.fileList === undefined || window.fileList === null) {
            window.fileList = Array.prototype.slice.call(f);
            for (var i = 0; i < window.fileList.length; i++) {
                var file = window.fileList[i];
                Materialize.toast(i18n.enqueued.replace('XXX', escapeHtml(file.name)), 3000, 'teal accent-3');
            }
            window.nbFiles  = window.fileList.length;
            $('#results').show();
            uploadFile(0, delay.val(), del_at_first_view.is(':checked'));
        } else {
            window.fileList = window.fileList.concat(Array.prototype.slice.call(f));
        }
    }
}

// Create random key
function genRandomKey() {
    return sjcl.codec.base64.fromBits(sjcl.random.randomWords(8, 10), 0);
}

// Create progress bar and call slicing and uploading function
function uploadFile(i, delay, del_at_first_view) {
    // Prevent exiting page before full upload
    window.onbeforeunload = confirmExit;

    // Create a random key, different for all files
    var randomkey = genRandomKey();

    // Get the file and properties
    var file  = window.fileList[i];
    var name  = escapeHtml(file.name);
    var size  = filesize(file.size);
    var parts = Math.ceil(file.size/window.sliceLength);
    if (parts === 0) {
        parts = 1;
    }

    // Create a progress bar for the file
    var r  = $('#ul-results');
    var w  = $('<li>');
    w.addClass('list-group-item');
    w.html(['<div class="card">',
                '<div>',
                    '<a href="#" id="destroy-', window.fc, '">',
                        '<i class="right mdi-navigation-close small"></i>',
                    '</a>',
                    '<div class="card-content">',
                        '<span class="card-title" id="name-', window.fc, '">', name, '</span> <span id="size-', window.fc ,'">(', size,')</span>',
                        '<p id="parts-', window.fc, '"></p>',
                    '</div>',
                    '<div class="progress">',
                        '<div id="progress-', window.fc, '" data-key="', randomkey, '" data-name="', name, '" aria-valuemax="100" aria-valuemin="0" aria-valuenow="0" role="progressbar" class="determinate width-0">',
                            '<span class="sr-only">', name, '0%</span>',
                        '</div>',
                    '</div>',
            '<div>'].join(''));
    r.prepend(w);
    $('#destroy-'+window.fc).on('click', function(event) {
        event.preventDefault();
        window.cancelled.push(i);
        destroyBlock(this);
    });

    sliceAndUpload(randomkey, i, parts, 0, delay, del_at_first_view, null, null);
}

// Get a slice of file and send it
function sliceAndUpload(randomkey, i, parts, j, delay, del_at_first_view, short, mod_token) {
    if (mod_token !== null && window.cancelled.includes(i)) {
        var data = JSON.stringify({
            id: short,
            mod_token: mod_token,
            cancel: true,
            i: i
        })+'XXMOJOXXuseless';
        // Verify that we have a websocket and send json
        if (window.ws.readyState === 3) {
            window.ws = spawnWebsocket(0, function() {
                window.ws.send(data);
            });
        } else {
            window.ws.onclose = function() {
                console.log('Websocket closed, waiting 10sec.');
                window.ws = spawnWebsocket(0, function() {return null;});
            };
            window.ws.onerror = function() {
                console.log('Error on Websocket, waiting 10sec.');
                window.ws = spawnWebsocket(0, function() {return null;});
            };
            window.ws.send(data);
        }
    } else {
        var file  = window.fileList[i];
        var slice = file.slice(j * window.sliceLength, (j + 1) * window.sliceLength, file.type);
        var fr = new FileReader();
        fr.onloadend = function() {
            var sl        = $('#parts-'+window.fc);

            // Get the binary result, different result in IE browsers (see default.html.ep line 27:48)
            if (isIE == true){
                var bin = fr.content;
            } else {
                var bin = fr.result;
            }

            // Transform it in base64
            var b         = window.btoa(bin);

            // Encrypt it
            var encrypted = sjcl.encrypt(randomkey, b);

            // Prepare json
            var data = {
                // number of parts
                total: parts,
                // part X of total
                part: j,
                size: file.size,
                name: file.name,
                type: file.type,
                delay: delay,
                del_at_first_view: del_at_first_view,
                zipped: $('#zip-files').is(':checked'),
                id: short,
                // number of the sent file in the queue
                i: i
            };
            if ($('#file_pwd').length === 1) {
                var pwd = $('#file_pwd').val();
                if (pwd !== undefined && pwd !== null && pwd !== '') {
                    data['file_pwd'] = $('#file_pwd').val();
                }
            }
            data = JSON.stringify(data)+'XXMOJOXX'+JSON.stringify(encrypted);;

            var percent = Math.round(1000 * j/parts)/10;
            console.log('sending slice '+(j + 1)+'/'+parts+' of file '+file.name+' ('+percent+'%)');

            sl.html(percent.toFixed(1)+'%');

            // Verify that we have a websocket and send json
            if (window.ws.readyState === 3) {
                window.ws = spawnWebsocket(0, function() {
                    window.ws.send(data);
                });
            } else {
                window.ws.onclose = function() {
                    console.log('Websocket closed, waiting 10sec.');
                    window.ws = spawnWebsocket(0, function() {
                        console.log('sending again slice '+(j + 1)+'/'+parts+' of file '+file.name);
                        window.ws.send(data);
                    });
                };
                window.ws.onerror = function() {
                    console.log('Error on Websocket, waiting 10sec.');
                    window.ws = spawnWebsocket(0, function() {
                        console.log('sending again slice '+(j + 1)+'/'+parts+' of file '+file.name);
                        window.ws.send(data);
                    });
                };
                window.ws.send(data);
            }
        }
        fr.readAsBinaryString(slice);
    }
}

// Update the progress bar
function updateProgressBar(data) {
    if (typeof(data.action) !== 'undefined' && data.action === 'cancel') {
        if (data.success) {
            console.log('Upload successfully cancelled');
        } else {
            console.log('Upload cancellation failed: ' + data.msg);
        }

        // Remove the cancelled index
        window.cancelled.splice(window.cancelled.indexOf(window.fc), 1);

        // Upload next file
        window.fc++;
        data.i++;
        if (data.i < window.fileList.length) {
            uploadFile(data.i, $('#delete-day').val(), $('#first-view').is(':checked'));
        } else {
            // We have finished
            window.cancelled = [];
            window.fileList = null;
            window.onbeforeunload = null;
            $('#delete-day').attr('disabled', null);
            $('#first-view').attr('disabled', null);
            if ($('#zip-files').is(':checked') && window.zip === null) {
                $('label[for="zip-files"]').click();
            }
        }
        if ($('#results li').length === 0 && window.fileList === null) {
            $('#results').hide();
        }
    } else {
        var i                 = data.i;
        var sent_delay        = data.sent_delay;
        var del_at_first_view = data.del_at_first_view;
        if (data.success) {
            var j          = data.j;
            var delay      = data.delay;
            var parts      = data.parts;
            var short      = data.short;
            var created_at = data.created_at;

            console.log('getting response for slice '+(j + 1)+'/'+parts+' of file '+data.name+' ('+data.duration+' sec)');

            var dp    = $('#progress-'+window.fc);
            var key   = dp.attr('data-key');

            if (j + 1 === parts) {
                //
                window.ws.onclose = function() {
                    console.log('Connection is closed.');
                };
                window.ws.onerror = function() {
                    console.log('Error on WebSocket connection but file has been fully send, so we don\'t care.');
                }

                $('#parts-'+window.fc).remove();
                var n       = $('#name-'+window.fc);
                var s       = $('#size-'+window.fc);
                var d       = $('<div>');
                var url     = baseURL+'r/'+short+'#'+key;
                var del_url = actionURL+'d/'+short+'/'+data.token;
                var links   = encodeURIComponent('["'+short+'"]');
                var limit   = (delay === 0) ? i18n.noLimit : i18n.expiration+' '+moment.unix(delay * 86400 + created_at).locale(window.navigator.language).format('LLLL');
                if (!isGuest) {
                    n.html(n.html()+' '+s.html()+' <a href="'+actionURL+'m?links='+links+'"><i class="mdi-communication-email"></i></a><br>'+limit);
                    d.html(['<div class="card-action">',
                                '<div class="input-field">',
                                    '<span class="prefix big-prefix">',
                                        '<a href="', url, '" target="_blank">',
                                            '<i class="mdi-file-file-download small" title="', i18n.dlText, '"></i>',
                                        '</a>',
                                        '<a href="#" id="copyurl-', window.fc, '" title="', i18n.cpText, '">',
                                            '<i class="mdi-content-content-copy small"></i>',
                                        '</a>',
                                    '</span>',
                                    '<input id="', short, '" class="form-control link-input white-background" value="', url, '" readonly="" type="text">',
                                    '<label class="active" for="', short, '">', i18n.dlText, '</label>',
                                '</div>',
                                '<div class="input-field">',
                                    '<a href="', del_url, '" target="_blank" class="prefix big-prefix">',
                                        '<i class="mdi-action-delete small" title="', i18n.delText, '"></i>',
                                    '</a>',
                                    '<input id="delete-', short, '" class="form-control white-background" value="', del_url, '" readonly="" type="text">',
                                    '<label class="active" for="delete-', short, '">', i18n.delText, '</label>',
                                '</div>',
                            '</div>'].join(''));
                } else {
                    n.html(n.html()+' '+s.html());
                }
                s.remove();

                var p2 = dp.parent();
                var p1 = p2.parent();

                p2.remove();
                p1.append(d);

                $('#copyurl-'+window.fc).on('click', function(e) {
                    e.preventDefault();
                    copyToClipboard(url);
                });
                $("input[type='text']").on("click", function () {
                    $(this).select();
                });
                // Add copy all and mailto buttons
                var misc = $('#misc');
                if (misc.html() === '' && !isGuest) {
                    misc.html('<a href="#" id="copyall" class="btn btn-info">'+i18n.copyAll+'</a> <a id="mailto" href="'+actionURL+'m?links='+links+'" class="btn btn-info">'+i18n.mailTo+'</a>');
                    $('#copyall').on('click', copyAllToClipboard);
                } else {
                    updateMailLink();
                }

                // Add the file to localStorage
                if (!isGuest) {
                    addItem(data.name, url, data.size, del_at_first_view, created_at, delay, data.short, data.token);
                }

                if (isGuest && short !== null) {
                    window.filesURLs.push(JSON.stringify({ name: data.name, short: data.short, url: url, size: data.size, created_at: created_at, delay: delay, token: data.token }));
                }

                // Upload next file
                window.fc++;
                i++;
                if (i < window.fileList.length) {
                    uploadFile(i, sent_delay, del_at_first_view);
                } else {
                    // We have finished
                    window.fileList = null;
                    window.onbeforeunload = null;
                    $('#delete-day').attr('disabled', null);
                    $('#first-view').attr('disabled', null);
                    if ($('#zip-files').is(':checked') && window.zip === null) {
                        $('label[for="zip-files"]').click();
                    }
                    if (isGuest) {
                        sendFilesURLs();
                    }
                }
                if ($('#results li').length === 0 && window.fileList === null) {
                    $('#results').hide();
                }
            } else {
                j++;
                // Update progress bar
                var percent = Math.round(1000 * j/parts)/10;
                var wClass  = percent.toString().replace('.', '-');
                dp.removeClass();
                dp.addClass('determinate');
                dp.addClass('width-'+wClass);
                dp.attr('aria-valuenow', percent);

                // Encrypt and upload next slice
                sliceAndUpload(key, i, parts, j, delay, del_at_first_view, short, data.token);
            }
        } else {
            addAlertOnFile(data.msg, i, delay, del_at_first_view);
            if (isGuest) {
                sendFilesURLs();
            }
        }
    }
}



// Write message instead in a file block
function addAlertOnFile(msg, i, sent_delay, del_at_first_view) {
    var n       = $('#name-'+window.fc);
    var p       = $('#progress-'+window.fc);
    var d       = $('<div>');

    p.parent().remove();
    d.addClass('card pink');
    d.html(['<div class="card-content white-text">',
                '<strong>', msg, '</strong>',
            '</div>'].join(''));
    n.parent().append(d);

    // Upload next file
    window.fc++;
    i++;
    if (i < window.fileList.length) {
        uploadFile(i, sent_delay, del_at_first_view);
    } else {
        // We have finished
        window.onbeforeunload = null;
        $('#zip-files').attr('disabled', null);
        $('#delete-day').attr('disabled', null);
        $('#first-view').attr('disabled', null);
    }
}

// Dropzone events functions
function handleDrop(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var f = evt.dataTransfer.files; // FileList object
    handleFiles(f);
}
function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

// Spawn websocket
function spawnWebsocket(i, callback) {
    if (i === undefined || i === null) {
        i = 0;
    }
    var ws       = new WebSocket(ws_url);
    ws.onopen    = function() {
        console.log('Connection is established!');
        if (callback !== undefined) {
            callback();
        }
    };
    ws.onclose   = function() {
        console.log('Connection is closed.');
    }
    ws.onmessage = function(e) {
        updateProgressBar(JSON.parse(e.data));
    }
    ws.onerror = function() {
        console.log('error');
        if (i < 5 && callback !== undefined) {
            console.log('Retrying to send file (try '+i+' of 5)');
            window.ws = spawnWebsocket(i + 1, callback);
        }
    }
    return ws;
}

// Dropzone events binding
function bindDropZone() {
    var dropZone = document.getElementById('files');
    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleDrop, false);
    $('#file-browser-span').removeClass('disabled');
    $('#file-browser-span').addClass('cyan');
    $('#file-browser-button').attr('disabled', null);
    $('#file-browser-button').on('change', function(e) {
        handleFiles(this.files);
    });
}

// When it's ready
$(document).ready(function() {
    $('#zip-files').prop('checked', false);
    $('#first-view').prop('checked', false);
    $('#zipname').val('documents.zip');
    if (!sjcl.random.isReady(10)) {
        var loop = setInterval(function() {
            if (!sjcl.random.isReady(10)) {
                $('#not-enough-entropy').removeClass('hiddendiv');
            } else {
                $('#not-enough-entropy').addClass('hiddendiv');
                bindDropZone();
                clearInterval(loop);
            }
        }, 1000);
    } else {
        bindDropZone();
    }
    if (maxSize > 0) {
        $('#max-file-size').text(i18n.maxSize.replace('XXX', filesize(maxSize)));
    }
    $('label[for="first-view"]').on('click', firstViewClicking);
    $('label[for="zip-files"]').on('click', zipClicking);
    $('#zipname').on('input', updateZipname);
    $('#uploadZip').on('click', uploadZip);
    $('#reset-zipping').on('click', function() {
        window.zip = null;
        $('label[for="zip-files"]').click();
        $('#zip-files').attr('disabled', null);
        $('#zip-compressing').addClass('hide');
        $('#file-browser-button').attr('disabled', null);
        $('#file-browser-span').removeClass('disabled');
        $('#files').removeClass('m6').addClass('m12');
    });
});
