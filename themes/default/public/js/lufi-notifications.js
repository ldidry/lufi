function notify(title, body) {
    if (!'Notification' in window) {
        console.log("This browser does not support desktop notification, cannot send following message: "+title+" "+body);
        return;
    }

    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    } else {
        let options = {
            body: body,
            icon: '/img/lufi196.png'
        };
        let n = new Notification(title, options);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    if (!'Notification' in window) {
        return;
    }

    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }
});
