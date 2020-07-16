fmWrapper.querySelector('*[data-action="permissions"]')
    .addEventListener('click', function () {
        var
            tableSelectedItem = fmWrapper.querySelector('.files-table .file-item.selected'),
            filename = fmWrapper.querySelector('#permissionsModal .filename');

        filename.textContent = tableSelectedItem.querySelector('.file-name').textContent;
    });