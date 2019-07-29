function invertSelection(e) {
    e.preventDefault();
    $('#myInvitations input[type="checkbox"]').each(function () {
        var el = $(this);
        var tr = el.parent().parent();
        if (!tr.hasClass('hide')) {
            el.click();
        }
    })
}

function toggleHidden(e) {
    e.preventDefault();
    if ($('#myInvitations').attr('data-visibility') === 'hidden') {
        $('#toggleHidden').text(i18n.hideText);
        $('tr[data-visibility="0"]').removeClass('hide');
        $('#myInvitations').attr('data-visibility', 'shown');
    } else {
        $('#toggleHidden').text(i18n.showText);
        $('tr[data-visibility="0"]').addClass('hide');
        $('tr[data-visibility="0"] input[type="checkbox"]').each(function() {
            var el = $(this);
            if (el.attr('data-checked') === 'data-checked') {
                $('tr[data-visibility="0"] input[type="checkbox"]').click();
            }
        });
        $('#myInvitations').attr('data-visibility', 'hidden');
    }
}

function deleteInvit(e) {
    e.preventDefault();
    if (confirm(i18n.confirmDeleteInvit)) {
        var tokens = selectChecked();
        $.ajax({
            url: deleteURL,
            method: 'POST',
            data: {
                tokens: tokens
            },
            success: function(data, textStatus, jqXHR) {
                if (data.success) {
                    data.tokens.forEach(function(t) {
                        Materialize.toast(t.msg, 6000, 'teal accent-3');
                        $('#row-' + t.token).remove();
                    });
                    disableButtons();
                } else {
                    Materialize.toast(data.msg, 10000, 'red accent-2');
                }
            }
        });
    }
}

function resendMail(e) {
    e.preventDefault();
    if (confirm(i18n.confirmResendMail)) {
        var tokens = selectChecked();
        $.ajax({
            url: resendURL,
            method: 'POST',
            data: {
                tokens: tokens
            },
            success: function(data, textStatus, jqXHR) {
                data.success.forEach(function(s) {
                    Materialize.toast(s.msg, 6000, 'teal accent-3');
                    $('#expire-' + s.token).text(s.expires)
                    $('#' + s.token).click();
                });
                data.failures.forEach(function(msg) {
                    Materialize.toast(msg, 10000, 'red accent-2');
                });
            }
        });
    }
}

function toggleVisibility(e) {
    e.preventDefault();
    var tokens = selectChecked();
    $.ajax({
        url: toggleURL,
        method: 'POST',
        data: {
            tokens: tokens
        },
        success: function(data, textStatus, jqXHR) {
            if (data.success) {
                data.tokens.forEach(function(t) {
                    var row = $('#row-' + t.token)
                    if (t.show) {
                        row.attr('data-visibility', 1);
                        row.removeClass('hide');
                        $('#row-' + t.token + ' > td:first i').remove();
                    } else {
                        row.attr('data-visibility', 0);
                        if ($('#myInvitations').attr('data-visibility') === 'hidden') {
                            row.addClass('hide');
                        }
                        $('#row-' + t.token + ' > td:first').append(i18n.hiddenMark);
                    }
                    $('#' + t.token).click();
                });
                disableButtons();
            } else {
                Materialize.toast(data.msg, 10000, 'red accent-2');
            }
        }
    });
}

function selectChecked() {
    var tokens = [];
    $('#myInvitations input[type="checkbox"][data-checked="data-checked"]').each(function() {
        tokens.push($(this).attr('id'));
    });
    return tokens;
}

function handleCheckboxClic() {
    var el = $(this);
    if (el.attr('data-checked') === 'data-checked') {
        el.attr('data-checked', null);
    } else {
        el.attr('data-checked', 'data-checked');
    }
    if ($('#myInvitations input[type="checkbox"][data-checked="data-checked"]').length !== 0) {
        $('#deleteInvit').removeClass('disabled');
        $('#deleteInvit').attr('disabled', null);
        $('#resendMail').removeClass('disabled');
        $('#resendMail').attr('disabled', null);
        $('#toggleVisibility').removeClass('disabled');
        $('#toggleVisibility').attr('disabled', null);
    } else {
        disableButtons();
    }
}

function disableButtons() {
    $('#deleteInvit').addClass('disabled');
    $('#deleteInvit').attr('disabled', 'disabled');
    $('#resendMail').addClass('disabled');
    $('#resendMail').attr('disabled', 'disabled');
    $('#toggleVisibility').addClass('disabled');
    $('#toggleVisibility').attr('disabled', 'disabled');
}

function fillModal() {
    var el = $(this);

    $('#files-info h1').text('');
    $('#files-ul').html('');

    var token = el.attr('data-token');
    var guest = el.attr('data-guest');
    $('#files-info h1').text(
        i18n.listFiles.replace('XX1', token)
                      .replace('XX2', guest)
    );

    var files = JSON.parse(el.attr('data-files'));
    var content = [];
    for (i = 0; i < files.length; i++) {
        var f = files[i];
        var expires = i18n.expiration.replace('XXX',
            moment.unix(f.delay * 86400 + f.created_at).locale(window.navigator.language).format('LLLL')
        );
        content.push(
            '<li>— ',
                '<a href="', f.url, '">',
                    f.name,
                '</a> (',
                filesize(f.size),
                ', ',
                expires,
                ')',
            '</li>',
        );
    }
    $('#files-ul').html(content.join(''));
}

$(document).ready(function(){
    $('.modal-trigger').leanModal();
    $('.modal-trigger').on('click', fillModal);
    $('#invertSelection').on('click', invertSelection);
    $('#toggleHidden').on('click', toggleHidden);
    $('#deleteInvit').on('click', deleteInvit);
    $('#resendMail').on('click', resendMail);
    $('#toggleVisibility').on('click', toggleVisibility);
    $('#myInvitations input[type="checkbox"]').on('click', handleCheckboxClic);
});
