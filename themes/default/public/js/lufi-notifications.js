function notify(title, body) {
  if (!"Notification" in window || typeof Notification === "undefined") {
    console.log(
      `This browser does not support desktop notification, cannot send following message: ${title} ${body}`
    );
    return;
  }

  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  } else {
    let options = {
      body: body,
      icon: "/img/lufi196.png",
    };
    new Notification(title, options);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  if (!"Notification" in window || typeof Notification === "undefined") {
    return;
  }

  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }
});
