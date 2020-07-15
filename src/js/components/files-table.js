// DOM elements
var
    table = fmWrapper.querySelector('.files-table'),
    fileItems = table.querySelectorAll('.file-item'),
    allCheckboxes = table.querySelectorAll('.file-item .checkbox input[type="checkbox"]');

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
            this.classList.add('selected');
            this.querySelector('.checkbox input[type="checkbox"]').checked = true;
            disableFooterRightButtons(false);
        }
        
    });
});

// Each checkbox change event
allCheckboxes.forEach(function (item) {
    item.addEventListener('change', function (  ) {
        console.log(this.closest('.file-item'));
        this.closest('.file-item').classList.toggle('selected'); 
        disableFooterRightButtons(table.querySelectorAll('.file-item.selected').length === 0);
    });
});

// Table Select All
fmWrapper.querySelector('.files-select-all').addEventListener("change", function () {
    this.checked ? doSelect(true) : doSelect(false);
});

// Toolbar button select all
fmWrapper.querySelector('.files-select').addEventListener('click', function () {
    doSelect(true);
});

// Toolbar button unselect all
fmWrapper.querySelector('.files-unselect').addEventListener('click', function () {
    doSelect(false);
});

// Unselect Table Files when clicking out of the table
fmWrapper.addEventListener('click', function(e) {
    if (!e.target.closest('.files-table')
        && !e.target.closest('.files-select')
        && !e.target.closest('.files-unselect')
        && !e.target.closest('.footer')
        && !e.target.closest('.modal')) {
        console.log('dddddd');
        fmWrapper.querySelector('.files-select-all').checked = false;
        doSelect(false);
        disableFooterRightButtons(true);
    }
});

function doSelect(isSelectAll) {
    fmWrapper.querySelector('.files-select-all').checked = isSelectAll;
    [].forEach.call(allCheckboxes, function (checkbox) {
        checkbox.checked = isSelectAll;
        checkbox.closest('.file-item')
            .classList[isSelectAll ? 'add' : 'remove']('selected');
    });
}

function disableFooterRightButtons(disable) {
    fmWrapper.querySelectorAll('.right-buttons button').forEach(function(button) {
        button.disabled = disable;
    });
}