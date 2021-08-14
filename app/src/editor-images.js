const axios = require('axios')

module.exports = class EditorImages {
  constructor(element, virtualElement) {
    this.element = element
    this.virtualElement = virtualElement

    this.element.addEventListener('click', () => this.onClick())
    this.imgUpLoader = document.querySelector('#image-upload')
  }
  onClick() {
    this.imgUpLoader.click()
    this.imgUpLoader.onchange = () => {
      if(this.imgUpLoader.files && this.imgUpLoader.files[0]){
        let formData = new FormData()
        formData.append('image', this.imgUpLoader.files[0])
        axios
          .post('./api/uploadImage.php', formData, {
            headers: {
              "Content-type" : "multipart/form-data"
            }
          })
          .then((res)=>{
            this.virtualElement.src = this.element.src = "./img/" + res.data.src
            this.imgUpLoader.value = ''
          })
      }
    }
  }
}