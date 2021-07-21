const axios = require('axios')
const DOMHelper = require('./dom-helper')
require('./ifreme-load')
module.exports = class Editor {
  constructor() {
    this.iframe = document.querySelector('iframe')
  }
  open(page) {
    this.currentPage = page
    axios
      .get('../' + page)
      .then(r => DOMHelper.parserToDom(r.data))
      .then(DOMHelper.wrapTextNodes)
      .then(dom => {
        this.virtualDom = dom
        return dom
      })
      .then(DOMHelper.serializeDomToStr)
      .then((html) => axios.post('./api/saveTempPage.php', { html }))
      .then(() => this.iframe.load('../temp.html'))
      .then(() => this.enableEditing())
  }
  enableEditing() {
    this.iframe.contentDocument.body.querySelectorAll("text-editor").forEach(e => {
      e.contentEditable = true
      e.addEventListener('input', () => {
        this.onTextEdit(e)
      })
    })
  }
  onTextEdit(element) {
    const id = element.getAttribute('nodeid')
    this.virtualDom.body.querySelector(`[nodeid="${id}"]`).innerHTML = element.innerHTML
  }
  save() {
    const newDom = this.virtualDom.cloneNode(this.virtualDom)
    DOMHelper.unwrapTextNodes(newDom)
    const html = DOMHelper.serializeDomToStr(newDom)
    axios.post("./api/savePage.php", {pageName: this.currentPage, html})
  }
}