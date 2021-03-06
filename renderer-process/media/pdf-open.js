const {ipcRenderer} = require('electron')
const pdfjsLibOpen = require('pdfjs-dist')

pdfjsLibOpen.GlobalWorkerOptions.workerSrc = './node_modules/pdfjs-dist/build/pdf.worker.js';

const openPDFBtn = document.getElementById('first-page-demo-button')

openPDFBtn.addEventListener('click', (event) => {
  // Will be using promises to load document, pages and misc data instead of
  // callback.
  let pdfPath = 'assets/pdf/das-kleine-schwarze-naehen-data.pdf'

  pdfjsLibOpen.getDocument(pdfPath).then( (pdf) => {
    let numPages = pdf.numPages;
    console.log('# Document Loaded');
    console.log('Number of Pages: ' + numPages);
    console.log();

    pdf.getPage(1).then( (page) => {
      var scale = .3;
      var viewport = page.getViewport(scale);
      //
      // Prepare canvas using PDF page dimensions
      //
      var canvas = document.getElementById('first-page-pdf-canvas');
      var context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      //
      // Render PDF page into canvas context
      //
      var renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      page.render(renderContext);
    });
  })
});
