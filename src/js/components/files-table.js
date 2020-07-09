// DOM elements
var
    table = document.querySelector('.files-table'),
    fileItems = table.querySelectorAll('.file-item'),
    allCheckboxes = table.querySelectorAll('.file-item .checkbox input[type="checkbox"]');

// Table click item
[].forEach.call(fileItems, function (item) {
    item.addEventListener('click', function (e) {
        if (e.target.parentElement === this) {
            if (!e.shiftKey && !e.ctrlKey) {
                fileItems.forEach(function (item) {
                    item.classList.remove('selected');
                });
                allCheckboxes.forEach(function (item) {
                    item.checked = false;
                });
            }
            this.classList.add('selected');
            this.querySelector('.checkbox input[type="checkbox"]').checked = true;
        }
    });
});

// Each checkbox change event
[].forEach.call(allCheckboxes, function (item) {
    item.addEventListener('change', function () {
        this.closest('.file-item').classList.toggle('selected');
    });
});

// Table Select All
document.querySelector('.checkbox.files-select-all input').addEventListener("change", function () {
    this.checked ? doSelect(true) : doSelect(false);
});

function doSelect(selectAll) {
    [].forEach.call(allCheckboxes, function (checkbox) {
        var fileItem = checkbox.closest('.file-item');
        checkbox.checked = selectAll;
        selectAll ? fileItem.classList.add('selected') : fileItem.classList.remove('selected');
    });
}
