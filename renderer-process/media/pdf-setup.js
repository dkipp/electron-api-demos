const {ipcRenderer} = require('electron')
const pdfjsLib = require('pdfjs-dist')

pdfjsLib.GlobalWorkerOptions.workerSrc = './node_modules/pdfjs-dist/build/pdf.worker.js';

let pdfPath = 'assets/pdf/das-kleine-schwarze-naehen-data.pdf'

document.getElementById('basic-setup-demo-button').addEventListener('click', (event) => {
  
  // Will be using promises to load document, pages and misc data.
  pdfjsLib.getDocument(pdfPath).then( (pdf) => {
    let numPages = pdf.numPages;
    console.log('# Document Loaded');
    console.log('Number of Pages: ' + numPages);
  })
});
