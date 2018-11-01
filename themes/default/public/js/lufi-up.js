// vim:set sw=4 ts=4 sts=4 ft=javascript expandtab:

window.fc = 0;
// Set websocket
window.ws = spawnWebsocket(0, function() {return null;});
// Use slice of 2MB
window.sliceLength = 2000000;

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
    var files = localStorage.getItem('files');
    if (files === null) {
        files = new Array();
    } else {
        files = JSON.parse(files);
    }
    files.push({ name: name, short: short, url: url, size: size, del_at_first_view: del_at_first_view, created_at: created_at, delay: delay, token: token });
    localStorage.setItem('files', JSON.stringify(files));
}

// Remove a file block
function destroyBlock(el) {
    $(el).parents('li').remove();

    var a = $('.link-input');
    var l = $('#results li');
    if (a.length === 0) {
        $('#misc').empty();
        if (l.length === 0) {
            $('#results').hide();
        }
    } else {
        updateMailLink();
    }
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

// Start uploading the files (called from <input> and from drop zone)
function handleFiles(f) {
    var delay             = $('#delete-day');
    var zip_files         = $('#zip-files');
    var del_at_first_view = $('#first-view');

    delay.attr('disabled', 'disabled');
    zip_files.attr('disabled', 'disabled');
    del_at_first_view.attr('disabled', 'disabled');

    if (zip_files.is(':checked')) {
        var zip = new JSZip();
        $('#zipping').show();
        for (var i = 0; i < f.length; i++) {
            var element = f.item(i);
            zip.file(element.name, new Blob([element]));
        }
        zip.generateAsync({type:"blob"})
            .then(function(zipFile) {
                $('#zipping').hide();
                $('#results').show();
                var file = new File([zipFile], 'documents.zip', {type: 'application/zip'});

                if (window.fileList === undefined || window.fileList === null) {
                    window.fileList = [file];
                    uploadFile(0, delay.val(), del_at_first_view.is(':checked'));
                } else {
                    window.fileList.push(file);
                }
            });
    } else {
        if (window.fileList === undefined || window.fileList === null) {
            window.fileList = Array.prototype.slice.call(f);
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
        destroyBlock(this)
    });

    sliceAndUpload(randomkey, i, parts, 0, delay, del_at_first_view, null);
}

// Get a slice of file and send it
function sliceAndUpload(randomkey, i, parts, j, delay, del_at_first_view, short) {
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
        sl.html(i18n.encrypting.replace(/XX1(.*)XX2/, (j+1)+'$1'+parts));
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
        data = JSON.stringify(data);

        console.log('sending slice '+(j + 1)+'/'+parts+' of file '+file.name);

        sl.html(i18n.sending.replace(/XX1(.*)XX2/, (j+1)+'$1'+parts));

        // Verify that we have a websocket and send json
        if (window.ws.readyState === 3) {
            window.ws = spawnWebsocket(0, function() {
                window.ws.send(data+'XXMOJOXX'+JSON.stringify(encrypted));
            });
        } else {
            window.ws.onclose = function() {
                console.log('Websocket closed, waiting 10sec.');
                window.ws = spawnWebsocket(0, function() {
                    console.log('sending again slice '+(j + 1)+'/'+parts+' of file '+file.name);
                    window.ws.send(data+'XXMOJOXX'+JSON.stringify(encrypted));
                });
            };
            window.ws.onerror = function() {
                console.log('Error on Websocket, waiting 10sec.');
                window.ws = spawnWebsocket(0, function() {
                    console.log('sending again slice '+(j + 1)+'/'+parts+' of file '+file.name);
                    window.ws.send(data+'XXMOJOXX'+JSON.stringify(encrypted));
                });
            };
            window.ws.send(data+'XXMOJOXX'+JSON.stringify(encrypted));
        }
    }
    fr.readAsBinaryString(slice);
}

// Update the progress bar
function updateProgressBar(data) {
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
            if (misc.html() === '') {
                misc.html('<a href="#" id="copyall" class="btn btn-info">'+i18n.copyAll+'</a> <a id="mailto" href="'+actionURL+'m?links='+links+'" class="btn btn-info">'+i18n.mailTo+'</a>');
                $('#copyall').on('click', copyAllToClipboard);
            } else {
                updateMailLink();
            }

            // Add the file to localStorage
            addItem(data.name, url, data.size, del_at_first_view, created_at, delay, data.short, data.token);

            // Upload next file
            window.fc++;
            i++;
            if (i < window.fileList.length) {
                uploadFile(i, sent_delay, del_at_first_view);
            } else {
                // We have finished
                window.fileList = null;
                window.onbeforeunload = null;
                $('#zip-files').attr('disabled', null);
                $('#delete-day').attr('disabled', null);
                $('#first-view').attr('disabled', null);
            }
        } else {
            j++;
            // Update progress bar
            var percent    = Math.round(100 * j/parts);
            dp.removeClass();
            dp.addClass('determinate');
            dp.addClass('width-'+percent);
            dp.attr('aria-valuenow', percent);

            // Encrypt and upload next slice
            sliceAndUpload(key, i, parts, j, delay, del_at_first_view, short);
        }
    } else {
        addAlertOnFile(data.msg, i, delay, del_at_first_view);
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
$(document).ready(function(){
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
    $('label[for="first-view"]').on('click', function(){
        if ($('#first-view').attr('data-checked') && $('#first-view').attr('data-checked') === 'data-checked') {
            $('#first-view').attr('data-checked', null);
        } else {
            $('#first-view').attr('data-checked', 'data-checked');
        }
    });
    $('label[for="zip-files"]').on('click', function(){
        if ($('#zip-files').attr('data-checked') && $('#zip-files').attr('data-checked') === 'data-checked') {
            $('#zip-files').attr('data-checked', null);
        } else {
            $('#zip-files').attr('data-checked', 'data-checked');
        }
    });
});
