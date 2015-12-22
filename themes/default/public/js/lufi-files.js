// Add item to localStorage
function addItem(item) {
    var files = localStorage.getItem('files');
    if (files === null) {
        files = new Array();
    } else {
        files = JSON.parse(files);
    }
    files.push(item);
    localStorage.setItem('files', JSON.stringify(files));
}

function delItem(name) {
    var files = localStorage.getItem('files');
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
    localStorage.setItem('files', JSON.stringify(files));
}

function itemExists(name) {
    var files = localStorage.getItem('files');
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

function purgeExpired() {
    var files = JSON.parse(localStorage.getItem('files'));

    files.forEach(function(element, index, array) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', counterURL);
        xhr.onreadystatechange = function() {
            if (xhr.readyState>3 && xhr.status==200) {
                var data = JSON.parse(xhr.responseText);
                if (data.success) {
                    if (data.deleted) {
                        document.getElementById('count-'+data.short).parentNode.remove();
                        delItem(data.short);
                    }
                }
            }
        };
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send('short='+element.short+'&token='+element.token);
    });
}

function exportStorage() {
    var a   = document.createElement("a");
    a.style = "display: none";
    document.body.appendChild(a);

    var storageData = [localStorage.getItem('files')];
    var exportFile  = new Blob(storageData, {type : 'application/json'});
    var url         = window.URL.createObjectURL(exportFile);

    a.href = url;
    a.setAttribute('download', 'data.json');
    a.click();
    a.remove();
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
                if (!itemExists(item.short)) {
                    addItem(item);
                    hasImported++;
                }
            }
            populateFilesTable();

            alert(i18n.importProcessed);
        } catch(err) {
            alert(err);
        }
    });
    reader.readAsArrayBuffer(f[0]);
}

function populateFilesTable() {
    document.getElementById('myfiles').innerHTML = '';

    var files = JSON.parse(localStorage.getItem('files'));
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
        var del_view   = (element.del_at_first_view) ? '<span class="icon icon-ok"></span>' : '<span class="icon icon-cancel"></span>';
        var dlink      = baseURL+'d/'+element.short+'/'+element.token;
        var limit      = (element.delay === 0) ? i18n.noExpiration : moment.unix(element.delay * 86400 + element.created_at).locale(window.navigator.language).format('LLLL');
        var created_at = moment.unix(element.created_at).locale(window.navigator.language).format('LLLL');

        var tr = document.createElement('tr');
        tr.innerHTML = '<td class="text-left">'
            +element.name
            +'</td><td class="text-left">'
            +'<a href="'+element.url+'" class="classic">'+element.url+'</a>'
            +'</td><td id="count-'+element.short+'" class="text-center">'
            +'</td><td class="text-center">'
            +del_view
            +'</td><td>'
            +created_at
            +'</td><td>'
            +limit
            +'</td><td class="text-left">'
            +'<a href="'+dlink+'" class="classic">'+dlink+'</a>'
            +'</td>';
        document.getElementById('myfiles').appendChild(tr);

        var xhr = new XMLHttpRequest();
        xhr.open('POST', counterURL);
        xhr.onreadystatechange = function() {
            if (xhr.readyState>3 && xhr.status==200) {
                var data = JSON.parse(xhr.responseText);
                if (data.success) {
                    document.getElementById('count-'+data.short).innerHTML = data.counter;
                    if (data.deleted) {
                        document.getElementById('count-'+data.short).parentNode.setAttribute('class', 'danger');
                    }
                } else {
                    alert(data.msg);
                    document.getElementById('count-'+data.short).parentNode.remove();
                    if (data.missing) {
                        delItem(data.short);
                    }
                }
            }
        };
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send('short='+element.short+'&token='+element.token);
    });
}
