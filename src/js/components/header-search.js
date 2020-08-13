var searchInput = fmWrapper.querySelector('.header .search-form .search-input');

function getFileItems() {
    return  fmWrapper.querySelectorAll('.files-table .file-item');
}

searchInput.addEventListener('input', function () {
    var search = this.value.toLowerCase();
    getFileItems().forEach(function (ele) {
        var name = ele.querySelector('.file-name').textContent.toLowerCase();
        if (name.indexOf(search) !== -1) {
            ele.classList.remove('hide-in-search');
        } else {
            ele.classList.add('hide-in-search');
        }
    });
});
