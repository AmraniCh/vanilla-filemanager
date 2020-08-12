import {on} from "../helpers";

// Static DOM elements
var
    // Table
    table = fmWrapper.querySelector('.files-table'),
    tableSelectAllCheckbox = table.querySelector('.files-select-all'),
    // Toolbar buttons
    toolbarSelectAllBtn = fmWrapper.querySelector('.toolbar .files-select'),
    toolbarUnSelectAllBtn = fmWrapper.querySelector('.toolbar .files-unselect'),
    // Footer right buttons
    footerRightButtons = fmWrapper.querySelectorAll('.right-buttons *[data-action]');

// Dynamic DOM elements
function getTableItems() {
    return table.querySelectorAll('.file-item:not(.hide-in-search)');
}

function getTableSelectedItems()
{
    return table.querySelectorAll('.file-item.selected');
}

function getTableAllCheckboxes()
{
    return table.querySelectorAll('.file-item .checkbox input[type="checkbox"]');
}

// Table click item
on('click', '.files-table .file-item', function (e) {
    if (!e.target.closest('.checkbox')) { // Ignore event bubbling for the checkbox
        if (!e.shiftKey && !e.ctrlKey) { // Multiple selection with shift & ctrl keys
            var fileItems = getTableSelectedItems();
            var allCheckboxes = getTableAllCheckboxes();

            fileItems.forEach(function (item) {
                item.classList.remove('selected');
            });
            allCheckboxes.forEach(function (item) {
                item.checked = false;
            });
        }

        tableSelectAllCheckbox.checked = false;

        var item = e.target.closest('.file-item');

        item.classList.add('selected');

        item.querySelector('.checkbox input[type="checkbox"]').checked = true;

        enableFooterRightButtons(true, item.closest('.file-item').getAttribute('data-type'));

        selectAllCheckboxUpdate();
    }
});

// Each checkbox change event
on('change', '.file-item .checkbox input[type="checkbox"]', function (e) {

    e.target.closest('.file-item').classList.toggle('selected');

    var tableSelectedItems = getTableSelectedItems();

    // Enable footer right actions
    if (tableSelectedItems.length > 1) {
        enableFooterRightButtons(true, 'collection');
    } else if (tableSelectedItems.length === 1) {
        enableFooterRightButtons(true, tableSelectedItems[0].getAttribute('data-type'));
    } else {
        enableFooterRightButtons(false);
    }

    selectAllCheckboxUpdate();
});

// Table Select All
tableSelectAllCheckbox.addEventListener("change", function () {
    if (this.checked) {
        doSelect(true);
        enableFooterRightButtons(true, 'collection');
    } else {
        doSelect(false);
        enableFooterRightButtons(false);
    }
});

// Toolbar button select all
toolbarSelectAllBtn.addEventListener('click', function () {
    doSelect(true);
    enableFooterRightButtons(true, 'collection');
});

// Toolbar button unselect all
toolbarUnSelectAllBtn.addEventListener('click', function () {
    doSelect(false);
    enableFooterRightButtons(false);
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
        doSelect(false);
        enableFooterRightButtons(false);
    }
});

// ArrowUp and ArrowDown event
window.addEventListener('keyup', function (e) {
    var isArrowUp = (e.key === 'Up' || e.key === 'ArrowUp'),
        isArrowDown = (e.key === 'Down' || e.key === 'ArrowDown'),
        fileItems = getTableItems();

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
    var allCheckboxes = getTableAllCheckboxes();

    tableSelectAllCheckbox.checked = isSelectAll;

    [].forEach.call(allCheckboxes, function (checkbox) {
        checkbox.checked = isSelectAll;

        checkbox
            .closest('.file-item')
            .classList[isSelectAll ? 'add' : 'remove']('selected');
    });
}

function enableFooterRightButtons(enable, filter) {
    var exceptions = {
        // show all action for files
        file: [],
        // Cannot edit or download dirs
        dir: ['edit', 'download'],
        // Collections
        collection: ['edit', 'rename', 'move', 'permissions', 'info'],
    };

    // if is files only collection enable the download option
    getTableSelectedItems().forEach(function (item) {
        if (item.getAttribute('data-type') === 'dir') {
           exceptions.collection.push('download');
        }
    });

    footerRightButtons.forEach(function (button) {
        if (filter && exceptions[filter].indexOf(button.getAttribute('data-action')) !== -1) {
            button.disabled = true;
        } else {
            button.disabled = !enable;
        }
    });

   var index = exceptions.collection.indexOf('download');
   exceptions.collection.splice(index, 1);
}

function getSelectedIndex() {
    var
        items = getTableItems(),
        selected = fmWrapper.querySelector('.files-table .file-item.selected');

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

    enableFooterRightButtons(true, item.getAttribute('data-type'));

    item.classList.add('selected');
    checkbox.checked = true;
}

function selectAllCheckboxUpdate() {
    var
        tableSelectedItems = getTableSelectedItems(),
        fileItems = getTableItems();

    // Check or uncheck the table select all checkbox
    tableSelectAllCheckbox.checked = (fileItems.length === tableSelectedItems.length);
}