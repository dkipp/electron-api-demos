const {ipcRenderer} = require('electron')
const pdfjsLibSetup = require('pdfjs-dist')

pdfjsLibSetup.GlobalWorkerOptions.workerSrc = './node_modules/pdfjs-dist/build/pdf.worker.js';

let pdfPath = 'assets/pdf/das-kleine-schwarze-naehen-data.pdf'

document.getElementById('basic-setup-demo-button').addEventListener('click', (event) => {
  
  // Will be using promises to load document, pages and misc data.
  pdfjsLibSetup.getDocument(pdfPath).then( (pdf) => {
    let numPages = pdf.numPages;
    console.log('# Document Loaded');
    console.log('Number of Pages: ' + numPages);
  })
});
