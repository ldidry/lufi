function notify(title, body) {
    if (!'Notification' in window || typeof(Notification) === 'undefined') {
        console.log(`This browser does not support desktop notification, cannot send following message: ${title} ${body}`);
        return;
    }

    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    } else {
        let options = {
            body: body,
            icon: '/img/lufi196.png'
        };

        try {
            let n = new Notification(title, options);
        } catch (e) {
            if (e.name === 'TypeError') {
                console.log(`This browser does not support new notifications, cannot send following message: ${title} ${body}`);
            } else {
                throw e;
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    if (!'Notification' in window || typeof(Notification) === 'undefined') {
        return;
    }

    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }
});
