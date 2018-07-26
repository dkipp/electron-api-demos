const {ipcRenderer} = require('electron')
const pdfjsLibpdfRotate = require('pdfjs-dist')
//const PageViewport = require('pdfjs-dist')

pdfjsLibpdfRotate.GlobalWorkerOptions.workerSrc = './node_modules/pdfjs-dist/build/pdf.worker.js';

const rotatePDFBtn = document.getElementById('rotate-demo-button')

rotatePDFBtn.addEventListener('click', (event) => {
  // Will be using promises to load document, pages and misc data instead of
  // callback.
  let pdfPath = 'assets/pdf/das-kleine-schwarze-naehen-data.pdf'
  const canvas = document.getElementById('rotate-canvas')
  const canvas2D = canvas.getContext("2d")

  pdfjsLibpdfRotate.getDocument(pdfPath).then( (pdf) => {
    renderPage(pdf, 1, canvas);
  })
});

function renderPage(pdf, pageNumber, canvas) {
  pdf.getPage(pageNumber).then(page => {
    page.render({
      canvasContext: canvas.getContext("2d"),
      viewport: calcViewport(page, canvas)
    });
  });
}

function calcViewport(page, canvas) {
  page.pageInfo.view[0] += 58;
  page.pageInfo.view[1] += 58;
  page.pageInfo.view[2] -= 58;
  page.pageInfo.view[3] -= 58;
  let viewport = page.getViewport(.25); // just works in 90° steps
  //let viewport = new PageViewport(page.pageInfo.view, 0.3, 0, -25, -25);
  //viewport.viewBox[0] -= 25;
  //viewport.viewBox[1] -= 25;
  
  console.log(pdfjsLibpdfRotate);

  canvas.height = viewport.height;
  canvas.width = viewport.width;
  return viewport;
}