module.exports = class DOMHelper {
  static parserToDom(str) {
    const parser = new DOMParser();
    return  parser.parseFromString(str, "text/html")
  }
  static wrapTextNodes(dom) {
    const body = dom.body
    let textNodes = []
    function recurcyNode (element) {
      element.childNodes.forEach(node => {
        if (node.nodeName === "#text" && node.nodeValue.replace(/\s+/g, '').length > 0) {
          textNodes.push(node)
        } else {
          recurcyNode(node)
        }
      })
    }
    recurcyNode(body)
    textNodes.forEach((elem, i) => {
      const wrapper = dom.createElement('text-editor')
      elem.parentNode.replaceChild(wrapper, elem)
      wrapper.append(elem)
      wrapper.contentEditable = true
      wrapper.setAttribute('nodeid', i)
    })
    return dom
  }
  static unwrapTextNodes(dom) {
    dom.body.querySelectorAll('text-editor').forEach(e => {
      e.parentNode.replaceChild(e.firstChild, e)
    })
  }
  static serializeDomToStr(dom) {
    const serializer = new XMLSerializer()
    return serializer.serializeToString(dom)
  }
}