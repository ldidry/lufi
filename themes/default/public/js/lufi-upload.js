import {
  lufi,
  errAsync,
  okAsync,
  ResultAsync,
  isSecureContext,
  CryptoAlgorithm,
} from "./lufi.js";

import { filesize } from "./filesize.esm.min.js";

document.addEventListener("DOMContentLoaded", () => {
  const deleteAfterDaysDOM = document.getElementById("delete-after-days");
  const deleteOnFirstViewDOM = document.getElementById("delete-on-first-view");
  const dropZoneDOM = document.querySelector(".drop-zone");
  const fileCardsDOM = document.querySelector(".file-cards");
  const maxFileSizeDOM = document.querySelector(".max-file-size");
  const messagesZoneDOM = document.querySelector(".messages-zone");
  const mustZipDOM = document.getElementById("must-zip");
  const passwordDOM = document.getElementById("password");
  const uploadButtonDOM = document.querySelector("#upload-button");
  const uploadedZoneDOM = document.querySelector(".uploaded-zone");
  const uploadZipDOM = document.querySelector(".action-upload-zip");
  const zipNameDOM = document.getElementById("zip-name");
  const zipZoneDOM = document.querySelector(".zip-zone");
  const inputZipNameDOM = document.querySelector(".input-zip-name");

  // Global zip objects for currently created zip file
  let zipSize = 0;
  // Init the list of files (used by LDAP invitation feature)
  let filesURLs = [];

  let archiveEntries;

  /**
   * Add item to localStorage
   *
   * @param {string} name
   * @param {string} url
   * @param {number} size
   * @param {boolean} del_at_first_view
   * @param {number} created_at
   * @param {number} delay
   * @param {string} serverKey
   * @param {string} actionToken
   */
  const addItem = (
    name,
    url,
    size,
    del_at_first_view,
    created_at,
    delay,
    serverKey,
    actionToken
  ) => {
    let files = JSON.parse(localStorage.getItem(`${prefix}files`)) || [];

    files.push({
      name,
      short: serverKey,
      url,
      size,
      del_at_first_view,
      created_at,
      delay,
      token: actionToken,
    });
    localStorage.setItem(`${prefix}files`, JSON.stringify(files));
  };

  const clearZip = () => {
    hideNode(zipZoneDOM);
    showNode(zipZoneDOM.querySelector(".action-upload-zip"));
    hideNode(zipZoneDOM.querySelector(".zip-compressing"));
    hideNode(inputZipNameDOM);

    zipZoneDOM.querySelector(".files-list").replaceChildren();

    archiveEntries = undefined;
    zipSize = 0;
    mustZipDOM.checked = false;
  };

  const copyLinksToClipboard = async () => {
    const inputs = document.querySelectorAll(".download-input");
    const textArray = [];

    inputs.forEach((node) => textArray.push(node.value));

    try {
      await navigator.clipboard.writeText(textArray.join("\n")).then(() => {
        addToast(i18n.copySuccess, "success");
      });
    } catch (error) {
      alert(i18n.hits);
    }
  };

  /**
   * Create a new File Card element
   *
   * @param {LufiJob} job
   * @param {string} type Can be error, success or ongoing
   * @param {Node} existingCard Existing card to be replaced with the new one
   * @returns
   */
  const createFileCard = (job, type, existingCard = undefined) => {
    const { lufiFile } = job;
    const cardDOM = document
      .querySelector(`template#file-card-${type}`)
      .content.cloneNode(true).children[0];

    cardDOM.id = `file-card-${lufiFile.keys.client}`;

    cardDOM.querySelector(".file-name").innerText = escapeHtml(lufiFile.name);
    cardDOM.querySelector(".file-size").innerText = filesize(lufiFile.size);

    cardDOM.querySelector(".action-close").onclick = () => {
      lufi
        .cancel(job)
        .map(() => {
          removeFileCard(job.lufiFile.keys.server, cardDOM);
        })
        .mapErr((error) => {
          showErrorOnCard(job, ongoingFileCardDOM, error.msg);
        });
    };

    switch (type) {
      case "success":
        cardDOM.querySelector(
          ".action-mail"
        ).href = `${actionURL}m?links=${encodeURIComponent(
          `["${lufiFile.keys.server}"]`
        )}`;

        const expirationDate =
          lufiFile.delay === 0
            ? i18n.noLimit
            : `${i18n.expiration} ${formatDate(
                lufiFile.delay * 86400 + lufiFile.createdAt
              )}`;

        cardDOM.querySelector(".file-expiration").innerText = expirationDate;

        cardDOM.querySelector(".download-button").href = lufiFile.downloadUrl();
        cardDOM.querySelector(".delete-button").href = lufiFile.removeUrl();
        cardDOM.querySelector(".copy-button").onclick = async (event) => {
          event.preventDefault();

          try {
            await navigator.clipboard
              .writeText(lufiFile.downloadUrl())
              .then(() => {
                addToast(i18n.copySuccess, "success");
              });
          } catch (error) {
            showMessage(error.message, "error");
          }
        };

        cardDOM.querySelector(".download-input").value = lufiFile.downloadUrl();
        cardDOM.querySelector(".delete-input").value = lufiFile.removeUrl();

        updateMailLinksButton(lufiFile.keys.server);
        break;
      case "ongoing":
        cardDOM.querySelector(".progress-bar").max = lufiFile.totalChunks;
        break;
    }

    if (existingCard) {
      existingCard.replaceWith(cardDOM);
    } else {
      fileCardsDOM.prepend(cardDOM);
    }

    if (fileCardsDOM.querySelectorAll(".file-card.success").length > 0) {
      showNode(uploadedZoneDOM.querySelector(".buttons"));
    }

    return cardDOM;
  };

  const handleZipEvents = () => {
    zipZoneDOM.querySelector(".action-close").onclick = () => {
      clearZip();
    };

    mustZipDOM.onchange = () => {
      if (!mustZipDOM.checked) {
        clearZip();
      } else {
        showNode(inputZipNameDOM);
      }
    };

    zipNameDOM.oninput = () => {
      let name = zipNameDOM.value || "documents.zip";

      if (!name.endsWith(".zip")) {
        name += name.endsWith(".") ? "zip" : ".zip";
      }

      name = escapeHtml(name);

      zipZoneDOM.querySelector(".file-name").innerText = name;
    };
  };

  /**
   * Decide what to do with files passed to upload zone
   *
   * @param {FileList} files
   */
  const handleFiles = (files) => {
    files = Array.from(files) || [];

    document.body.style.cursor = "wait";

    const { deleteDays, shouldDeleteOnFirstView, password, mustZip } =
      retrieveUploadParams();

    if (!mustZip) {
      files.forEach((file) => {
        addToast(i18n.enqueued.replace("XXX", file.name), "success");
      });

      document.body.style.cursor = "auto";

      startUpload(
        files,
        deleteDays,
        shouldDeleteOnFirstView,
        mustZip,
        undefined,
        password
      );
    } else {
      showNode(zipZoneDOM);

      lufi
        .addFilesToArchive(files, archiveEntries)
        .andThen((entries) => {
          archiveEntries = entries;

          const listDOM = zipZoneDOM.querySelector(".files-list");

          listDOM.replaceChildren();

          for (const [name, file] of Object.entries(archiveEntries)) {
            zipSize += file.length;

            const listItemDOM = document.createElement("li");
            listItemDOM.innerText = `${escapeHtml(name)} (${filesize(
              file.length
            )})`;

            listDOM.appendChild(listItemDOM);
          }

          zipZoneDOM.querySelector(".file-size").textContent =
            filesize(zipSize);

          document.body.style.cursor = "auto";

          return okAsync(undefined);
        })
        .orElse((error) => console.error(error.message));
    }
  };

  const handleUploadEvents = () => {
    dropZoneDOM.addEventListener("drop", (event) => {
      handleFiles(event.dataTransfer.files);
    });
    dropZoneDOM.addEventListener("dragover", (event) => {
      event.dataTransfer.dropEffect = "copy";
    });

    uploadButtonDOM.addEventListener("change", (event) => {
      handleFiles(event.target.files);
    });

    uploadZipDOM.onclick = uploadZip;
  };

  /**
   * Remove a File Card element and hide Uploaded Zone if there is no File Card left
   *
   * @param {Node} card
   */
  const removeFileCard = (serverKey, card) => {
    card.remove();

    updateMailLinksButton(serverKey, true);

    if (fileCardsDOM.children.length === 0) {
      hideNode(uploadedZoneDOM);
    }

    if (fileCardsDOM.querySelectorAll(".file-card.success").length === 0) {
      hideNode(uploadedZoneDOM);
    }
  };

  const retrieveUploadParams = () => {
    const mustZip = document.querySelector("#must-zip").checked;
    const deleteDays = deleteAfterDaysDOM.value;
    const shouldDeleteOnFirstView = deleteOnFirstViewDOM.checked;
    const password = passwordDOM?.value || "";
    const zipName = zipNameDOM.value;

    return { deleteDays, shouldDeleteOnFirstView, password, mustZip, zipName };
  };

  /**
   * Show a notification at the top of the page
   *
   * @param {string} text
   * @param {string} type Can be error or success
   */
  const showMessage = (text, type) => {
    const messageDOM = document.createElement("div");

    messageDOM.innerText = text;
    messageDOM.classList.add("message-card", type);

    messagesZoneDOM.appendChild(messageDOM);
  };

  /**
   * Show an error message inside the File Card.
   *
   * @param {LufiJob} job
   * @param {Node} cardDOM
   * @param {string} text
   */
  const showErrorOnCard = (job, cardDOM, text) => {
    const errorCardDOM = createFileCard(job, "error", cardDOM);

    errorCardDOM.querySelector(".upload-error").innerText = text;
  };

  /**
   * [Invitation feature] Send URLs of files to server
   */
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
            addToast(data.msg, "success");
          } else {
            addToast(data.msg, "error");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  /**
   * Start the upload of provided files
   *
   * @param {File[]} files
   * @param {number} delay
   * @param {boolean} delAtFirstView
   * @param {boolean} isZipped
   * @param {string} zipName
   * @param {string} password
   * @returns
   */
  const startUpload = (
    files,
    delay,
    delAtFirstView,
    isZipped,
    zipName,
    password
  ) => {
    showNode(uploadedZoneDOM);

    const serverUrl = new URL(ws_url.replace("/upload", ""));
    serverUrl.protocol = serverUrl.protocol === "ws:" ? "http:" : "https:";

    return lufi
      .upload(
        serverUrl.href,
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
            const ongoingFileCardDOM = createFileCard(job, "ongoing");

            job.onProgress(() => {
              updateProgressBar(job.lufiFile, ongoingFileCardDOM);
            });

            return job
              .waitForCompletion()
              .andThen((job) => {
                notify(i18n.fileUploaded, job.lufiFile.name);

                createFileCard(
                  job,
                  isGuest ? "guest" : "success",
                  ongoingFileCardDOM
                );

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

                  sendFilesURLs();
                }

                return okAsync(job);
              })
              .orElse((error) => {
                showErrorOnCard(job, ongoingFileCardDOM, error.message);

                if (isGuest) {
                  sendFilesURLs();
                }

                return errAsync(error);
              });
          })
        )
      )
      .orElse((error) => console.error(error));
  };

  /**
   * Update the "send all links by mail" button.
   *
   * @param {string} serverKey
   * @param {boolean} remove If we should remove the serverKey from the links
   */
  const updateMailLinksButton = (serverKey, remove = false) => {
    const buttonDOM = document.querySelector(".action-mail-links");
    const url = new URL(buttonDOM.href);
    let links = JSON.parse(url.searchParams.get("links") || "[]");

    if (remove) {
      links = links.filter((item) => item !== serverKey);
    } else {
      links.push(serverKey);
    }

    url.searchParams.set("links", JSON.stringify(links));

    buttonDOM.href = url;
  };

  /**
   * Update the progress bar of the File Card
   *
   * @param {LufiFile} lufiFile
   * @param {Node} cardDOM
   */
  const updateProgressBar = (lufiFile, cardDOM) => {
    const percent = Math.round(
      (lufiFile.chunksReady * 100) / lufiFile.totalChunks
    );

    cardDOM.querySelector(".progress-bar").style.width = `${percent}%`;

    cardDOM.querySelector(".progress-percent").innerText = percent;
  };

  const uploadZip = () => {
    document.body.style.cursor = "wait";
    hideNode(zipZoneDOM.querySelector(".action-upload-zip"));
    showNode(zipZoneDOM.querySelector(".zip-compressing"));

    const { zipName, deleteDays, shouldDeleteOnFirstView, password } =
      retrieveUploadParams();

    lufi
      .compress(archiveEntries, zipName)
      .andThen((job) => {
        document.body.style.cursor = "auto";

        zipZoneDOM.querySelector(".action-close").onclick = () => {
          job.terminate();

          clearZip();
        };

        return job.waitForCompletion();
      })
      .map((job) => {
        // if '.zip-zone' is hidden, the zipping has been aborted
        if (!zipZoneDOM.classList.contains("hidden")) {
          addToast(i18n.enqueued.replace("XXX", zipName), "success");

          clearZip();

          return startUpload(
            [job.archiveFile],
            deleteDays,
            shouldDeleteOnFirstView,
            true,
            zipName,
            password
          );
        }
      })
      .mapErr((error) => showMessage(error.message));
  };

  if (maxSize) {
    maxFileSizeDOM.style.display = "block";
    maxFileSizeDOM.textContent = i18n.maxSize.replace("XXX", filesize(maxSize));
  }

  handleUploadEvents();
  handleZipEvents();

  document.querySelector(".action-copy-links").onclick = () => {
    copyLinksToClipboard();
  };
});
