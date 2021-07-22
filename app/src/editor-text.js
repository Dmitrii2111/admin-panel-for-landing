module.exports = class EditorText{
  constructor(element, virtualElement) {
    this.element = element
    this.virtualElement = virtualElement

    this.element.addEventListener('click', () => this.onClick())
    if(this.element.parentNode.nodeName === 'A' || this.element.parentNode.nodeName === 'BUTTON') {
      this.element.addEventListener('contextmenu', (e) => this.onCtxClick(e))
    }
    this.element.addEventListener('blur', () => this.onBlur())
    this.element.addEventListener('keypress', (e) => this.onKeyPress(e))
    this.element.addEventListener('input', () => this.onTextEdit())
  }
  onTextEdit() {
    this.virtualElement.innerHTML = this.element.innerHTML
  }
  onClick(){
    this.element.contentEditable = true
    this.element.focus()
  }
  onCtxClick(e) {
    e.preventDefault()
    this.onClick()
  }
  onBlur() {
    this.element.removeAttribute('contentEditable')
  }
  onKeyPress(e) {
    if(e.keyCode === 13) {
      this.element.blur()
    }
  }
}