import { filesize } from "~/lib/filesize.esm.min.js";
import { addToast, hideNode, showNode } from "~/lib/utils.js";

const updateButtonsStatus = () => {
  const targetSelectionDOM = document.querySelectorAll(".target-selection");

  if (
    document.querySelectorAll(".selection .checkbox input:checked").length > 0
  ) {
    targetSelectionDOM.forEach((node) => {
      node.disabled = false;
    });
  } else {
    targetSelectionDOM.forEach((node) => (node.disabled = true));
  }
};

const updateSelection = (event) => {
  document.querySelectorAll(".item .checkbox input").forEach((node) => {
    node.checked = event.target.checked;
  });

  updateButtonsStatus();
};

const toggleHidden = () => {
  const invitationsListDOM = document.querySelector(".invitations-list");
  const toggleButtonDOM = document.querySelector(".action-toggle-hidden");
  const itemsHiddenDOM = invitationsListDOM.querySelectorAll(
    ".item[data-visibility='hidden']"
  );

  if (invitationsListDOM.dataset.visibility === "hidden") {
    toggleButtonDOM.innerText = i18n.hideText;

    itemsHiddenDOM.forEach((item) => showNode(item));

    invitationsListDOM.dataset.visibility = "shown";
  } else {
    toggleButtonDOM.innerText = i18n.showText;

    itemsHiddenDOM.forEach((item) => {
      hideNode(item);

      const checkbox = item.querySelector("input");

      if (checkbox.checked) {
        checkbox.click();
      }
    });

    invitationsListDOM.dataset.visibility = "hidden";
  }
};

const deleteInvitation = () => {
  if (confirm(i18n.confirmDeleteInvit)) {
    try {
      fetch(deleteURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: getTokensBody(),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Request error: ${response.statusText}`);
          }

          return response.json();
        })
        .then((data) => {
          if (data.success) {
            data.tokens.forEach((t) => {
              addToast(t.msg, "success");
              document.getElementById(`row-${t.token}`).remove();
            });

            data.failures.forEach((msg) => {
              addToast(msg, "error");
            });

            updateButtonsStatus();
          } else {
            data.failures.forEach((msg) => {
              addToast(msg, "error");
            });

            if (data.msg) {
              addToast(data.msg, "error");
            }
          }
        });
    } catch (error) {
      console.error(error);
    }
  }
};

const resendInvitation = () => {
  if (confirm(i18n.confirmResendMail)) {
    fetch(resendURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: getTokensBody(),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request error: ${response.statusText}`);
        }

        return response.json();
      })
      .then((data) => {
        if (data.success) {
          data.success.forEach((t) => {
            const itemDOM = document.getElementById(`row-${t.token}`);

            itemDOM.querySelector(".expiration-date").innerText = t.expires;

            itemDOM.querySelector(".selection input").click();
            addToast(t.msg, "success");
          });

          data.failures.forEach((msg) => {
            addToast(msg, "error");
          });

          updateButtonsStatus();
        }
      })
      .catch((error) => console.error(error));
  }
};

const toggleVisibility = () => {
  fetch(toggleURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    body: getTokensBody(),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Request error: ${response.statusText}`);
      }

      return response.json();
    })
    .then((data) => {
      if (data.success) {
        data.tokens.forEach((t) => {
          const itemDOM = document.getElementById(`row-${t.token}`);

          if (t.show) {
            itemDOM.setAttribute("data-visibility", "shown");
            showNode(itemDOM);
            itemDOM.querySelector(".selection .icon").classList.add("is-hidden");
          } else {
            itemDOM.setAttribute("data-visibility", "hidden");

            if (
              document.querySelector(".invitations-list").dataset.visibility ===
              "hidden"
            ) {
              hideNode(itemDOM);
            }

            itemDOM.querySelector(".selection .icon").classList.remove("is-hidden")
          }

          itemDOM.querySelector(".selection input").click();
        });

        updateButtonsStatus();
      } else {
        addToast(data.msg, "error");
      }
    })
    .catch((error) => console.error(error));
};

const getTokensBody = () => {
  const tokens = new URLSearchParams();

  document
    .querySelectorAll(".selection input:checked")
    .forEach((item) => tokens.append("tokens[]", item.dataset.token));

  return tokens;
};

const fillModal = (event) => {
  const buttonDOM = event.target;
  const modalDOM = document.querySelector(".modal.files-info");

  // Cleanup the modal
  modalDOM.querySelector(".files-list").replaceChildren();

  modalDOM.querySelector("h1").innerText = i18n.listFiles
    .replace("XX1", buttonDOM.dataset.token)
    .replace("XX2", buttonDOM.dataset.guest);

  const files = JSON.parse(buttonDOM.dataset.files) || [];
  const itemList = new DocumentFragment();

  files.forEach((file) => {
    const expires = i18n.expiration.replace(
      "XXX",
      formatDate(file.delay * 86400 + file.created_at)
    );
    const item = modalDOM
      .querySelector("template#item")
      .content.cloneNode(true);

    item.querySelector(".file-link").href = file.url;
    item.querySelector(".file-link").value = file.name;
    item.querySelector(".file-size").innerText = `${filesize(
      file.size
    )}, ${expires}`;

    itemList.appendChild(item);
  });

  modalDOM.querySelector(".files-list").appendChild(itemList);
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".modal-button.action-files-info").forEach(
    (button) =>
    (button.onclick = (event) => {
      fillModal(event);

      document.querySelector(".modal.files-info").showModal();
    })
  );

  document.querySelector(".close-modal").onclick = () => {
    document.querySelector(".modal").close();
  };

  document
    .querySelectorAll(".selection input")
    .forEach((node) => (node.onclick = updateButtonsStatus));

  document.getElementById("action-select-all").onclick = updateSelection;

  document.querySelector(".action-toggle-hidden").onclick = toggleHidden;

  document.querySelector(".action-delete-invitation").onclick =
    deleteInvitation;

  document.querySelector(".action-resend-invitation").onclick =
    resendInvitation;

  document.querySelector(".action-toggle-visibility").onclick =
    toggleVisibility;
});
