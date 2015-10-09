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

// Something's wring
function addAlert(msg) {
    document.getElementById('please-wait').remove();

    var pbd = document.getElementById('pbd');
    pbd.setAttribute('class', 'alert alert-danger');
    pbd.setAttribute('role', 'alert');
    pbd.innerHTML = '<p>'+msg+'</p>';
}

// Spawn WebSocket
function spawnWebsocket(pa) {
    var ws       = new WebSocket(ws_url);
    ws.onopen    = function() {
        console.log('Connection is established!');
        window.ws.send('{"part":'+pa+'}');
    };
    ws.onclose   = function() {
        console.log('Connection is closed');
        if (!window.completed) {
            console.log('Connection closed. Retrying to get slice '+pa+' in 5 seconds');
            setTimeout(function() {
                window.ws = spawnWebsocket(pa);
            }, 5000);
        }
    }
    ws.onmessage = function(e) {
        var res  = e.data.split('XXMOJOXX');
        var json = res.shift();
        var data = JSON.parse(json);

        if (data.msg !== undefined) {
            addAlert(data.msg);
            console.log(data.msg);
            window.onbeforeunload = null;
        } else {
            console.log('Getting slice '+(data.part + 1)+' of '+data.total);
            var slice   = JSON.parse(res.shift());
            var percent = Math.round(100 * (data.part + 1)/data.total);
            var pb      = document.getElementById('pb');
            pb.style.width = percent+'%';
            pb.setAttribute('aria-valuenow', percent);
            document.getElementById('pbt').innerHTML = percent+'%';
            try {
                var b64 = sjcl.decrypt(window.key, slice);
                window.a[data.part] = base64ToArrayBuffer(b64);
                if (data.part + 1 === data.total) {
                    var blob = new File(a, data.name, {type: data.type});

                    document.getElementById('please-wait').remove();

                    var pbd  = document.getElementById('pbd');
                    pbd.setAttribute('class', '');
                    pbd.innerHTML = '<a href="'+URL.createObjectURL(blob)+'" class="btn btn-primary" download="'+data.name+'">'+i18n.download+'</a>';

                    window.ws.send('{"ended":true}');
                    window.onbeforeunload = null;
                    window.completed = true;
                } else {
                    if (ws.readyState === 3) {
                        window.ws = spawnWebsocket(data.part + 1);
                    } else {
                        window.ws.onclose = function() {
                            console.log('Connection is closed');
                            if (!window.completed) {
                                console.log('Connection closed. Retrying to get slice '+(data.part + 1)+' in 5 seconds');
                                setTimeout(function() {
                                    window.ws = spawnWebsocket(data.part + 1);
                                }, 5000);
                            }
                        }
                        window.ws.onerror = function() {
                            console.log('Error. Retrying to get slice '+(data.part + 1)+' in 5 seconds');
                            setTimeout(function() {
                                window.ws = spawnWebsocket(data.part + 1);
                            }, 5000);
                        };
                        window.ws.send('{"part":'+(data.part + 1)+'}');
                    }
                }
            } catch(err) {
                if (err.message === 'ccm: tag doesn\'t match') {
                    addAlert(i18n.badkey);
                } else {
                    addAlert(err.message);
                }
                window.onbeforeunload = null;
            }
        }
    }
    ws.onerror = function() {
        console.log('Error. Retrying to get slice '+pa+' in 5 seconds');
        setTimeout(function() {
            window.ws = spawnWebsocket(pa);
        }, 5000);
    }
    return ws;
}
// When it's ready
document.addEventListener('DOMContentLoaded', function() {
    window.a         = new Array();
    window.key       = pageKey();
    window.completed = false;

    if (key !== '=') {
        // Set websocket
        window.ws = spawnWebsocket(0);

        // Prevent exiting page before full download
        window.onbeforeunload = confirmExit;
    } else {
        addAlert(i18n.nokey);
    }
});
