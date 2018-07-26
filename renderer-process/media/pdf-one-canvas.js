const {ipcRenderer} = require('electron')
const pdfjsLibpdfOneCanvas = require('pdfjs-dist')

pdfjsLibpdfOneCanvas.GlobalWorkerOptions.workerSrc = './node_modules/pdfjs-dist/build/pdf.worker.js';

const OneCanvasPDFBtn = document.getElementById('one-canvas-demo-button')

OneCanvasPDFBtn.addEventListener('click', (event) => {
  // Will be using promises to load document, pages and misc data instead of
  // callback.
  let pdfPath = 'assets/pdf/das-kleine-schwarze-naehen-data.pdf'
  const canvas = document.getElementById('pdf-one-canvas')
  const canvas2D = canvas.getContext("2d")

  pdfjsLibpdfOneCanvas.getDocument(pdfPath).then( (pdf) => {
    logPDFInfo(pdf);
    renderPage(pdf, 1, canvas2D, .3);
    renderPage(pdf, 2, canvas2D, .3);
  })
});


function logPDFInfo(pdf){
  let numPages = pdf.numPages;
  console.log('# Document Loaded');
  console.log('Number of Pages: ' + numPages);
}

function renderPage(pdf, pageNumber, canvas2D, scale) {
  pdf.getPage(pageNumber).then(page => {
    viewport = page.getViewport(scale);
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    page.render({ canvasContext: canvas2D, viewport: viewport });
  });
}