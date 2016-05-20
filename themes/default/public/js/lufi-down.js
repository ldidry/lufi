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
    $('#please-wait').remove();

    var pbd = $('#pbd');
    pbd.attr('role', 'alert');
    pbd.removeClass('progress');
    pbd.html(['<div class="card pink">',
                  '<div class="card-content white-text">',
                      '<strong>', msg, '</strong>',
                  '</div>',
              '</div>'].join(''));
}

// Spawn WebSocket
function spawnWebsocket(pa) {
    var ws       = new WebSocket(ws_url);
    ws.onopen    = function() {
        console.log('Connection is established!');

        var l    = $('#loading');
        l.html(i18n.loading.replace(/XX1/, (pa + 1)));
        window.ws.send('{"part":'+pa+'}');
    };
    ws.onclose   = function() {
        console.log('Connection is closed');
        if (!window.completed) {
            console.log('Connection closed. Retrying to get slice '+pa);
            window.ws = spawnWebsocket(pa);
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
            var pb      = $('#pb');
            pb.css('width', percent+'%');
            pb.attr('aria-valuenow', percent);
            $('#pbt').html(percent+'%');
            try {
                var b64 = sjcl.decrypt(window.key, slice);
                window.a[data.part] = base64ToArrayBuffer(b64);
                if (data.part + 1 === data.total) {
                    var blob = new Blob(a, {type: data.type});

                    $('#please-wait').remove();
                    $('#loading').remove();

                    var pbd  = $('#pbd');
                    pbd.attr('class', 'center-align');
                    var blobURL   = URL.createObjectURL(blob);
                    var innerHTML = [ '<p><a href="', blobURL, '" class="btn btn-primary" download="', data.name, '">', i18n.download, '</a></p>'];

                    if (data.type.match(/^image\//) !== null) {
                        innerHTML.push('<img id="render-image" class="responsive-img" alt="', data.name, '" src="', blobURL, '">');
                    } else if (data.type.match(/^video\//) !== null) {
                        innerHTML.push('<video class="responsive-video" controls>',
                                           '<source src="', blobURL, '" type="', data.type, '">',
                                       '</video>');
                    }
                    pbd.html(innerHTML.join(''));

                    window.ws.send('{"ended":true}');
                    window.onbeforeunload = null;
                    window.completed = true;
                    $('#abort').remove();
                } else {
                    var l = $('#loading');
                    l.html(i18n.loading.replace(/XX1/, (data.part + 1)));
                    if (ws.readyState === 3) {
                        window.ws = spawnWebsocket(data.part + 1);
                    } else {
                        window.ws.onclose = function() {
                            console.log('Connection is closed');
                            if (!window.completed) {
                                console.log('Connection closed. Retrying to get slice '+(data.part + 1));
                                window.ws = spawnWebsocket(data.part + 1);
                            }
                        }
                        window.ws.onerror = function() {
                            console.log('Error. Retrying to get slice '+(data.part + 1));
                            window.ws = spawnWebsocket(data.part + 1);
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
        console.log('Error. Retrying to get slice '+pa);
        window.ws = spawnWebsocket(pa);
    }
    return ws;
}
// When it's ready
$(document).ready(function(){
    $('#abort').click(function() {
        window.ws.onclose = function() {};
        window.ws.close();
        $('#please-wait, #loading, #pbd, #abort').remove();
        $('#filesize').parent().append('<h4>'+i18n.aborted1+'</h4><a onClick="window.location.reload();" class="waves-effect waves-light btn">'+i18n.aborted2+'</a></p>');
        window.onbeforeunload = null;
    });
    $('#filesize').html(filesize($('#filesize').attr('data-filesize'), {base: 10}));
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
