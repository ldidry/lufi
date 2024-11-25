// vim:set sw=4 ts=4 sts=4 ft=javascript expandtab:
// Add item to localStorage
const addItem = (item) => {
  const files = JSON.parse(localStorage.getItem(`${window.prefix}files`)) || [];

  files.push(item);
  localStorage.setItem(`${window.prefix}files`, JSON.stringify(files));
};

const delItem = (name) => {
  const files = JSON.parse(localStorage.getItem(`${window.prefix}files`)) || [];

  let i;
  for (i = 0; i < files.length; i++) {
    if (files[i].short === name) {
      files.splice(i, 1);
    }
  }
  localStorage.setItem(`${window.prefix}files`, JSON.stringify(files));
};

const itemExists = (name) => {
  let files = localStorage.getItem(`${window.prefix}files`);
  if (files === null) {
    return false;
  } else {
    files = JSON.parse(files);

    let i;
    for (i = 0; i < files.length; i++) {
      if (files[i].short === name) {
        return true;
      }
    }
    return false;
  }
};

const invertSelection = (event) => {
  event.preventDefault();
  document.querySelectorAll('input[type="checkbox"]').forEach((element) => {
    element.click();

    if (element.getAttribute("data-checked") === "data-checked") {
      element.setAttribute("data-checked", null);
    } else {
      element.setAttribute("data-checked", "data-checked");
    }
  });
  evaluateMassDelete();
};

const purgeExpired = (event) => {
  event.preventDefault();

  const files = JSON.parse(localStorage.getItem(`${window.prefix}files`));

  files.forEach(function (element) {
    fetch(counterURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: new URLSearchParams({
        short: element.short,
        token: element.token,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request error.");
        }

        return response.json();
      })
      .then((data) => {
        if (data.success) {
          if (data.deleted) {
            const elementToRemove = document.querySelector(
              `#count-${data.short}`
            );

            if (elementToRemove) {
              elementToRemove.parentElement.remove();
            }

            delItem(data.short);
          }
        }
      });
  });
};

const exportStorage = (event) => {
  event.preventDefault();

  const a = document.createElement("a");
  a.id = "data-json";

  a.style.display = "none";

  document.body.append(a);

  const storageData = [localStorage.getItem(`${window.prefix}files`)];
  const exportFile = new Blob(storageData, { type: "application/json" });
  const url = window.URL.createObjectURL(exportFile);

  a.setAttribute("href", url);
  a.setAttribute("download", "data.json");

  a.click();
  a.remove();
};

const importStorage = (f) => {
  let reader = new FileReader();

  reader.addEventListener("loadend", () => {
    try {
      const newFiles = JSON.parse(
        String.fromCharCode.apply(null, new Uint8Array(reader.result))
      );
      let i;
      let hasImported = 0;
      for (i = 0; i < newFiles.length; i++) {
        const item = newFiles[i];
        if (validURL(item.url) && !itemExists(item.short)) {
          addItem(item);
          hasImported++;
        }
      }
      populateFilesTable();

      Materialize.toast(i18n.importProcessed);
    } catch (err) {
      alert(err);
    }
  });
  reader.readAsArrayBuffer(f[0]);
};

const validURL = (str) => {
  try {
    return new URL(str).host ? true : false;
  } catch (e) {
    return false;
  }
};

const delFile = (element) => {
  const deleteUrl = new URL(element.getAttribute("data-dlink"));
  const short = element.getAttribute("data-short");

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
        document.getElementById(`row-${short}`).remove();
        delItem(short);
      } else {
        alert(data.msg);
      }
      evaluateMassDelete();
    });
};

const evaluateMassDelete = () => {
  const massDeleteDOM = document.getElementById("mass-delete");

  if (
    document.querySelectorAll('input[data-checked="data-checked"]').length > 0
  ) {
    massDeleteDOM.removeAttribute("disabled");
    massDeleteDOM.classList.remove("disabled");
  } else {
    massDeleteDOM.setAttribute("disabled", "disabled");
    massDeleteDOM.classList.add("disabled");
  }
};

