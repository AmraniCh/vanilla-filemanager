fmWrapper.querySelector('*[data-action="rename"]')
    .addEventListener('click', function () {
        var
            tableSelectedItem = fmWrapper.querySelector('.files-table .file-item.selected'),
            nameFor = fmWrapper.querySelector('#renameFileModal .name-for');

        nameFor.textContent = tableSelectedItem.querySelector('.file-name').textContent;
    });