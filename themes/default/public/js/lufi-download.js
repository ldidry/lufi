import { lufi } from "./lufi.js";
import { filesize } from "./filesize.esm.min.js";

document.addEventListener("DOMContentLoaded", () => {
  const reloadButtonDOM = document.querySelector(".action-reload");
  const passwordFormDOM = document.querySelector(".password-form");
  const downloadContainerDOM = document.querySelector(".download-container");
  const passwordInputDOM = document.querySelector(".input-password");

  /**
   * Update the DOM depending on the situation
   *
   * @param {LufiFile} lufiFile
   * @param {string} type Can be aborted, success or ongoing
   * @param {Node} existingCard Existing card to be replaced with the new one
   * @returns
   */
  const updateDOM = (lufiFile = undefined, type) => {
    const cardDOM = document
      .querySelector(`template#download-card-${type}`)
      .content.cloneNode(true).children[0];

    if (lufiFile) {
      cardDOM.querySelector(".file-size").innerText = filesize(lufiFile.size);
    }

    downloadContainerDOM.replaceChildren(cardDOM);

    if (type === "success") {
      cardDOM.querySelector(".action-download").focus();
    }

    return cardDOM;
  };

  const isPasswordNeeded = () => passwordInputDOM !== null;

  const onPasswordEvents = () => {
    passwordFormDOM.onsubmit = (event) => {
      event.preventDefault();

      passwordFormDOM.classList.add("hidden");

      startDownload();
    };
  };

  const showZipContent = (zipFile, cardDOM) => {
    const zipContainerDOM = cardDOM.querySelector(".content .zip-container");

    zipContainerDOM.classList.remove("hidden");

    zipContainerDOM.querySelector(".action-show-zip").onclick = (event) => {
      event.target.classList.add("hidden");

      const zipContentDOM = zipContainerDOM.querySelector(".zip-content");

      zipContentDOM.classList.remove("hidden");

      document.body.style.cursor = "wait";

      lufi
        .decompress(zipFile)
        .andThen((job) => job.waitForCompletion())
        .map((job) => {
          job.archiveFiles.forEach((file) => {
            const itemDOM = zipContainerDOM
              .querySelector("template#zip-item")
              .content.cloneNode(true).children[0];

            itemDOM.querySelector(".file-name").innerText = escapeHtml(
              file.name
            );
            itemDOM.querySelector(".file-size").innerText = filesize(file.size);

            const downloadItemDOM = itemDOM.querySelector(
              ".action-download-item"
            );

            downloadItemDOM.download = escapeHtml(file.name);
            downloadItemDOM.href = URL.createObjectURL(file);

            zipContentDOM.querySelector("ul").append(itemDOM);
          });

          document.body.style.cursor = "auto";
        })
        .mapErr((error) => {
          console.error(error);
        });
    };
  };

  const startDownload = () => {
    lufi
      .download(
        window.location,
        passwordInputDOM?.querySelector("#file-password").value
      )
      .andThen((job) => {
        const cardDOM = updateDOM(job.lufiFile, "ongoing");

        warnOnReload();
        job.onProgress(() => {
          const percent = Math.round(
            (job.lufiFile.chunksReady * 100) / job.lufiFile.totalChunks
          );

          cardDOM.querySelector(".progress-bar").style.width = `${percent}%`;
        });

        document.querySelector(".action-abort").onclick = () => {
          job.terminate();

          warnOnReload(false);

          updateDOM(lufiFile, "aborted");

          reloadButtonDOM.onclick = (event) => {
            event.preventDefault();
            window.location.reload();
          };
        };

        return job.waitForCompletion();
      })
      .mapErr((error) => {
        updateDOM(undefined, "error").querySelector(".message-card").innerText =
          error.message;

        warnOnReload(false);
      })
      .andThen((job) => {
        notify(i18n.fileDownloaded, job.lufiFile.name);

        const downloadDOM = updateDOM(job.lufiFile, "success");

        const blobURL = URL.createObjectURL(job.downloadedFile);

        downloadDOM.querySelector(".action-download").href = blobURL;
        downloadDOM.querySelector(".action-download").download = escapeHtml(
          job.lufiFile.name
        );

        const isZipped =
          downloadDOM
            .querySelector(".file-description")
            .getAttribute("data-isZipped") === "true";

        let content;

        if (job.lufiFile.type.match(/^image\//) !== null) {
          content = `<img alt="${escapeHtml(
            job.lufiFile.name
          )}" src="${blobURL}">`;
        } else if (job.lufiFile.type.match(/^video\//) !== null) {
          content = `<video controls><source src="${blobURL}" type="${job.lufiFile.type}"></video>`;
        } else if (job.lufiFile.type.match(/^audio\//) !== null) {
          content = `<audio controls><source src="${blobURL}" type="${job.lufiFile.type}"></audio>`;
        }

        if (content) {
          downloadDOM.querySelector(".content").innerHTML = content;
        }

        if (isZipped) {
          showZipContent(job.downloadedFile, downloadDOM);
        }
      });
  };

  const warnOnReload = (toWarn = true) => {
    window.onbeforeunload = toWarn ? i18n.confirmExit : null;
  };

  if (isPasswordNeeded()) {
    onPasswordEvents();
  } else {
    startDownload();
  }
});
