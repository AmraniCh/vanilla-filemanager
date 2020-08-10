var
    chmod = [0, 0, 0],
    rules = {
        read: 4,
        write: 2,
        execute: 1
    };

fmWrapper.querySelectorAll('.perm-table .checkbox').forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
        chmod = [0, 0, 0];

        if (!checkbox.querySelector('input').checked) {
            checkbox.querySelector('input').removeAttribute('checked');
        }

        fmWrapper.querySelectorAll('.perm-table .checkbox input[type="checkbox"]').forEach(function (input) {
            var group = input.closest('.checkbox').getAttribute('data-group'),
                action = input.closest('.checkbox').getAttribute('data-action');

            switch (group) {
                case 'owner':
                    if (input.checked) {
                        chmod[0] += rules[action];
                    }
                    break;
                case 'group':
                    if (input.checked) {
                        chmod[1] += rules[action];
                    }
                    break;
                case 'others':
                    if (input.checked) {
                        chmod[2] += rules[action];
                    }
                    break;
            }
        });

        fmWrapper.querySelector('.permissions-modal .numeric-chmod').textContent = '0' + chmod.join('');
    });
});

fmWrapper.querySelector('*[data-action="permissions"]').addEventListener('click', function () {
    var
        tableSelectedItem = fmWrapper.querySelector('.files-table .file-item.selected'),
        filename = fmWrapper.querySelector('#permissionsModal .filename');

    filename.textContent = tableSelectedItem.querySelector('.file-name').textContent;
});