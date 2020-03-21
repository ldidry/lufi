function notify(title, body) {
    if (!Notification) {
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
    if (!Notification) {
        return;
    }

    if (Notification.permission !== "granted")
        Notification.requestPermission();
});