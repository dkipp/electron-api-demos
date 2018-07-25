const { ipcRenderer } = require("electron");
const pdfjsLibPages = require("pdfjs-dist");

pdfjsLibPages.GlobalWorkerOptions.workerSrc =
  "./node_modules/pdfjs-dist/build/pdf.worker.js";

const allPDFBtn = document.getElementById("all-page-demo-button");
const canvasContainer = document.getElementById("all-page-pdf-canvases");
let pdfdoc = null;
let pdfPath = "assets/pdf/das-kleine-schwarze-naehen-data.pdf";

allPDFBtn.addEventListener("click", event => {
  pdfjsLibPages.getDocument(pdfPath).then(pdf => {
    pdfdoc = pdf;

    for (page = 1; page <= pdfdoc.numPages; page++) {
      canvas = document.createElement("canvas");
      canvas.className = "pdf-page-canvas";
      canvasContainer.appendChild(canvas);
      renderPage(page, canvas);
    }
  });
});

function renderPage(pageNumber, canvas) {
  pdfdoc.getPage(pageNumber).then(page => {
    let scale = 0.25;
    viewport = page.getViewport(scale);
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    page.render({ canvasContext: canvas.getContext("2d"), viewport: viewport });
  });
}
