// vim:set sw=4 ts=4 sts=4 ft=javascript expandtab:
// Escape HTML chars
var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
};

function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
        return entityMap[s];
    });
}
function changeLang() {
    window.location = langUrl+$(this).val();
}
function formatDate(unixTimestamp) {
    return new Date(unixTimestamp * 1000).toLocaleString(window.navigator.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit',
    })
}
function delItem(name) {
    var files = localStorage.getItem(`${window.prefix}files`);
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
    localStorage.setItem(`${window.prefix}files`, JSON.stringify(files));
}
$(document).ready(function(){
    $('select').material_select();
    $(".select-lang select").on('change', changeLang);
    $(".select-lang-mobile select").on('change', changeLang);
});
