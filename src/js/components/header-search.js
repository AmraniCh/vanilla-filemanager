var
    items = fmWrapper.querySelectorAll('.files-table .file-item'),
    searchInput = fmWrapper.querySelector('.header .search-form .search-input');

searchInput.addEventListener('input', function () {
    var search = this.value.toLowerCase();
    items.forEach(function (ele) {
        var name = ele.querySelector('.file-name').textContent.toLowerCase();
        if (name.indexOf(search) !== -1) {
            ele.classList.remove('hide-in-search');
        } else {
            ele.classList.add('hide-in-search');
        }
    });
});
