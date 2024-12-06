const entityMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;",
};

export const addToast = (message, type) => {
  const notification = document
    .querySelector("template#notification")
    .content.cloneNode(true).children[0];

  notification.classList.add(`is-${type}`);

  notification.querySelector(".message").innerText = message;

  document.getElementById("notifications-container").append(notification);

  setTimeout(() => {
    notification.remove();
  }, 3500);
};

export const copyToClipboard = async (text) => {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    } else {
      // Unsecure and deprecated method. It's a fallback for non-secure contexts
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand("copy");

      document.body.removeChild(textArea);
    }
  } catch (error) {
    alert(error);
  }
};

export const ensureNode = (selector, callback) => {
  const node = document.querySelector(selector);

  if (node) {
    callback(node);
  } else {
    console.warning(`The node with ${selector} does not exist.`);
  }
};

export const escapeHtml = (string) =>
  String(string).replace(/[&<>"'\/]/g, (s) => entityMap[s]);

export const formatDate = (unixTimestamp) =>
  new Date(unixTimestamp * 1000).toLocaleString(window.navigator.language, {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
  });

export const hideNode = (node) => {
  if (node) {
    node.classList.add("is-hidden");
  }
};

export const notify = (title, body) => {
  if (isSecureContext) {
    if (!("Notification" in window) || typeof Notification === "undefined") {
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
        icon: "/img/lufi.svg",
      });
    }
  }
};

export const showNode = (node) => {
  if (node) {
    node.classList.remove("is-hidden");
  }
};

export const uuidv4 = () =>
  "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      +c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
    ).toString(16)
  );
