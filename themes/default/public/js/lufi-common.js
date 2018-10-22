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
$(document).ready(function(){
    $('select').material_select();
    $(".select-lang select").on('change', changeLang);
    $(".select-lang-mobile select").on('change', changeLang);
});
