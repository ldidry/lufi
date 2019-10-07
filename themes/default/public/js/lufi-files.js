// vim:set sw=4 ts=4 sts=4 ft=javascript expandtab:
// Add item to localStorage
function addItem(item) {
    var files = localStorage.getItem(window.prefix + 'files');
    if (files === null) {
        files = new Array();
    } else {
        files = JSON.parse(files);
    }
    files.push(item);
    localStorage.setItem(window.prefix + 'files', JSON.stringify(files));
}

function delItem(name) {
    var files = localStorage.getItem(window.prefix + 'files');
    if (files === null) {
        files = new Array();
    } else {
        files = JSON.parse(files);
    }
    var i;
    for (i = 0; i < files.length; i++) {
        if (files[i].short === name) {
            files.splice(i, 1);
        }
    }
    localStorage.setItem(window.prefix + 'files', JSON.stringify(files));
}

function itemExists(name) {
    var files = localStorage.getItem(window.prefix + 'files');
    if (files === null) {
        return false;
    } else {
        files = JSON.parse(files);
        var i;
        for (i = 0; i < files.length; i++) {
            if (files[i].short === name) {
                return true;
            }
        }
        return false;
    }
}

function invertSelection(event) {
    event.preventDefault();
    $('input[type="checkbox"]').each(function() {
        var el = $(this);
        el.click();
        if (el.attr('data-checked') && el.attr('data-checked') === 'data-checked') {
            el.attr('data-checked', null);
        } else {
            el.attr('data-checked', 'data-checked');
        }
    });
    evaluateMassDelete();
}

function purgeExpired(event) {
    event.preventDefault();
    var files = JSON.parse(localStorage.getItem(window.prefix + 'files'));

    files.forEach(function(element, index, array) {
        $.ajax({
            url: counterURL,
            method: 'POST',
            dataType: 'json',
            data: {
                short: element.short,
                token: element.token
            },
            success: function(data, textStatus, jqXHR) {
                if (data.success) {
                    if (data.deleted) {
                        $('#count-'+data.short).parent().remove();
                        delItem(data.short);
                    }
                }
            }
        });
    });
}

function exportStorage(event) {
    event.preventDefault();
    var a   = $('<a id="data-json">');
    a.hide();
    $('body').append(a);

    var storageData = [localStorage.getItem(window.prefix + 'files')];
    var exportFile  = new Blob(storageData, {type : 'application/json'});
    var url         = window.URL.createObjectURL(exportFile);

    a.attr('href', url);
    a.attr('download', 'data.json');
    $('#data-json')[0].click();
    $('#data-json').remove();
}

function importStorage(f) {
    var reader = new FileReader();
    reader.addEventListener("loadend", function() {
        try {
            var newFiles = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(reader.result)));
            var i;
            var hasImported = 0;
            for (i = 0; i < newFiles.length; i++) {
                var item = newFiles[i];
                if (validURL(item.url) && !itemExists(item.short)) {
                    addItem(item);
                    hasImported++;
                }
            }
            populateFilesTable();

            Materialize.toast(i18n.importProcessed);
        } catch(err) {
            alert(err);
        }
    });
    reader.readAsArrayBuffer(f[0]);
}

function validURL(str) {
    try {
        var url = new URL(str);
        if (url.host) {
            return true;
        } else {
            return false;
        }
    } catch(e) {
        return false;
    }
}

function delFile() {
    var dlink = $(this).attr('data-dlink');
    var short = $(this).attr('data-short');
    $.ajax({
        url: dlink,
        method: 'GET',
        data: {
            format: 'json'
        },
        success: function(data) {
            if (data.success) {
                $('#row-'+short).remove();
                delItem(short);
            } else {
                alert(data.msg);
            }
            evaluateMassDelete();
        },
        error: function() {
        },
        complete: function() {
        }
    });
}

function evaluateMassDelete() {
    if ($('input[data-checked="data-checked"]').length > 0) {
        $('#mass-delete').removeAttr('disabled');
        $('#mass-delete').removeClass('disabled');
    } else {
        $('#mass-delete').attr('disabled');
        $('#mass-delete').addClass('disabled');
    }
}

