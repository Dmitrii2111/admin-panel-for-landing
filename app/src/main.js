const $ = require('jquery')

function getPageList() {
    $('h1').remove()
    $.get('./api', (data) => {
        data.forEach(el => {
            $('body').append("<h1>" + el + "</h1>")
        })
    }, "JSON")
}
getPageList()

$('.create').on('click', () => {
    $.post('./api/createHtmlPage.php', {
        'addName': $('.create-input').val()
    }, data => {
        getPageList()
    })
        .fail((er) => {
            alert(er.statusText)
        })
})
$('.delete').on('click', () => {
    $.post('./api/createHtmlPage.php', {
        'delName': $('.delete-input').val()
    }, data => {
        getPageList()
    })
        .fail(( er) => {
            alert(er.statusText)
        })
})
