import { formatDate } from "~/lib/utils.js";

const retrieveItemFromStorage = (serverKey) =>
  (JSON.parse(localStorage.getItem(`${prefix}files`)) || []).find(
    (item) => item.short === serverKey
  );

const updateMailtoLink = () => {
  const ownSoftwareButtonDOM = document.querySelector(".action-own-software");
  const emails = document.querySelector(".emails input").value;
  const subject = document.querySelector(".subject input").value;
  const body = document.querySelector(".body textarea").value;

  ownSoftwareButtonDOM.href = `mailto:${encodeURIComponent(
    emails
  )}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

const populateBody = () => {
  const links =
    JSON.parse(new URL(window.location).searchParams.get("links")) || [];

  let text = i18n.intro;

  links.forEach((serverKey) => {
    const item = retrieveItemFromStorage(serverKey);
    if (item) {
      const limit =
        item.delay == 0
          ? null
          : formatDate(item.delay * 86400 + item.created_at);

      text += `- ${item.name}${i18n.colon} ${item.url}`;

      if (limit !== null) {
        text += `\n  (${i18n.deadline}${limit})`;
      }
      text += "\n";
    }
  });

  if (!isLdapDefined && !isHtpasswdDefined) {
    text += `\n-- \n${i18n.footer}`;
  }

  document.querySelector(".body textarea").value = text;
  updateMailtoLink();
};

document.addEventListener("DOMContentLoaded", () => {
  populateBody();

  document
    .querySelectorAll(".control > *")
    .forEach((node) => node.addEventListener("change", updateMailtoLink));
});
