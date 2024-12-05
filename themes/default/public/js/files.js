import { formatDate } from "./lib/utils.js";

// Add item to localStorage
const addItem = (item) => {
  const files = JSON.parse(localStorage.getItem(`${prefix}files`)) || [];

  files.push(item);
  localStorage.setItem(`${prefix}files`, JSON.stringify(files));
};

const deleteFromStorage = (serverKey) => {
  let files = JSON.parse(localStorage.getItem(`${prefix}files`)) || [];

  files = files.filter((file) => file.short !== serverKey);

  localStorage.setItem(`${prefix}files`, JSON.stringify(files));
};

const itemExists = (serverKey) => {
  const files = JSON.parse(localStorage.getItem(`${prefix}files`)) || [];

  return files.some((file) => file.short === serverKey);
};

const updateSelection = (event) => {
  document.querySelectorAll(".item .checkbox input").forEach((node) => {
    node.checked = event.target.checked;
  });

  checkItemSelection();
};

const purgeExpired = () => {
  const files = JSON.parse(localStorage.getItem(`${prefix}files`));

  files.forEach((file) => {
    const fileDOM = document.querySelector(`.item-${file.short}`);

    if (fileDOM?.classList.contains("deleted")) {
      deleteFromStorage(file.short);
      fileDOM.remove();
    }
  });
};

const exportStorage = () => {
  const exportStorageDOM = document.getElementById("action-export-storage");

  const storageData = [localStorage.getItem(`${prefix}files`)];
  const exportFile = new Blob(storageData, { type: "application/json" });

  exportStorageDOM.href = window.URL.createObjectURL(exportFile);
  exportStorageDOM.download = "data.json";
};

const importStorage = (event) => {
  const reader = new FileReader();

  reader.addEventListener("loadend", () => {
    try {
      const newFiles = JSON.parse(
        String.fromCharCode.apply(null, new Uint8Array(reader.result))
      );

      let importedCounter = 0;

      newFiles.forEach((file) => {
        if (validURL(file.url) && !itemExists(file.short)) {
          addItem(file);
          importedCounter++;
        }
      });

      populateFilesTable();
    } catch (err) {
      alert(err);
    }
  });
  reader.readAsArrayBuffer(event.target.files[0]);
};

const validURL = (str) => {
  try {
    return new URL(str).host ? true : false;
  } catch (e) {
    return false;
  }
};

const deleteFile = (node) => {
  const serverKey = node.dataset.serverKey;
  const deleteUrl = new URL(
    `${actionURL}d/${serverKey}/${node.dataset.actionKey}`
  );

  deleteUrl.searchParams.append("_format", "json");

  fetch(deleteUrl, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network error while deleting file");
      }

      return response.json();
    })
    .then((data) => {
      if (data.success) {
        node.remove();
        deleteFromStorage(serverKey);
      } else {
        alert(data.msg);
      }
      checkItemSelection();
    });
};

const checkItemSelection = () => {
  const deleteSelectionDOM = document.getElementById("action-delete-selection");

  if (document.querySelectorAll(".item .checkbox input:checked").length > 0) {
    deleteSelectionDOM.disabled = false;
  } else {
    deleteSelectionDOM.disabled = true;
  }
};

const deleteSelection = () => {
  document
    .querySelectorAll(".item:has(.checkbox input:checked)")
    .forEach((node) => deleteFile(node));
};

const populateFilesTable = () => {
  const itemsTableDOM = document.getElementById("items-table");
  itemsTableDOM.replaceChildren();

  let files = localStorage.getItem(`${prefix}files`);

  if (files === null) {
    const filesWithoutPrefix = localStorage.getItem("files");

    if (filesWithoutPrefix !== null) {
      if (confirm(i18n.importFilesWithoutPrefix)) {
        localStorage.setItem(`${prefix}files`, filesWithoutPrefix);

        files = JSON.parse(filesWithoutPrefix);
      } else {
        localStorage.setItem(`${prefix}files`, JSON.stringify([]));
        files = [];
      }
    } else {
      files = [];
    }
  } else {
    files = JSON.parse(files);
  }

  files.sort((a, b) => b.created_at - a.created_at);

  files.forEach((file) => {
    const itemDOM = document
      .querySelector("template#item")
      .content.cloneNode(true).children[0];

    itemDOM.classList.add(`item-${file.short}`);

    itemDOM.dataset.serverKey = file.short;
    itemDOM.dataset.actionKey = file.token;

    itemDOM.querySelector(".name").innerText = file.name;
    itemDOM.querySelector(".download a").href = file.url;
    itemDOM
      .querySelector(".delete-at-first-view .icon")
      .classList.add(file.del_at_first_view ? "fa-eraser" : "fa-close");
    itemDOM.querySelector(".created-at").innerText = formatDate(
      file.created_at
    );
    itemDOM.querySelector(".expires-at").innerText =
      file.delay == 0
        ? i18n.noExpiration
        : formatDate(file.delay * 86400 + file.created_at);

    itemDOM.querySelector(
      ".mail a"
    ).href = `${actionURL}m?links=["${file.short}"]`;

    itemDOM.querySelector(".action-delete-item").onclick = () =>
      deleteFile(itemDOM);

    itemDOM.querySelector(".checkbox input").onclick = () => {
      checkItemSelection();
    };

    itemsTableDOM.append(itemDOM);

    console.debug(file.short, file.token);

    fetch(counterURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: new URLSearchParams({
        short: file.short,
        token: file.token,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request error: ${response.statusText}`);
        }

        return response.json();
      })
      .then((data) => {
        const countDOM = itemDOM.querySelector(".counter");

        if (data.success) {
          countDOM.innerText = data.counter;

          if (data.deleted) {
            countDOM.parentElement.classList.add("deleted");
          }
        } else {
          alert(data.msg);
          countDOM.parentElement.remove();

          if (data.missing) {
            deleteFromStorage(data.short);
          }
        }
      })
      .catch((error) => console.error(error));
  });
};

document.addEventListener("DOMContentLoaded", () => {
  populateFilesTable();
  document.getElementById("action-select-all").onclick = updateSelection;
  document.getElementById("action-export-storage").onclick = exportStorage;
  document.getElementById("action-purge-expired").onclick = purgeExpired;
  document.getElementById("action-import-storage").onchange = importStorage;
  document.getElementById("action-delete-selection").onclick = deleteSelection;
});