const massDelete = (event) => {
  event.preventDefault();
  document
    .querySelectorAll('input[data-checked="data-checked"]')
    .forEach(delFile);
};

const populateFilesTable = () => {
  const myFilesDOM = document.getElementById("myfiles");

  myFilesDOM.innerHTML = "";

  let files = localStorage.getItem(`${window.prefix}files`);
  if (files === null) {
    var filesWithoutPrefix = localStorage.getItem("files");
    if (filesWithoutPrefix !== null) {
      if (window.confirm(i18n.importFilesWithoutPrefix)) {
        localStorage.setItem(`${window.prefix}files`, filesWithoutPrefix);
        files = JSON.parse(filesWithoutPrefix);
      } else {
        localStorage.setItem(`${window.prefix}files`, JSON.stringify([]));
        files = [];
      }
    } else {
      files = [];
    }
  } else {
    files = JSON.parse(files);
  }

  files.sort(function (a, b) {
    if (a.created_at < b.created_at) {
      return -1;
    } else if (a.created_at > b.created_at) {
      return 1;
    } else {
      return 0;
    }
  });

  files.forEach(function (element) {
    const del_view = element.del_at_first_view
      ? '<i class="small mdi-action-done"></i>'
      : '<i class="small mdi-navigation-close"></i>';
    const dlink = `${actionURL}d/${element.short}/${element.token}`;
    const limit =
      element.delay === 0
        ? i18n.noExpiration
        : formatDate(element.delay * 86400 + element.created_at);
    const created_at = formatDate(element.created_at);

    const tr = document.createElement("tr");
    tr.id = `row-${element.short}`;

    tr.innerHTML = `<td class="center-align">
                      <input type="checkbox"
                             id="check-${element.short}"
                             data-short="${element.short}"
                             data-dlink="${dlink}"
                             data-checked="">
                      <label for="check-${element.short}"></label>
                  </td>
                  <td class="left-align">
                      ${escapeHtml(element.name)}
                  </td>
                  <td class="center-align">
                      <a href="${element.url}"
                         class="classic">
                         <i class="small mdi-file-file-download"></i>
                      </a>
                  </td>
                  <td id="count-${element.short}" class="center-align">
                  </td>
                  <td class="center-align">
                      ${del_view}
                  </td>
                  <td>
                      ${created_at}
                  </td>
                  <td>
                      ${limit}
                  </td>
                  <td class="center-align">
                      <a id="del-${element.short}"
                         data-short="${element.short}"
                         data-dlink="${dlink}"
                         href="#"
                         class="classic">
                         <i class="small mdi-action-delete"></i>
                      </a>
                  </td>
                  <td class="center-align">
                      <a href="${actionURL}m?links=[&quot;${
      element.short
    }&quot;]"
                      class="classic"><i class="small mdi-communication-email"></i></a>
                  </td>`;

    myFilesDOM.append(tr);

    document.getElementById(`del-${element.short}`).onclick = (event) =>
      delFile(event.target.parentElement);

    document.querySelector(`label[for="check-${element.short}"]`).onclick = (
      event
    ) => {
      const checkDOM = document.getElementById(`check-${element.short}`);

      if (checkDOM.getAttribute("data-checked") === "data-checked") {
        checkDOM.setAttribute("data-checked", null);
      } else {
        checkDOM.setAttribute("data-checked", "data-checked");
      }

      evaluateMassDelete();
    };

    fetch(counterURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: new URLSearchParams({
        short: element.short,
        token: element.token,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request error.");
        }

        return response.json();
      })
      .then((data) => {
        if (data.success) {
          const countDOM = document.getElementById(`count-${data.short}`);
          countDOM.innerHTML = data.counter;

          if (data.deleted) {
            if (data.deleted) {
              countDOM.parentElement.classList.add("purple", "lighten-4");
            } else {
              alert(data.msg);
              countDOM.parentElement.remove();

              if (data.missing) {
                delItem(data.short);
              }
            }
          }
        }
      });
  });
};

const clickImport = (event) => {
  event.preventDefault();
  document.getElementById("import").click();
};
