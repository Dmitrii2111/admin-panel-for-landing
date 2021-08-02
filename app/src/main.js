const UIkit = require('uikit')
const Vue = require('vue')
const Editor = require('./editor')
window.editor = new Editor()
const axios = require('axios')


new Vue({
    el: "#app",
    data: {
      page: '',
      showLoader: true,
      pageList: [],
      backupList: [],
      meta: {
        title: '',
        keywords: '',
        description: ''
      }
    },
    methods: {
        onBtnSave () {
            this.showLoader = true
            window.editor.save(
              () => {
                    this.loadBackupList()
                    this.showLoader = false
                    UIkit.notification({message: 'Страница опубликована!', status: 'success'})
                },
              () => {
                    this.loadBackupList()
                    this.showLoader = false
                    UIkit.notification({message: 'Ошибка сохраниения', status: 'danger'})
                }
              )
        },
      openPage(page) {
          this.page = page
          this.showLoader = true
        window.editor.open(page, () => {
          this.showLoader = false
          this.meta = window.editor.metaEditor.getMeta()
        })
      },
      loadBackupList() {
        axios
          .get('../admin/backups/backups.json')
          .then(res => {
            this.backupList = res.data.filter(backup => {
              return (backup)
            })
          })
          .catch(err => {
            return
          })
      },
      restoreBackup(backup) {
        UIkit.modal
          .confirm('Вы действительно хотите восстановить версию и удалить все не сохраненные изменения?', {labels: {ok: 'Восстановить', cancel: 'Отмена'}})
          .then(() => {
             axios.post('./api/restoreBackup.php', {'page': this.page, 'file':backup.file})
        }, function () {
          console.log('Rejected.')
        })
      },
      applyMeta() {
        window.editor.metaEditor.setMeta(this.meta.title, this.meta.keywords, this.meta.description)
      }
    },
    created() {
      this.openPage(this.page)
      this.loadBackupList()
        axios
          .get('./api/pageList.php')
          .then(res => {
              res.data.forEach(e => {
                  if(e != 'temp.html') {
                    let linkName
                    if(e === 'index.html') {linkName = 'Главная'}
                    if(e === 'politics.html') {linkName = 'Политика конфидициальности'}
                    this.pageList.push({link: e, name:linkName})
                  }
              })
          })
    }
})