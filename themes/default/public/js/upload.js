import {
  lufi,
  errAsync,
  okAsync,
  ResultAsync,
  CryptoAlgorithm,
  JobStatus,
} from "~/lib/lufi.js";
import { copyToClipboard, formatDate, notify, uuidv4 } from "~/lib/utils.js";

import { filesize } from "~/lib/filesize.esm.min.js";

document.addEventListener("DOMContentLoaded", () => {
  const initCard = (cardType, cardId = null) => {
    const card = document
      .querySelector(`template#card-file-${cardType}`)
      .content.cloneNode(true).children[0];

    if (cardId) {
      card.classList.add(`card-${encodeURIComponent(cardId)}`);
    }

    card
      .querySelector("button .delete")
      .parentNode.addEventListener("keydown", (event) => {
        if (event.key === " " || event.key === "enter") {
          event.target.click();
        }
      });

    card
      .querySelector("button .delete")
      .parentNode.addEventListener("click", () => {
        card.remove();

        if (document.getElementById("uploaded-files").children.length === 0) {
          document
            .getElementById("lufi-description")
            .classList.remove("is-hidden");
        }
      });

    return card;
  };

  const showErrorCard = (error, cardId, lufiFile = null) => {
    const errorCard = initCard("error", cardId);

    if (lufiFile) {
      errorCard.querySelector(".name").innerText = lufiFile.name;
      errorCard.querySelector(".size").innerText = filesize(lufiFile.size);
    }

    const actualCard = document.querySelector(`.card-${cardId}`);

    if (actualCard.classList.contains("card-file-error")) {
      errorCard.querySelector(
        ".message-body"
      ).innerText += `\n${error.message}`;
    } else {
      errorCard.querySelector(".message-body").innerText = error.message;

      document
        .getElementById("uploaded-files")
        .replaceChild(errorCard, document.querySelector(`.card-${cardId}`));
    }
  };

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
    const files = JSON.parse(localStorage.getItem(`${prefix}files`)) || [];

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

  /**
   * [Invitation feature] Send URLs of files to server
   */
  const sendGuestFiles = (fileURL) => {
    fetch(sendGuestFileURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        urls: [fileURL],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          notify(data.msg, "success");
        } else {
          notify(data.msg, "danger");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
    const uploadedFilesDOM = document.getElementById("uploaded-files");

    const skeletonCardDOM = document
      .querySelector("template#card-file-skeleton")
      .content.cloneNode(true).children[0];

    uploadedFilesDOM.prepend(skeletonCardDOM);

    const serverUrl = new URL(ws_url.replace("/upload", ""));
    serverUrl.protocol = serverUrl.protocol === "ws:" ? "http:" : "https:";

    document.getElementById("lufi-description").classList.add("is-hidden");

    const generateCardId = () =>
      isSecureContext ? crypto.randomUUID() : uuidv4();

    const zippedCardId = isZipped ? generateCardId() : null;
    const zippedUploadingFileCard = isZipped
      ? initCard("uploading", zippedCardId)
      : null;

    const runUpload = (job = null) => {
      if (!job || job.status === JobStatus.COMPLETE) {
        return lufi
          .upload(
            serverUrl.href,
            files,
            delay,
            delAtFirstView,
            isZipped,
            zipName,
            password,
            isSecureContext ? CryptoAlgorithm.WebCrypto : CryptoAlgorithm.Sjcl
          )
          .andThen((jobs) =>
            ResultAsync.combine(
              jobs.map((job) => {
                const cardId = isZipped ? zippedCardId : generateCardId();
                const uploadingFileCard = isZipped
                  ? zippedUploadingFileCard
                  : initCard("uploading", cardId);

                uploadingFileCard.querySelector(".name").innerText =
                  job.lufiFile.name;
                uploadingFileCard.querySelector(".size").innerText = filesize(
                  job.lufiFile.size
                );

                uploadingFileCard.querySelector(".info").innerText =
                  i18n.uploading;

                uploadingFileCard
                  .querySelector("button .delete")
                  .parentNode.addEventListener("click", () => {
                    lufi.cancel(job);
                  });

                job.onProgress(() => {
                  updateProgressBar(job.lufiFile, uploadingFileCard);
                });

                skeletonCardDOM.remove();
                uploadedFilesDOM.prepend(uploadingFileCard);

                return job
                  .waitForCompletion()
                  .andThen((job) => {
                    notify(i18n.fileUploaded, job.lufiFile.name);
                    const uploadedFileCard = initCard("uploaded", cardId);

                    const expirationDate =
                      job.lufiFile.delay === 0
                        ? i18n.noLimit
                        : `${i18n.expiration} ${formatDate(
                            job.lufiFile.delay * 86400 + job.lufiFile.createdAt
                          )}`;

                    if (job.lufiFile.type === "application/zip") {
                      uploadedFileCard
                        .querySelector(".content .icon")
                        .classList.replace("fa-file", "fa-file-zipper");
                    }

                    uploadedFileCard.querySelector(".name").innerText =
                      job.lufiFile.name;
                    uploadedFileCard.querySelector(".size").innerText =
                      filesize(job.lufiFile.size);
                    uploadedFileCard.querySelector(".expiration").innerText =
                      expirationDate;

                    if (!isGuest) {
                      uploadedFileCard.querySelector(".action-download").href =
                        job.lufiFile.downloadUrl();
                      uploadedFileCard.querySelector(".action-delete").href =
                        job.lufiFile.removeUrl();
                      uploadedFileCard.querySelector(".action-share").href = `${
                        job.lufiFile.serverUrl
                      }m?links=${encodeURIComponent(
                        '["' + job.lufiFile.keys.server + '"]'
                      )}`;

                      uploadedFileCard
                        .querySelector(".action-copy")
                        .addEventListener("click", async () => {
                          await copyToClipboard(job.lufiFile.downloadUrl());

                          uploadedFileCard.querySelector(
                            ".action-copy .text"
                          ).innerText = i18n.copied;
                          setTimeout(() => {
                            uploadedFileCard.querySelector(
                              ".action-copy .text"
                            ).innerText = i18n.copyLink;
                          }, 1000);
                        });
                    }

                    uploadedFilesDOM.replaceChild(
                      uploadedFileCard,
                      uploadingFileCard
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
                      sendGuestFiles(
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
                  .orElse((error) => {
                    showErrorCard(error, zippedCardId, job.lufiFile);
                    return errAsync(error);
                  });
              })
            )
          )
          .orElse((error) => {
            showErrorCard(error, zippedCardId);

            return errAsync(error);
          });
      } else {
        return okAsync(undefined);
      }
    };

    if (isZipped) {
      zippedUploadingFileCard.querySelector(".name").innerText = zipName;
      zippedUploadingFileCard.querySelector(".size").innerText =
        i18n.unknownYet;
      zippedUploadingFileCard.querySelector(".info").innerText =
        i18n.compressing;

      uploadedFilesDOM.prepend(zippedUploadingFileCard);

      return lufi
        .addFilesToArchive(files)
        .andThen((archiveEntries) => lufi.compress(archiveEntries, zipName))
        .andThen((job) => {
          if (zippedUploadingFileCard.querySelector(".name")) {
            zippedUploadingFileCard
              .querySelector("button .delete")
              .parentNode.addEventListener("click", () => {
                job.terminate();
              });
          } else {
            // If card has already been deleted,
            job.terminate();
          }

          return job.waitForCompletion();
        })
        .andThen(runUpload)
        .mapErr((error) => {
          showErrorCard(error, zippedCardId);
        });
    } else {
      return runUpload();
    }
  };

  const showSmallUploadZone = () => {
    document.getElementById("provided-files").classList.remove("is-hidden");
    document.getElementById("upload-controls").classList.remove("is-hidden");
    document
      .querySelector("#file-js-upload .total-size")
      .classList.remove("is-hidden");

    document
      .querySelector("#file-js-upload .small-version")
      .classList.remove("is-hidden");
    document
      .querySelector("#file-js-upload .full-version")
      .classList.add("is-hidden");
  };

  const showFullUploadZone = () => {
    document.querySelector("#provided-files").classList.add("is-hidden");
    document.getElementById("upload-controls").classList.add("is-hidden");
    document
      .querySelector("#file-js-upload .total-size")
      .classList.add("is-hidden");

    document
      .querySelector("#file-js-upload .small-version")
      .classList.add("is-hidden");
    document
      .querySelector("#file-js-upload .full-version")
      .classList.remove("is-hidden");
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

    cardDOM.querySelector(".progress").value = percent;
    cardDOM.querySelector(".progress").innerText = percent;
    cardDOM.querySelector(".progress-text").innerText = percent + "%";
  };

  const fileInput = document.querySelector("#file-js-upload input[type=file]");
  let providedFiles = [];
  let totalSize = 0;

  const handleFilesPick = (files) => {
    const providedFilesDOM = document.getElementById("provided-files");

    Array.from(files).forEach((file) => {
      if (!providedFiles.find((f) => file.name === f.name)) {
        providedFiles.push(file);

        const fileCard = initCard("to-upload");

        fileCard.querySelector(".name").innerText = file.name;
        fileCard.querySelector(".size").innerText = filesize(file.size);

        fileCard
          .querySelector("button .delete")
          .parentNode.addEventListener("click", () => {
            providedFiles = providedFiles.filter((f) => file.name !== f.name);

            totalSize -= file.size;
            document.querySelector(".total-size .size").innerText =
              filesize(totalSize);

            if (providedFiles.length > 1) {
              document
                .getElementById("zip-fields")
                .classList.remove("is-hidden");
            } else {
              document.getElementById("zip-fields").classList.add("is-hidden");
            }

            if (providedFiles.length === 0) {
              document
                .getElementById("upload-controls")
                .classList.add("is-hidden");
              providedFilesDOM.classList.add("is-hidden");
              document
                .querySelector("#file-js-upload .small-version")
                .classList.add("is-hidden");
              document
                .querySelector("#file-js-upload .full-version")
                .classList.remove("is-hidden");

              showFullUploadZone();
            }
          });

        providedFilesDOM.append(fileCard);
        totalSize += file.size;
      }

      document.querySelector(".total-size .size").innerText =
        filesize(totalSize);

      showSmallUploadZone();
    });

    if (providedFiles.length > 1) {
      document.getElementById("zip-fields").classList.remove("is-hidden");
    } else {
      document.getElementById("zip-fields").classList.add("is-hidden");
    }
  };

  fileInput.onchange = () => handleFilesPick(fileInput.files);

  document.getElementById("zip-multiple").onchange = () => {
    document.getElementById("zip-name").classList.toggle("is-invisible");
  };

  document.getElementById("use-password").onchange = () => {
    document
      .getElementById("password-control")
      .classList.toggle("is-invisible");
  };

  document.getElementById("password-preview-button").onclick = (event) => {
    if (event.target.classList.contains("fa-eye")) {
      event.target.classList.replace("fa-eye", "fa-eye-slash");
      document.querySelector("#password-control input").type = "text";
    } else {
      event.target.classList.replace("fa-eye-slash", "fa-eye");
      document.querySelector("#password-control input").type = "password";
    }
  };

  document.getElementById("upload-zone-button").onclick = () =>
    fileInput.click();

  document.getElementById("submit-button").onclick = () => {
    const delay = document.getElementById("expiration-delay").value;
    const deleteAfterDownload = document.getElementById(
      "delete-at-first-download"
    ).checked;
    const password = document.getElementById("use-password").checked
      ? document.getElementById("password-input").value
      : "";

    const zipMultiple = document.getElementById("zip-multiple").checked;
    let zipName = document.querySelector("#zip-name input").value;
    zipName = zipName.endsWith(".zip") ? zipName : `${zipName}.zip`;
    
    const mustZip = providedFiles.length > 1 ? zipMultiple : false;

    startUpload(
      providedFiles,
      delay,
      deleteAfterDownload,
      mustZip,
      zipName,
      password
    );

    fileInput.value = null;
    providedFiles = [];
    document.getElementById("provided-files").replaceChildren();

    showFullUploadZone();
  };

  document.getElementById("file-js-upload").ondragover = (event) => {
    event.stopPropagation();
    event.preventDefault();

    event.dataTransfer.dropEffect = "copy";
  };

  document.querySelector("#file-js-upload").ondrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    handleFilesPick(event.dataTransfer.files);
  };

  if (maxSize) {
    const maxSizeDOM = document.createElement("span");
    maxSizeDOM.innerText = i18n.maxSize.replace("XXX", filesize(maxSize));

    maxSizeDOM.classList.add("is-size-5", "is-size-6-mobile");

    document
      .querySelector("#upload-box .file-cta .file-label")
      .append(maxSizeDOM);
  }
});
