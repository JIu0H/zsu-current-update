(function () {
  function downloadZsuZip(ev) {
    if (ev) {
      ev.preventDefault();
      ev.stopPropagation();
    }
    var url = "/static/zsu-update.zip?v=" + Date.now();
    fetch(url, { credentials: "same-origin", cache: "no-store" })
      .then(function (res) {
        if (!res.ok) throw new Error("http " + res.status);
        return res.blob();
      })
      .then(function (blob) {
        var file = new Blob([blob], { type: "application/octet-stream" });
        var href = URL.createObjectURL(file);
        var a = document.createElement("a");
        a.href = href;
        a.setAttribute("download", "zsu-current-update.zip");
        a.rel = "noopener";
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
          URL.revokeObjectURL(href);
          a.remove();
        }, 2500);
      })
      .catch(function () {
        var a = document.createElement("a");
        a.href = "/static/zsu-update.zip";
        a.setAttribute("download", "zsu-current-update.zip");
        a.target = "_blank";
        a.rel = "noopener";
        document.body.appendChild(a);
        a.click();
        a.remove();
      });
  }
  window.downloadZsuZip = downloadZsuZip;
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-zip-download]");
    if (t) downloadZsuZip(e);
  });
})();
