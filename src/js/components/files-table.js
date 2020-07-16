// DOM elements
var
    // Table
    table = fmWrapper.querySelector('.files-table'),
    fileItems = table.querySelectorAll('.file-item'),
    allCheckboxes = table.querySelectorAll('.file-item .checkbox input[type="checkbox"]'),
    tableSelectAllCheckbox = table.querySelector('.files-select-all'),
    tableSelectedItems = table.querySelectorAll('.file-item.selected'),
    // Toolbar buttons
    toolbarSelectAllBtn = fmWrapper.querySelector('.toolbar .files-select'),
    toolbarUnSelectAllBtn = fmWrapper.querySelector('.toolbar .files-unselect'),
    // Footer right buttons
    footerRightButtons = fmWrapper.querySelectorAll('.right-buttons *[data-action]');

// Table click item
fileItems.forEach(function (item) {

    item.addEventListener('click', function (e) {

        if (!e.target.closest('.checkbox')) { // Ignore event bubbling for the checkbox

            if (!e.shiftKey && !e.ctrlKey) { // Multiple selection with shift & ctrl keys
                fileItems.forEach(function (item) {
                    item.classList.remove('selected');
                });
                allCheckboxes.forEach(function (item) {
                    item.checked = false;
                });
            }

            tableSelectAllCheckbox.checked = false;

            this.classList.add('selected');

            this.querySelector('.checkbox input[type="checkbox"]').checked = true;

            showRightButtons(
                true,
                this.closest('.file-item').getAttribute('data-type')
            );
        }
    });
});

// Each checkbox change event
allCheckboxes.forEach(function (item) {

    item.addEventListener('change', function () {

        this.closest('.file-item').classList.toggle('selected');

        var selectedItems = document.querySelectorAll('.file-item.selected');

        if (selectedItems.length > 1) {
            showRightButtons(true, 'all');

        } else if (selectedItems.length === 1) {
            showRightButtons(true, selectedItems[0].getAttribute('data-type'));

        } else {
            showRightButtons(false);
        }
    });
});

// Table Select All
tableSelectAllCheckbox.addEventListener("change", function () {
    if (this.checked) {
        doSelect(true);
        showRightButtons(true, 'all');
    } else {
        doSelect(false);
        showRightButtons(false);
    }
});

// Toolbar button select all
toolbarSelectAllBtn.addEventListener('click', function () {
    doSelect(true);
    showRightButtons(true, 'all');
});

// Toolbar button unselect all
toolbarUnSelectAllBtn.addEventListener('click', function () {
    doSelect(false);
    showRightButtons(false);
});

// Unselect Table Files when clicking out of the table
fmWrapper.addEventListener('click', function (e) {
    if (!e.target.closest('.files-table')
        && !e.target.closest('.files-select')
        && !e.target.closest('.files-unselect')
        && !e.target.closest('.footer')
        && !e.target.closest('.modal')
    ) {
        tableSelectAllCheckbox.checked = false;
        doSelect(false);
        showRightButtons(false);
    }
});

function doSelect(isSelectAll) {

    tableSelectAllCheckbox.checked = isSelectAll;

    [].forEach.call(allCheckboxes, function (checkbox) {
        checkbox.checked = isSelectAll;

        checkbox
            .closest('.file-item')
            .classList[isSelectAll ? 'add' : 'remove']('selected');
    });
}

function showRightButtons(show, type) {

    var exceptions = {
        'file': [],
        'dir': ['edit', 'download'],
        'all': ['edit', 'rename', 'move', 'download', 'permissions', 'info'],
    };

    footerRightButtons.forEach(function (button) {
        if (type && exceptions[type].indexOf(
            button.getAttribute('data-action')
        ) !== -1) {
            button.disabled = true;
        } else {
            button.disabled = !show;
        }
    });
}