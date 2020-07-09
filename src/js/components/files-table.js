// polyfill for the Element.prototype.closest method (IE9)
if (!Element.prototype.closest) {
    var proto = Element.prototype;

    if (!proto.matches) {
        proto.matches = proto.msMatchesSelector || proto.webkitMatchesSelector;
    }

    proto.closest = function (selector) {
        var ele = this;

        while (ele.parentElement) { // Check for the parent element
            var parent = ele.parentElement;
            if (parent.matches(selector)) {
                return parent; // If the parent matches the selector return it
            }
            ele = ele.parentElement; // otherwise switch the 'ele' to the parent element
        }
    };
}

// NodeList forEach polyfill
if (!NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

// DOM elements
var
    table = document.querySelector('.files-table'),
    fileItems = table.querySelectorAll('.file-item'),
    allCheckboxes = table.querySelectorAll('.file-item .checkbox input[type="checkbox"]');

// Table click item
fileItems.forEach(function (item) {
    item.addEventListener('click', function (e) {
        if (e.target.parentElement === this) { // If the event target is a 'file item'
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
        }
    });
});

// Each checkbox change event
allCheckboxes.forEach(function (item) {
    item.addEventListener('change', function () {
        this.closest('.file-item').classList.toggle('selected');
    });
});

// Table Select All
document.querySelector('.files-select-all').addEventListener("change", function () {
    this.checked ? doSelect(true) : doSelect(false);
});

// Toolbar button select all
document.querySelector('.toolbar .files-select').addEventListener('click', function () {
    doSelect(true);
});

// Toolbar button unselect all
document.querySelector('.toolbar .files-unselect').addEventListener('click', function () {
    doSelect(false);
});

function doSelect(selectAll) {
    [].forEach.call(allCheckboxes, function (checkbox) {
        checkbox.checked = selectAll;
        checkbox.closest('.file-item')
            .classList[selectAll ? 'add' : 'remove']('selected');
    });
}
