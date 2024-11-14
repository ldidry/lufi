// vim:set sw=4 ts=4 sts=4 ft=javascript expandtab:
import { lufi } from "/js/lufi.js";

const abortedDOM = document.createElement("div");
abortedDOM.innerHTML = `<h4>${i18n.aborted1}</h4>
                                      <p>
                                          <a id="reloadLocation"
                                             class="waves-effect waves-light btn">
                                              ${i18n.aborted2}
                                          </a>
                                      </p>`;

const loadingDOM = document.getElementById("loading");
const passwordDOM = document.getElementById("file_pwd");
const filesizeDOM = document.getElementById("filesize");

document.addEventListener("DOMContentLoaded", () => {
  let go = true;

  filesizeDOM.innerHTML = filesize(
    filesizeDOM.attributes.getNamedItem("data-filesize").value
  );

  if (isPasswordNeeded()) {
    go = false;

    passwordDOM.focus();

    onPasswordEvents();
  }

  if (go) {
    startDownload();
  }
});

const isPasswordNeeded = () =>
  document.querySelectorAll("#file_pwd").length === 1;

const startDownload = () => {
  warnOnReload();

  lufi
    .download(window.location, passwordDOM?.value)
    .andThen((job) => {
      job.onProgress(() => {
        updateProgress(job.lufiFile);
      });

      document.getElementById("abort").onclick = () => {
        removeElements(["please-wait", "pbd", "loading", "abort"]);

        job.terminate();

        filesizeDOM.parentElement.append(abortedDOM);
        warnOnReload(false);

        document.getElementById("reloadLocation").onclick = (e) => {
          e.preventDefault();
          window.location.reload();
        };
      };

      return job.waitForCompletion();
    })
    .mapErr((error) => {
      addAlert(error.message);
      warnOnReload(false);
      removeElements(["abort"]);
    })
    .andThen((job) => {
      notify(i18n.fileDownloaded, job.lufiFile.name);
      removeElements(["please-wait", "loading"]);

      const pbd = document.getElementById("pbd");
      pbd.className = "center-align";

      const blobURL = URL.createObjectURL(job.tmpFile);

      let htmlContent = `<p><a href="${blobURL}" class="btn btn-primary" download="${escapeHtml(
        job.lufiFile.name
      )}">${i18n.download}</a></p>`;

      var isZip = filesizeDOM.getAttribute("data-zipped") === "true";

      if (job.lufiFile.type.match(/^image\//) !== null) {
        htmlContent += `<img id="render-image" class="responsive-img" alt="${escapeHtml(
          job.lufiFile.name
        )}" src="${blobURL}">`;
      } else if (job.lufiFile.type.match(/^video\//) !== null) {
        htmlContent += `<video class="responsive-video" controls>
                                  <source src="${blobURL}" type="${job.lufiFile.type}">
                              </video>`;
      } else if (job.lufiFile.type.match(/^audio\//) !== null) {
        htmlContent += `<audio class="responsive-video" controls>
                                  <source src="${blobURL}" type="${job.lufiFile.type}">
                              </audio>`;
      } else if (isZip) {
        htmlContent += `<p><a class="btn btn-primary" id="showZipContent">${i18n.showZipContent}</a></p>`;
      }

      pbd.innerHTML = htmlContent;

      if (isZip) {
        showZipContent(job.tmpFile);
      }

      document.getElementById("abort").remove();
    });
};

/**
 * Remove elements using their id
 * @param elements
 */
const removeElements = (elements) => {
  elements.forEach((id) => {
    if (document.getElementById(id)) {
      document.getElementById(id).remove();
    } else {
      console.error(`${id} does not exist`);
    }
  });
};

const onPasswordEvents = () => {
  const callback = () => {
    document
      .getElementsByClassName("file-progress")[0]
      .classList.remove("hide");
    document.getElementsByClassName("file-abort")[0].classList.remove("hide");

    passwordDOM.parentElement.parentElement.classList.add("hide");

    startDownload();
  };

  document.getElementById("go").onclick = () => {
    callback();
  };

  document.getElementById("file_pwd").onkeydown = (event) => {
    if (event.key === "Enter") {
      callback();
    }
  };
};

// Something's wring
const addAlert = (msg) => {
  removeElements(["please-wait"]);

  let pbd = document.getElementsByClassName("file-progress")[0];

  pbd.setAttribute("role", "alert");

  pbd.classList.remove("progress");

  pbd.innerHTML = `<div class="card pink">
                  <div class="card-content white-text">
                      <strong>${msg}</strong>
                  </div>
              </div>`;
};

const warnOnReload = (toWarn = true) => {
  window.onbeforeunload = toWarn ? confirmExit : null;
};

const updateProgress = (lufiFile) => {
  // Update loading text
  loadingDOM.textContent = i18n.loading.replace(/XX1/, lufiFile.chunksReady);

  // Update progress bar
  const percent =
    Math.round((1000 * lufiFile.chunksReady) / lufiFile.totalChunks) / 10;
  const wClass = percent.toString().replace(".", "-");

  const pb = document.getElementById("pb");
  pb.className = `determinate width-${wClass}`;
  pb.attributes.getNamedItem("aria-valuenow").value = percent;

  document.getElementById("pbt").innerHTML = `${percent}%`;
};

const showZipContent = (zipFile) => {
  const showZipContentDOM = document.getElementById("showZipContent");

  const showZipContentDOMListener = () => {
    showZipContentDOM.onclick = () => {};

    document.body.style.cursor = "wait";
    lufi.decompress(zipFile).andThen((files) => {
      const newElement = document.createElement("div");

      let innerHTML = `<h3>${i18n.zipContent}</h3><ul>`;

      files.forEach((file) => {
        innerHTML += `<li>
                                  ${escapeHtml(file.name)}
                                  (${filesize(file.size)})
                                  <a href="#"
                                     download="${escapeHtml(file.name)}"
                                     class="download-zip-content"
                                     title="${i18n.download}">
                                       <i class="mdi-file-file-download"></i>
                                  </a>
                              </li>`;
      });

      innerHTML += "</ul>";

      newElement.innerHTML = innerHTML;

      pbd.append(newElement);

      document.querySelectorAll(".download-zip-content").forEach((element) => {
        const elementListener = (e) => {
          e.preventDefault();

          const filename = element.getAttribute("download");
          const file = files.find((file) => file.name === filename);

          element.removeEventListener("click", elementListener);
          element.setAttribute("href", URL.createObjectURL(file));
          element.click();
        };
        element.addEventListener("click", elementListener);

        showZipContentDOM.style.display = "none";
        document.body.style.cursor = "auto";
      });
    });
  };

  showZipContentDOM.onclick = showZipContentDOMListener;
};
