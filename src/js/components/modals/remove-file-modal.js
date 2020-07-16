fmWrapper.querySelector('*[data-action="remove"]')
    .addEventListener('click', function () {
        var
            tableSelectedItems = fmWrapper.querySelectorAll('.files-table .file-item.selected'),
            filename = fmWrapper.querySelector('#removeFileModal .filename');

        if (tableSelectedItems.length === 1) {
            filename.textContent = tableSelectedItems[0].querySelector('.file-name').textContent;
        } else {
            filename.textContent = '(' + (tableSelectedItems.length) + ') files';
        }
    });