var filesItems = fmWrapper.querySelectorAll('#moveFileModal .files-list .item');

filesItems.forEach(function (item) {
    item.addEventListener('click', function (e) {
        if (this === e.target.closest('.dir-item')) {
            filesItems.forEach(function (item) {
                item.classList.remove('selected');
            });
            this.classList.add('selected');
        }
    });
});

fmWrapper.querySelector('*[data-action="move"]')
    .addEventListener('click', function () {
        var
            tableSelectedItem = fmWrapper.querySelector('.files-table .file-item.selected'),
            sourceFile = fmWrapper.querySelector('#moveFileModal .moving-to .source');

        console.log(tableSelectedItem)
        console.log(sourceFile)

        sourceFile.textContent = tableSelectedItem.querySelector('.file-name').textContent;
    });