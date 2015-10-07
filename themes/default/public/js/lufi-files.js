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

function populateFilesTable() {
    var files = JSON.parse(localStorage.getItem('files'));
    files.reverse();
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
