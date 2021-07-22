const UIkit = require('uikit')
const Vue = require('vue')
const Editor = require('./editor')

window.editor = new Editor()


new Vue({
    el: "#app",
    data: {
      showLoader: true
    },
    methods: {
        onBtnSave () {
            this.showLoader = true
            window.editor.save(
              () => {
                    this.showLoader = false
                    UIkit.notification({message: 'Страница опубликована!', status: 'success'})
                },
              () => {
                    this.showLoader = false
                    UIkit.notification({message: 'Ошибка сохраниения', status: 'danger'})
                }
              )
        }
    },
    created() {
        window.editor.open('index.html', () => {
            this.showLoader = false
        })
    }
})