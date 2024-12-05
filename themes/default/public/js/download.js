import { lufi } from "~/lib/lufi.js";
import { filesize } from "~/lib/filesize.esm.min.js";
import { notify, escapeHtml } from "~/lib/utils.js";

document.addEventListener("DOMContentLoaded", () => {
  const passwordFormDOM = document.getElementById("password-form");
  /**
   * Update the DOM depending on the situation
   *
   * @param {string} type Can be aborted, success or ongoing
   * @param {Node} existingCard Existing card to be replaced with the new one
   * @returns
   */
  const updateDOM = (type) => {
    const blockDOM = document
      .querySelector(`template#block-download-${type}`)
      .content.cloneNode(true).children[0];

    blockDOM.querySelector(".size").innerText = filesize(
      blockDOM.querySelector(".size").dataset.filesize
    );

    if (blockDOM.querySelector(".description").dataset.isZipped === "true") {
      blockDOM
        .querySelector(".icon")
        .classList.replace("fa-file", "fa-file-zipper");
    }

    document.getElementById("download-container").replaceChildren(blockDOM);

    if (type === "success") {
      document.getElementById("download-button").focus();
    }

    return blockDOM;
  };

  const isPasswordNeeded = () => passwordFormDOM !== null;

  const onPasswordEvents = () => {
    passwordFormDOM.onsubmit = (event) => {
      event.preventDefault();

      passwordFormDOM.classList.add("is-hidden");

      startDownload();
    };
  };

  const showZipContent = (zipFile) => {
    const zipContainerDOM = document.getElementById("zip-container");
    const showZipButtonDOM = document.getElementById("show-zip-button");

    zipContainerDOM.classList.remove("is-hidden");
    showZipButtonDOM.href = window.location; // Avoid removing the client key from URL when clicking

    showZipButtonDOM.onclick = () => {
      const zipContentDOM = zipContainerDOM.querySelector(".content");

      document.body.style.cursor = "wait";
      showZipButtonDOM.style.cursor = "wait";

      lufi
        .decompress(zipFile)
        .andThen((job) => job.waitForCompletion())
        .map((job) => {
          zipContentDOM.replaceChildren();

          zipContentDOM.classList.remove("has-text-centered");

          job.archiveFiles.forEach((file) => {
            const itemDOM = document
              .querySelector("template#card-zipped-item")
              .content.cloneNode(true).children[0];

            itemDOM.querySelector(".name").innerText = escapeHtml(file.name);
            itemDOM.querySelector(".size").innerText = filesize(file.size);

            const downloadItemDOM = itemDOM.querySelector(".action-download");

            downloadItemDOM.download = escapeHtml(file.name);
            downloadItemDOM.href = URL.createObjectURL(file);

            zipContentDOM.append(itemDOM);
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
      .download(window.location, document.getElementById("password")?.value)
      .andThen((job) => {
        const blockDOM = updateDOM("ongoing");

        warnOnReload();
        job.onProgress(() => {
          const percent = Math.round(
            (job.lufiFile.chunksReady * 100) / job.lufiFile.totalChunks
          );

          blockDOM.querySelector(".progress").value = percent;
          blockDOM.querySelector(".progress").innerText = percent;
          blockDOM.querySelector(".progress-text").innerText = percent + "%";
        });

        document.getElementById("abort-button").onclick = () => {
          job.terminate();

          warnOnReload(false);

          updateDOM("aborted");

          document.getElementById("reload-button").onclick = (event) => {
            event.preventDefault();
            window.location.reload();
          };
        };

        return job.waitForCompletion();
      })
      .mapErr((error) => {
        updateDOM("error").querySelector(".message-body").innerText =
          error.message;

        warnOnReload(false);
      })
      .andThen((job) => {
        notify(i18n.fileDownloaded, job.lufiFile.name);

        const downloadDOM = updateDOM("success");
        const downloadButtonDOM = document.getElementById("download-button");

        const blobURL = URL.createObjectURL(job.downloadedFile);

        downloadButtonDOM.href = blobURL;
        downloadButtonDOM.download = escapeHtml(job.lufiFile.name);

        const isZipped =
          downloadDOM.querySelector(".description").dataset.isZipped === "true";

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
          showZipContent(job.downloadedFile);
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
