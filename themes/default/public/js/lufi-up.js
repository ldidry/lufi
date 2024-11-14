// vim:set sw=4 ts=4 sts=4 ft=javascript expandtab:

import {
  lufi,
  okAsync,
  ResultAsync,
  isSecureContext,
  CryptoAlgorithm,
} from "/js/lufi.js";

// Global zip objects for currently created zip file
let zipSize = 0;
// Init the list of files (used by LDAP invitation feature)
let filesURLs = [];
let filesCounter = 0;

let archiveEntries;

// Copy a link to clipboard
const copyToClipboard = (txt) => {
  const textArea = document.createElement("textarea");
  textArea.className = "textarea-hidden";
  textArea.value = txt;

  document.body.appendChild(textArea);

  try {
    navigator.clipboard.writeText(textArea.value).then(() => {
      Materialize.toast(i18n.copySuccess, 4000);
    });
  } catch (err) {
    el.focus();
    el.select();
    alert(i18n.hit);
  }

  textArea.remove();
};

// Copy all links to clipboard
const copyAllToClipboard = (event) => {
  event.preventDefault();
  let text = [];
  const inputs = document.querySelectorAll(".link-input");
  for (let i = 0; i < inputs.length; i++) {
    text.push(inputs[i].value);
  }

  try {
    navigator.clipboard.writeText(text.join("\n")).then(() => {
      Materialize.toast(i18n.copySuccess, 4000);
    });
  } catch (err) {
    alert(i18n.hits);
  }
};

// Add item to localStorage
const addItem = (
  name,
  url,
  size,
  del_at_first_view,
  created_at,
  delay,
  short,
  token
) => {
  let files = localStorage.getItem(`${window.prefix}files`);
  files = JSON.parse(files) || [];

  files.push({
    name,
    short,
    url,
    size,
    del_at_first_view,
    created_at,
    delay,
    token,
  });
  localStorage.setItem(`${window.prefix}files`, JSON.stringify(files));
};

// Remove a file block
const destroyBlock = (clientKey) => {
  filesCounter--;
  document.getElementById(`list-group-item-${clientKey}`).remove();

  if (document.querySelectorAll(".link-input").length === 0) {
    document.getElementById("misc").innerHTML = "";
    if (
      document.querySelectorAll("#results li").length === 0 &&
      filesCounter === 0
    ) {
      document.getElementById("results").style.display = "none";
    }
  } else {
    updateMailLink();
  }
};

// When clicking on del at first view checkbox
const firstViewClicking = () => {
  document
    .getElementById("first-view")
    .setAttribute(
      "data-checked",
      document.getElementById("first-view").getAttribute("data-checked") ===
        "data-checked"
        ? null
        : "data-checked"
    );
};

// When clicking on zip checkbox
const zipClicking = () => {
  if (
    document.getElementById("zip-files").getAttribute("data-checked") ===
    "data-checked"
  ) {
    zipSize = 0;
    document.getElementById("zip-files").removeAttribute("data-checked");
    document.getElementById("zipname").value = "documents.zip";
    document.getElementById("zipname-input").classList.add("hide");
    document.getElementById("zipping").classList.add("hide");
    document.getElementById("files").classList.replace("m6", "m12");
    document.getElementById("zip-parts").innerHTML = "";
    document.getElementById("delete-day").removeAttribute("disabled");
  } else {
    document
      .getElementById("zip-files")
      .setAttribute("data-checked", "data-checked");
    document.getElementById("zipname-input").classList.remove("hide");
    document.getElementById("zip-size").innerText = filesize(zipSize);
  }
};

// Get the zip file name
const getZipname = () => {
  let zipname = document.getElementById("zipname").value || "documents.zip";

  if (!zipname.endsWith(".zip")) {
    zipname += zipname.endsWith(".") ? "zip" : ".zip";
  }

  return escapeHtml(zipname);
};

// Update the zip name
const updateZipname = () => {
  document.getElementById("zip-name").textContent = getZipname();
};

