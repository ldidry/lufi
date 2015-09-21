// vim:set sw=4 ts=4 sts=4 ft=javascript expandtab:
/*
 * Return the deciphering key stored in anchor part of the URL
 * Stolen from https://github.com/sebsauvage/ZeroBin/blob/master/js/zerobin.js
 */
function pageKey() {
    var key = window.location.hash.substring(1);  // Get key

    // Some stupid web 2.0 services and redirectors add data AFTER the anchor
    // (such as &utm_source=...).
    // We will strip any additional data.

    // First, strip everything after the equal sign (=) which signals end of base64 string.
    i = key.indexOf('='); if (i>-1) { key = key.substring(0,i+1); }

    // If the equal sign was not present, some parameters may remain:
    i = key.indexOf('&'); if (i>-1) { key = key.substring(0,i); }

    // Then add trailing equal sign if it's missing
    if (key.charAt(key.length-1)!=='=') key+='=';

    return key;
}
function base64ToArrayBuffer(base64) {
    var binary_string =  window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array( len );
    for (var i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

// Spawn WebSocket
function spawnWebsocket() {
    var ws       = new WebSocket(ws_url);
    ws.onopen    = function() {
        console.log('Connection is established!');
        ws.send('{"part":0}');
    };
    ws.onclose   = function() {
        console.log('Connection is closed');
    }
    ws.onmessage = function(e) {
        var res  = e.data.split('XXMOJOXX');
        var json = res.shift();
        var data = JSON.parse(json);

        if (data.msg !== undefined) {
            document.getElementById('please-wait').remove();

            var pbd = document.getElementById('pbd');
            pbd.setAttribute('class', 'alert alert-danger');
            pbd.setAttribute('role', 'alert');
            pbd.innerHTML = '<p>'+data.msg+'</p>';
        } else {
            var slice   = JSON.parse(res.shift());
            var percent = Math.round(100 * (data.part + 1)/data.total);
            var pb      = document.getElementById('pb');
            pb.style.width = percent+'%';
            pb.setAttribute('aria-valuenow', percent);
            document.getElementById('pbt').innerHTML = percent+'%';
            window.a.push(base64ToArrayBuffer(sjcl.decrypt(window.key, slice)));
            if (data.part + 1 === data.total) {
                var blob = new File(a, data.name, {type: data.type});

                document.getElementById('please-wait').remove();

                var pbd  = document.getElementById('pbd');
                pbd.setAttribute('class', '');
                pbd.innerHTML = '<a href="'+URL.createObjectURL(blob)+'" class="btn btn-primary" download="'+data.name+'">Download</a>';

                ws.send('{"ended":true}');
            } else {
                if (ws.readyState === 3) {
                    ws = spawnWebsocket();
                }
                ws.send('{"part":'+(data.part + 1)+'}');
            }
        }
    }
    ws.onerror = function() {
        console.log('error');
    }
}

// When it's ready
document.addEventListener('DOMContentLoaded', function() {
    window.a   = new Array();
    window.key = pageKey();
    // Set websocket
    ws = spawnWebsocket();
});
