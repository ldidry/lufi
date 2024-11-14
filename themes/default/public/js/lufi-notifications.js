const notify = (title, body) => {
  if (!"Notification" in window || typeof Notification === "undefined") {
    console.log(
      `This browser does not support desktop notification, cannot send following message: ${title} ${body}`
    );
    return;
  }

  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  } else {
    new Notification(title, {
      body,
      icon: "/img/lufi196.png",
    });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  if (!"Notification" in window || typeof Notification === "undefined") {
    return;
  }

  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }
});