// Create blob from zip
const uploadZip = (e) => {
  e.preventDefault();
  const delay = document.getElementById("delete-day");
  const del_at_first_view = document.getElementById("first-view");
  document.getElementById("zip-files").disabled = true;
  document.getElementById("file-browser-button").disabled = true;
  document.getElementById("file-browser-span").classList.add("disabled");
  document.getElementById("uploadZip").classList.add("hide");
  document.getElementById("zip-parts").textContent = "";

  document.getElementById("zip-compressing").classList.remove("hide");

  const zipname = getZipname();

  lufi
    .compress(archiveEntries, zipname)
    .andThen((zipFile) => {
      // if '#zipping' is hidden, the zipping has been aborted
      if (!document.getElementById("zipping").classList.contains("hide")) {
        document.getElementById("zipping").classList.add("hide");
        document.getElementById("files").classList.remove("m6");
        document.getElementById("files").classList.add("m12");
        document.getElementById("zipname-input").classList.add("hide");
        document.getElementById("zip-compressing").classList.add("hide");
        document.getElementById("uploadZip").classList.remove("hide");
        document.getElementById("results").style.display = "block";
        document.getElementById("zip-files").disabled = false;
        document.getElementById("zip-files").removeAttribute("data-checked");
        document.getElementById("zip-files").checked = false;

        const password = document.getElementById("file_pwd").value;

        Materialize.toast(
          i18n.enqueued.replace("XXX", zipname),
          3000,
          "teal accent-3"
        );

        startUpload(
          [zipFile],
          delay.value,
          del_at_first_view.checked,
          true,
          zipname,
          password
        );

        archiveEntries = undefined;
      }
      document.getElementById("file-browser-button").disabled = false;
      document.getElementById("file-browser-span").classList.remove("disabled");

      return okAsync(undefined);
    })
    .orElse((error) => console.error(error.message));
};

// Update the mail link
const updateMailLink = () => {
  const a = document.querySelectorAll(".link-input");
  const l = Array.from(a).map((el) => el.id);
  const u = `${actionURL}m?links=${JSON.stringify(l)}`;
  document.getElementById("mailto").href = u;
};

// [Invitation feature] Send URLs of files to server
const sendFilesURLs = () => {
  if (filesURLs.length > 0) {
    fetch(sendFilesURLsURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        urls: filesURLs,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          Materialize.toast(data.msg, 6000, "teal accent-3");
        } else {
          Materialize.toast(data.msg, 10000, "red accent-2");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
};

const showAlertOnFile = (msg, clientKey) => {
  const nameDOM = document.getElementById(`name-${clientKey}`);
  const progressDOM = document.getElementById(`progress-${clientKey}`);
  const newDivDOM = document.createElement("div");

  if (progressDOM) {
    progressDOM.remove();
  }

  newDivDOM.classList.add("card", "pink");
  newDivDOM.innerHTML = `
    <div class="card-content white-text">
        <strong>${msg}</strong>
    </div>
`;

  if (nameDOM) {
    nameDOM.parentNode.appendChild(newDivDOM);
  }
};

// Dropzone events functions
const handleDrop = (evt) => {
  evt.stopPropagation();
  evt.preventDefault();

  handleFiles(evt.dataTransfer.files);
};

const handleDragOver = (evt) => {
  evt.stopPropagation();
  evt.preventDefault();
  evt.dataTransfer.dropEffect = "copy"; // Explicitly show this is a copy.
};

// Dropzone events binding
const bindDropZone = () => {
  const dropZone = document.getElementById("files");
  dropZone.addEventListener("dragover", handleDragOver);
  dropZone.addEventListener("drop", handleDrop);

  document.getElementById("file-browser-span").classList.remove("disabled");
  document.getElementById("file-browser-span").classList.add("cyan");
  document.getElementById("file-browser-button").disabled = false;

  document
    .getElementById("file-browser-button")
    .addEventListener("change", (e) => {
      handleFiles(e.target.files);
    });
};

// On page load
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("zip-files").checked = false;
  document.getElementById("first-view").checked = false;
  document.getElementById("zipname").value = "documents.zip";

  bindDropZone();
  if (maxSize > 0) {
    document.getElementById("max-file-size").textContent = i18n.maxSize.replace(
      "XXX",
      filesize(maxSize)
    );
  }

  document
    .querySelector('label[for="first-view"]')
    .addEventListener("click", firstViewClicking);
  document
    .querySelector('label[for="zip-files"]')
    .addEventListener("click", zipClicking);
  document.getElementById("zipname").addEventListener("input", updateZipname);
  document.getElementById("uploadZip").addEventListener("click", uploadZip);

  document.getElementById("reset-zipping").addEventListener("click", () => {
    archiveEntries = undefined;
    document.querySelector('label[for="zip-files"]').click();
    document.getElementById("zip-files").disabled = false;
    document.getElementById("zip-files").removeAttribute("data-checked");
    document.getElementById("zip-compressing").classList.add("hide");
    document.getElementById("file-browser-button").disabled = false;
    document.getElementById("file-browser-span").classList.remove("disabled");
    document.getElementById("files").classList.replace("m6", "m12");
  });
});

