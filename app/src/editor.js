require('./ifreme-load')
module.exports = class Editor {
  constructor() {
    this.iframe = document.querySelector('iframe')
  }
  open(page) {
    this.iframe.load("../" + page, () => {
      const body = this.iframe.contentDocument.body
      function recurcyNode (element) {
        element.childNodes.forEach(node => {
          if (node.nodeName === "#text" && node.nodeValue.replace(/\s+/g, '').length > 0) {
            node.parentElement.setAttribute("contenteditable", "true")
          } else {
            recurcyNode(node)
          }
        })
      }
      recurcyNode(body)
    })
  }
}