function massDelete(event) {
    event.preventDefault();
    $('input[data-checked="data-checked"]').each(delFile);
}

function populateFilesTable() {
    $('#myfiles').empty();

    var files = localStorage.getItem(window.prefix + 'files');
    if (files === null) {
        var filesWithoutPrefix = localStorage.getItem('files');
        if (filesWithoutPrefix !== null) {
            if (window.confirm(i18n.importFilesWithoutPrefix)) {
                localStorage.setItem(window.prefix + 'files', filesWithoutPrefix);
                files = JSON.parse(filesWithoutPrefix);
            } else {
                localStorage.setItem(window.prefix + 'files', JSON.stringify([]));
                files = new Array();
            }
        } else {
            files = new Array();
        }
    } else {
        files = JSON.parse(files);
    }
    files.sort(function(a, b) {
        if (a.created_at < b.created_at) {
            return -1;
        } else if (a.created_at > b.created_at) {
            return 1;
        } else {
            return 0
        }
    });
    files.forEach(function(element, index, array) {
        var del_view   = (element.del_at_first_view) ? '<i class="small mdi-action-done"></i>' : '<i class="small mdi-navigation-close"></i>';
        var dlink      = actionURL+'d/'+element.short+'/'+element.token;
        var limit      = (element.delay === 0) ? i18n.noExpiration : moment.unix(element.delay * 86400 + element.created_at).locale(window.navigator.language).format('LLLL');
        var created_at = moment.unix(element.created_at).locale(window.navigator.language).format('LLLL');

        var tr = $('<tr id="row-'+element.short+'">');
        tr.html([ '<td class="center-align">',
                      '<input type="checkbox" id="check-', element.short,'" data-short="', element.short, '" data-dlink="', dlink, '" data-checked="">',
                      '<label for="check-', element.short,'"></label>',
                  '</td>',
                  '<td class="left-align">',
                      escapeHtml(element.name),
                  '</td>',
                  '<td class="center-align">',
                      '<a href="', element.url, '" class="classic"><i class="small mdi-file-file-download"></i></a>',
                  '</td>',
                  '<td id="count-', element.short, '" class="center-align">',
                  '</td>',
                  '<td class="center-align">',
                      del_view,
                  '</td>',
                  '<td>',
                      created_at,
                  '</td>',
                  '<td>',
                      limit,
                  '</td>',
                  '<td class="center-align">',
                      '<a id="del-', element.short, '" data-short="', element.short, '" data-dlink="', dlink, '" href="#" class="classic"><i class="small mdi-action-delete"></i></a>',
                  '</td>',
                  '<td class="center-align">',
                      '<a href="'+actionURL+'m?links=[&quot;'+element.short+'&quot;]" class="classic"><i class="small mdi-communication-email"></i></a>',
                  '</td>'].join(''));
        $('#myfiles').append(tr);
        $('#del-'+element.short).on('click', delFile);
        $('label[for="check-'+element.short+'"]').on('click', function(){
            if ($('#check-'+element.short).attr('data-checked') && $('#check-'+element.short).attr('data-checked') === 'data-checked') {
                $('#check-'+element.short).attr('data-checked', null);
            } else {
                $('#check-'+element.short).attr('data-checked', 'data-checked');
            }
            evaluateMassDelete();
        });

        $.ajax({
            url: counterURL,
            method: 'POST',
            dataType: 'json',
            data: {
                short: element.short,
                token: element.token
            },
            success: function(data, textStatus, jqXHR) {
                if (data.success) {
                    $('#count-'+data.short).html(data.counter);
                    if (data.deleted) {
                        $('#count-'+data.short).parent().addClass('purple lighten-4');
                    }
                } else {
                    alert(data.msg);
                    $('#count-'+data.short).parent().remove();
                    if (data.missing) {
                        delItem(data.short);
                    }
                }
            }
        });
    });
}

function clickImport(event) {
    event.preventDefault();
    $('#import').click();
}