const startUpload = (
  files,
  delay,
  delAtFirstView,
  isZipped,
  zipName,
  password
) => {
  let clientKey;

  return lufi
    .upload(
      window.location,
      files,
      delay,
      delAtFirstView,
      isZipped,
      zipName,
      password,
      isSecureContext() ? CryptoAlgorithm.WebCrypto : CryptoAlgorithm.Sjcl
    )
    .andThen((jobs) =>
      ResultAsync.combine(
        jobs.map((job) => {
          filesCounter++;

          document.getElementById("results").style.display = "block";

          clientKey = job.lufiFile.keys.client;

          createUploadBox(job);

          job.onProgress(() => {
            updateProgressBar(job.lufiFile);
          });

          return job
            .waitForCompletion()
            .andThen((job) => {
              notify(i18n.fileUploaded, job.lufiFile.name);

              if (isGuest) {
                sendFilesURLs();
              }

              uploadBoxComplete(job.lufiFile);

              // Add the file to localStorage
              if (!isGuest) {
                addItem(
                  job.lufiFile.name,
                  job.lufiFile.downloadUrl(),
                  job.lufiFile.size,
                  delAtFirstView,
                  job.lufiFile.createdAt,
                  delay,
                  job.lufiFile.keys.server,
                  job.lufiFile.actionToken
                );
              }

              if (isGuest && job.lufiFile.keys.server !== null) {
                filesURLs.push(
                  JSON.stringify({
                    name: job.lufiFile.name,
                    short: job.lufiFile.keys.server,
                    url: job.lufiFile.downloadUrl(),
                    size: job.lufiFile.size,
                    created_at: job.lufiFile.createdAt,
                    delay,
                    token: job.lufiFile.actionToken,
                  })
                );
              }

              return okAsync(job);
            })
            .mapErr((error) => {
              if (clientKey) {
                showAlertOnFile(error.message, clientKey);
              } else {
                console.error(error.message);
              }

              if (isGuest) {
                sendFilesURLs();
              }
            });
        })
      )
    )
    .orElse((error) => console.error(error));
};

const handleFiles = (files = []) => {
  const filesArray = Array.from(files);
  const isZipped =
    document.getElementById("zip-files").getAttribute("data-checked") ===
    "data-checked";

  document.body.style.cursor = "wait";

  if (!isZipped) {
    const delay = document.getElementById("delete-day").value;
    const delAtFirstView =
      document.getElementById("first-view").getAttribute("data-checked") ===
      "data-checked";
    const password = document.getElementById("file_pwd").value;

    filesArray.forEach((file) => {
      Materialize.toast(
        i18n.enqueued.replace("XXX", escapeHtml(file.name)),
        3000,
        "teal accent-3"
      );
    });

    document.body.style.cursor = "auto";

    startUpload(
      filesArray,
      delay,
      delAtFirstView,
      isZipped,
      undefined,
      password
    );
  } else {
    lufi
      .addFilesToArchive(filesArray, archiveEntries)
      .andThen((entries) => {
        archiveEntries = entries;

        document.getElementById("zipping").classList.remove("hide");
        const filesElement = document.getElementById("files");
        filesElement.classList.replace("m12", "m6");

        const zipPartsDOM = document.getElementById("zip-parts");

        zipPartsDOM.replaceChildren();

        for (const [name, file] of Object.entries(archiveEntries)) {
          zipSize += file.length;

          const listItemDOM = document.createElement("li");
          listItemDOM.innerHTML = `— ${escapeHtml(name)} (${filesize(
            file.length
          )})`;

          zipPartsDOM.appendChild(listItemDOM);
        }

        document.getElementById("zip-size").textContent = filesize(zipSize);

        document.body.style.cursor = "auto";

        return okAsync(undefined);
      })
      .orElse((error) => console.error(error.message));
  }
};

const createUploadBox = (job) => {
  // Create a progress bar for the file
  const resultsDOM = document.getElementById("ul-results");
  const newItemDOM = document.createElement("li");

  const clientKey = job.lufiFile.keys.client;

  newItemDOM.classList.add("list-group-item");
  newItemDOM.id = `list-group-item-${clientKey}`;

  newItemDOM.innerHTML = `<div class="card">
                <div>
                    <a href="#" id="destroy-${clientKey}">
                        <i class="right mdi-navigation-close small"></i>
                    </a>
                    <div class="card-content">
                        <span class="card-title"
                              id="name-${clientKey}">${job.lufiFile.name}</span>
                        <span id="size-${clientKey}"> (${filesize(
    job.lufiFile.size
  )})</span>
                        <p id="parts-${clientKey}"></p>
                    </div>
                    <div class="progress">
                        <div id="progress-${clientKey}"
                             data-key="${job.lufiFile.keys.client}"
                             data-name="${job.lufiFile.name}"
                             aria-valuemax="100"
                             aria-valuemin="0"
                             aria-valuenow="0"
                             role="progressbar"
                             class="determinate width-0">
                            <span class="sr-only">${job.lufiFile.name}0%</span>
                        </div>
                    </div>
            <div>`;

  resultsDOM.prepend(newItemDOM);

  document.getElementById(`destroy-${clientKey}`).onclick = (event) => {
    event.preventDefault();
    lufi
      .cancel(job)
      .map(() => {
        destroyBlock(clientKey);
      })
      .mapErr((error) => {
        showAlertOnFile(error.msg, clientKey);
      });
  };
};

