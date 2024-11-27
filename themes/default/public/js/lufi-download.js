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
   * @param {string} type Can be aborted, success or ongoing
   * @param {Node} existingCard Existing card to be replaced with the new one
   * @returns
   */
  const updateDOM = (type) => {
    const cardDOM = document
      .querySelector(`template#download-card-${type}`)
      .content.cloneNode(true).children[0];

    cardDOM.querySelector(".file-size").innerText = filesize(
      cardDOM.querySelector(".file-size").getAttribute("data-filesize")
    );

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

      hideNode(passwordFormDOM);

      startDownload();
    };
  };

  const showZipContent = (zipFile, cardDOM) => {
    const zipContainerDOM = cardDOM.querySelector(".content .zip-container");

    showNode(zipContainerDOM);

    zipContainerDOM.querySelector(".action-show-zip").onclick = (event) => {
      hideNode(event.target);

      const zipContentDOM = zipContainerDOM.querySelector(".zip-content");

      showNode(zipContentDOM);

      document.body.style.cursor = "wait";

      lufi
        .decompress(zipFile)
        .andThen((job) => job.waitForCompletion())
        .map((job) => {
          job.archiveFiles.forEach((file) => {
            const itemDOM = document
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
        const cardDOM = updateDOM("ongoing");

        warnOnReload();
        job.onProgress(() => {
          const percent =
            Math.round(
              (job.lufiFile.chunksReady * 100) / job.lufiFile.totalChunks
            ) + "%";

          cardDOM.querySelector(".progress-bar").style.width = percent;
          cardDOM.querySelector(".loading-message").innerText =
            i18n.loading.replace("XX1", job.lufiFile.chunksReady);
        });

        document.querySelector(".action-abort").onclick = () => {
          job.terminate();

          warnOnReload(false);

          updateDOM("aborted");

          reloadButtonDOM.onclick = (event) => {
            event.preventDefault();
            window.location.reload();
          };
        };

        return job.waitForCompletion();
      })
      .mapErr((error) => {
        updateDOM("error").querySelector(".message-card").innerText =
          error.message;

        warnOnReload(false);
      })
      .andThen((job) => {
        notify(i18n.fileDownloaded, job.lufiFile.name);

        const downloadDOM = updateDOM("success");

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
