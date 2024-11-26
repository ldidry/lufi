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

const invertSelection = () => {
  document.querySelectorAll(".item .column.selection input").forEach((node) => {
    node.click();
  });
  checkItemSelection();
};

const purgeExpired = () => {
  const files = JSON.parse(localStorage.getItem(`${prefix}files`));

  files.forEach((file) => {
    const fileDOM = document.querySelector(`.item-${file.short}`);

    if (fileDOM.classList.contains("deleted")) {
      deleteFromStorage(file.short);
      fileDOM.remove();
    }
  });
};

const exportStorage = () => {
  const exportStorageDOM = document.querySelector(".action-export-storage");

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

      addToast(i18n.importProcessed, "success");
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
  const serverKey = node.getAttribute("data-serverKey");
  const deleteUrl = new URL(
    `${actionURL}d/${serverKey}/${node.getAttribute("data-actionKey")}`
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
  const deleteSelectionDOM = document.querySelector(".action-delete-selection");

  if (
    document.querySelectorAll(".column.selection .checkbox input:checked")
      .length > 0
  ) {
    deleteSelectionDOM.disabled = false;
  } else {
    deleteSelectionDOM.disabled = true;
  }
};

const deleteSelection = () => {
  document
    .querySelectorAll(".item:has(.column.selection .checkbox input:checked)")
    .forEach((node) => deleteFile(node));
};

const populateFilesTable = () => {
  const filesItemsDOM = document.querySelector(".files-items");
  filesItemsDOM.querySelectorAll("tr").forEach((node) => node.remove());

  let files = localStorage.getItem(`${prefix}files`);

  if (files === null) {
    const filesWithoutPrefix = localStorage.getItem("files");

    if (filesWithoutPrefix !== null) {
      if (window.confirm(i18n.importFilesWithoutPrefix)) {
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

  files.sort((a, b) => a.created_at - b.created_at);

  files.forEach((file) => {
    const itemDOM = document
      .querySelector("template#item")
      .content.cloneNode(true).children[0];

    itemDOM.classList.add(`item-${file.short}`);

    itemDOM.setAttribute("data-serverKey", file.short);
    itemDOM.setAttribute("data-actionKey", file.token);

    const downloadLink = `${actionURL}d/${file.short}/${file.token}`;

    itemDOM.querySelector(".column.name").innerText = file.name;
    itemDOM.querySelector(".column.download a").href = downloadLink;
    itemDOM
      .querySelector(".column.delete-at-first-view .icon")
      .classList.add(file.del_at_first_view ? "check" : "close");
    itemDOM.querySelector(".column.created-at").innerText = formatDate(
      file.created_at
    );
    itemDOM.querySelector(".column.expires-at").innerText =
      file.delay == 0
        ? i18n.noExpiration
        : formatDate(file.delay * 86400 + file.created_at);

    itemDOM.querySelector(
      ".column.mail a"
    ).href = `${actionURL}m?links=["${file.short}"]`;

    itemDOM.querySelector(".column.deletion button").onclick = () =>
      deleteFile(itemDOM);

    itemDOM.querySelector(".column.selection .checkbox input").onclick = () => {
      checkItemSelection();
    };

    filesItemsDOM.append(itemDOM);

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
        if (data.success) {
          const countDOM = itemDOM.querySelector(".column.counter");

          countDOM.innerText = data.counter;

          if (data.deleted) {
            if (data.deleted) {
              countDOM.parentElement.classList.add("deleted");
            } else {
              alert(data.msg);
              countDOM.parentElement.remove();

              if (data.missing) {
                deleteFromStorage(data.short);
              }
            }
          }
        }
      })
      .catch((error) => console.error(error));
  });
};

document.addEventListener("DOMContentLoaded", () => {
  populateFilesTable();
  document.querySelector(".action-invert-selection").onclick = invertSelection;
  document.querySelector(".action-export-storage").onclick = exportStorage;
  document.querySelector(".action-purge-expired").onclick = purgeExpired;
  document.querySelector(".action-import-storage").onchange = importStorage;
  document.querySelector(".action-delete-selection").onclick = deleteSelection;
});
