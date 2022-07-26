$(function () {
    $('form').submit(e => {
        e.preventDefault();

        const q = $('#search').val();
        $('tbody').load('/Ratings/Search?query='+q);
    })
})