
// const Vue = require("vue")
// const axios = require("axios")
//
// new Vue({
//     el: '#app',
//     data: {
//         'pageList': [],
//         'newPageName': ''
//     },
//     created() {
//         this.updatePageList()
//     },
//     methods: {
//         createNewPage() {
//                 axios({
//                     method: "POST",
//                     url: './api/createHtmlPage.php',
//                     data: {
//                         "addName": this.newPageName
//                     },
//                     // headers: {'Content-Type': 'application/x-www-form-urlencoded'}
//                 })
//                 .then(() => this.updatePageList())
//             this.newPageName = ''
//         },
//         updatePageList() {
//             axios
//                 .get('./api/')
//                 .then(res => {
//                     this.pageList = res.data
//                 })
//         },
//         deletePage(page) {
//             axios
//                 .post('./api/deletePage.php', {"delName": page})
//                 .then(() => this.updatePageList())
//         }
//     }
// })


const Editor = require('./editor')

window.editor = new Editor()
window.onload = () => {
    window.editor.open('index.html')
}