const uploadBoxComplete = (lufiFile) => {
  const clientKey = lufiFile.keys.client;

  // Remove the parts element
  const partsElement = document.getElementById(`parts-${clientKey}`);
  if (partsElement) {
    partsElement.remove();
  }

  const nameDOM = document.getElementById(`name-${clientKey}`);
  const sizeDOM = document.getElementById(`size-${clientKey}`);
  const newDivDOM = document.createElement("div");
  const downloadUrl = lufiFile.downloadUrl();
  const removeUrl = lufiFile.removeUrl();
  const links = encodeURIComponent(`["${lufiFile.keys.server}"]`);
  const limit =
    lufiFile.delay === 0
      ? i18n.noLimit
      : `${i18n.expiration} ${formatDate(
          lufiFile.delay * 86400 + lufiFile.createdAt
        )}`;

  if (!isGuest) {
    nameDOM.innerHTML += `${sizeDOM.innerHTML} <a href="${actionURL}m?links=${links}"><i class="mdi-communication-email"></i></a><br>${limit}`;
    newDivDOM.innerHTML = `
        <div class="card-action">
            <div class="input-field">
                <span class="prefix big-prefix">
                    <a href="${downloadUrl}" target="_blank">
                        <i class="mdi-file-file-download small" title="${i18n.dlText}"></i>
                    </a>
                    <a href="#" id="copyurl-${clientKey}" title="${i18n.cpText}">
                        <i class="mdi-content-content-copy small"></i>
                    </a>
                </span>
                <input id="${lufiFile.keys.server}" class="form-control link-input white-background" value="${downloadUrl}" readonly type="text">
                <label class="active" for="${lufiFile.keys.server}">${i18n.dlText}</label>
            </div>
            <div class="input-field">
                <a href="${removeUrl}" target="_blank" class="prefix big-prefix">
                    <i class="mdi-action-delete small" title="${i18n.delText}"></i>
                </a>
                <input id="delete-${lufiFile.keys.server}" class="form-control white-background" value="${removeUrl}" readonly type="text">
                <label class="active" for="delete-${lufiFile.keys.server}">${i18n.delText}</label>
            </div>
        </div>
    `;
  } else {
    nameDOM.innerHTML += `${sizeDOM.innerHTML}`;
  }

  sizeDOM.remove();

  const dp = document.getElementById(`progress-${clientKey}`);
  const p2 = dp.parentNode;
  const p1 = p2.parentNode;

  p2.remove();
  p1.appendChild(newDivDOM);

  // Copy URL to clipboard
  document
    .getElementById(`copyurl-${clientKey}`)
    .addEventListener("click", (e) => {
      e.preventDefault();
      copyToClipboard(downloadUrl);
    });

  // Select input text on click
  document.querySelectorAll("input[type='text']").forEach((input) => {
    input.addEventListener("click", () => {
      this.select();
    });
    input.addEventListener("keydown", () => {
      this.select();
    });
  });

  // Add copy all and mailto buttons
  const misc = document.getElementById("misc");

  if (misc.innerHTML === "" && !isGuest) {
    misc.innerHTML = `
        <a href="#" id="copyall" class="btn btn-info">${i18n.copyAll}</a>
        <a id="mailto" href="${actionURL}m?links=${links}" class="btn btn-info">${i18n.mailTo}</a>
    `;
    document
      .getElementById("copyall")
      .addEventListener("click", copyAllToClipboard);
  } else {
    updateMailLink();
  }
};

const updateProgressBar = (lufiFile) => {
  const percent =
    Math.round((1000 * lufiFile.chunksReady) / lufiFile.totalChunks) / 10;
  const wClass = percent.toString().replace(".", "-");

  const dp = document.getElementById(`progress-${lufiFile.keys.client}`);
  dp.className = "";
  dp.classList.add("determinate");
  dp.classList.add(`width-${wClass}`);
  dp.setAttribute("aria-valuenow", percent);

  document.getElementById(
    `parts-${lufiFile.keys.client}`
  ).innerHTML = `${percent.toFixed(1)}%`;
};
