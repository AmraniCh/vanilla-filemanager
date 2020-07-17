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

            showFooterRightButtons(
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

        // All files was selected || no file selected
        if (fileItems.length === selectedItems.length || !selectedItems.length) {
            tableSelectAllCheckbox.checked = this.checked;
        }

        // Uncheck the select all checkbox when selecting one item && there is more than one file in the table
        if (selectedItems.length === 1 && fileItems.length > 1) {
            tableSelectAllCheckbox.checked = false;
        }

        if (selectedItems.length > 1) {
            showFooterRightButtons(true, 'all');

        } else if (selectedItems.length === 1) {
            showFooterRightButtons(true, selectedItems[0].getAttribute('data-type'));

        } else {
            showFooterRightButtons(false);
        }
    });
});

// Table Select All
tableSelectAllCheckbox.addEventListener("change", function () {
    if (this.checked) {
        doSelect(true);
        showFooterRightButtons(true, 'all');
    } else {
        doSelect(false);
        showFooterRightButtons(false);
    }
});

// Toolbar button select all
toolbarSelectAllBtn.addEventListener('click', function () {
    doSelect(true);
    showFooterRightButtons(true, 'all');
});

// Toolbar button unselect all
toolbarUnSelectAllBtn.addEventListener('click', function () {
    doSelect(false);
    showFooterRightButtons(false);
});

// Unselect Table Files when clicking on some where
fmWrapper.addEventListener('click', function (e) {
    if (!e.target.closest('.files-table')
        && !e.target.closest('.files-select')
        && !e.target.closest('.files-unselect')
        && !e.target.closest('.footer')
        && !e.target.closest('.modal')
        || e.target.closest('*[data-close="modal"]')
    ) {
        tableSelectAllCheckbox.checked = false;
        doSelect(false);
        showFooterRightButtons(false);
    }
});

// ArrowUp and ArrowDown event
window.addEventListener('keyup', function (e) {
    var isArrowUp = (e.key === 'Up' || e.key === 'ArrowUp');
    var isArrowDown = (e.key === 'Down' || e.key === 'ArrowDown');

    if ((isArrowUp || isArrowDown) && !fmWrapper.querySelector('.modal.show')) {
        var index = getSelectedIndex();

        if (index >= 1 && index !== fileItems.length && isArrowDown) {
            index++;
        } else if (index > 1 && isArrowUp) {
            index--;
        } else if (index === 1 && isArrowUp) {
            index = fileItems.length;
        } else {
            index = 1;
        }

        doSelect(false);
        selectByIndex(index);
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

function showFooterRightButtons(show, filter) {

    var exceptions = {
        // show all action for files
        'file': [],
        // Cannot edit or download files
        'dir': ['edit', 'download'],
        // Hide all actions except 'remove' when select more than one file
        'all': ['edit', 'rename', 'move', 'download', 'permissions', 'info'],
    };

    footerRightButtons.forEach(function (button) {
        if (filter && exceptions[filter].indexOf(
            button.getAttribute('data-action')
        ) !== -1) {
            button.disabled = true;
        } else {
            button.disabled = !show;
        }
    });
}

function getSelectedIndex() {
    var items = fmWrapper.querySelectorAll('.files-table .file-item');
    var selected = fmWrapper.querySelector('.files-table .file-item.selected');

    for (var i = 0; i < items.length; i++) {
        if (items[i] === selected) {
            return i + 1;
        }
    }

    return -1;
}

function selectByIndex(index) {
    var
        item = fmWrapper.querySelector('.files-table .file-item:nth-child(' + index + ')'),
        checkbox = item.querySelector('.checkbox input[type="checkbox"]');

    showFooterRightButtons(true, item.getAttribute('data-type'));

    item.classList.add('selected');
    checkbox.checked = true;
}

