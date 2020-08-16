(function () {
    'use strict';

    // Making a reference to the fileManager wrapper dom element in the window object
    window.fmWrapper = document.querySelector('.fm-wrapper');

    // Handle the enter key press when a modal is opened
    window.addEventListener('keyup', function (e) {
        if (e.key !== 'Enter') return;
        var ele = fmWrapper.querySelector('.modal:not(.editor-modal).show .modal-footer button:not([data-close="modal"])');
        if (ele) {
            ele.dispatchEvent(new MouseEvent('click', {
                bubbles: true,
                cancelable: true
            }));
        }
    });

    // polyfill for the Element.prototype.closest method
    if (!Element.prototype.closest) {
        var proto = Element.prototype;

        if (!proto.matches) {
            proto.matches = proto.msMatchesSelector || proto.webkitMatchesSelector;
        }

        proto.closest = function (selector) {
            var ele = this;

            if (ele.matches(selector)) return ele;

            while (ele.parentElement) { // Check for the parent element
                var parent = ele.parentElement;
                if (parent.matches(selector)) {
                    // If the parent matches the selector return it
                    return parent;
                }
                // otherwise switch the 'ele' to the parent element
                ele = ele.parentElement;
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


    // Adding the forEach method to the DOMTokenList Object returned by the HTMLElement.classList property (IE10 & IE11)
    if (
        'classList' in HTMLElement.prototype
        && !('forEach' in document.createElement('_').classList)
    ) {

        DOMTokenList.prototype.forEach = function (callbackfn, thisArg) {
            for (var i = 0; i < this.length; i++) {
                callbackfn.call(thisArg, this[i], i, this);
            }
        };
    }

    // A very simple polyfill to the Element.classList property
    // Implemented methods :
    // item, add, remove, contains, toggle
    if (
        // Check if the classList property is defined under the base Element Object
        !('classList' in document.createElement('_'))
    ) {
        var classList = function (element) {
            element.className.split(' ').forEach(function (name) {
                this.push(name);
            }.bind(this));

            this._update = function () {
                element.setAttribute('class', this.join(' '));
            };
        };

        // Making the classList prototype inherit Array prototype methods
        classList.prototype = Array.prototype;

        // A shortcut for the classList prototype
        classListProto = classList.prototype;

        // classList.add()
        classListProto.add = function () {
            for (var i = 0; i < arguments.length; i++) {
                if (!this.contains(arguments[i])) {
                    this.push(arguments[i]);
                }
            }

            this._update();
        };

        // classList.remove()
        classListProto.remove = function () {
            for (var j = 0; j < arguments.length; j++) {
                for (var i = 0; i < this.length; i++) {
                    if (this[i] === arguments[j]) {
                        this.splice(i, 1);
                    }
                }
            }

            this._update();
        };

        // classList.item()
        classListProto.item = function (index) {
            return this[index];
        };

        // classList.contains()
        classListProto.contains = function (token) {
            return this.indexOf(token) !== -1;
        };

        // classList.toggle()
        classListProto.toggle = function (token) {
            if (!this.contains(token)) {
                this.add(token);
            } else {
                this.remove(token);
            }
        };

        // Attach the classList object to the Element prototype
        Object.defineProperty(window.Element.prototype, 'classList', {
            get: function () {
                return new classList(this);
            },
            enumerable: true,
            configurable: true,
        });
    }

    // Checking in the local storage for the theme color
    if (localStorage.getItem('fm-theme')) {
        updateTheme(localStorage.getItem('fm-theme'));
    }

    // Theme options click event
    fmWrapper.querySelectorAll('.theme-option')
        .forEach(function (option) {
            option.addEventListener('click', function () {
                updateTheme(this.getAttribute('data-theme'));
            });
    });

    function updateTheme(theme) {

        var themeOption = fmWrapper.querySelector('.theme-option[data-theme=' + theme + ']');

        if (themeOption) {
            // Removing the 'selected' class from the theme options
            fmWrapper.querySelectorAll('.theme-option')
                .forEach(function (item) {
                    item.classList.remove('selected');
                });

            themeOption.classList.add('selected');

            // Get all theme classes
            var themeClasses = [];
            fmWrapper.querySelectorAll('.theme-option')
                .forEach(function (item) {
                    themeClasses.push(item.getAttribute('data-theme'));
                });

            // removing all other theme classes
            fmWrapper.classList.forEach(function (className) {
                themeClasses.forEach(function (item) {
                    fmWrapper.classList.remove(item);
                });
            });

            // add the theme class
            fmWrapper.classList.add(theme);
            localStorage.setItem('fm-theme', theme);
        }
    }

    window.addEventListener('DOMContentLoaded', function () {
        fmWrapper.querySelectorAll('.loading').forEach(function (item) {
            item.classList.remove('loading');
        });
    });

    // DOM Elements
    var
        editor = fmWrapper.querySelector('#fm-editor'),
        lineNumbers = editor.querySelector('.line-numbers'),
        contentArea = editor.querySelector('.content-area'),
        pendingDiv = editor.querySelector('.pending');

    function updateLineNumbers() {
        var
            // Textarea content
            content = contentArea.value,
            // Storing the lines count
            lines = content.split('\n').length;

        // Clear the div that's contains the line numbers
        lineNumbers.innerHTML = '';

        // Append the numbers according to lines count
        for (var i = 0; i < lines; i++) {
            appendNumber(i + 1);
        }

        // Making the textarea element and the line numbers div at the same height
        contentArea.style.height = window.getComputedStyle(lineNumbers).getPropertyValue('height');
    }

    function appendNumber(number) {
        var span = document.createElement('span');
        span.textContent = number;
        lineNumbers.appendChild(span);
    }

    // Applying events
    ['input', 'paste'].forEach(function (event) {
        contentArea.addEventListener(event, updateLineNumbers);
    });

    // A simple object to interact with the editor
    var FmEditor = function() {

        function validateContent() {
            return (typeof content !== 'string');
        }

        this.set = function (content) {
            if (!validateContent) return;
            contentArea.value = content;
            updateLineNumbers();

            return this;
        };

        this.append = function (content) {
            if (!validateContent) return;
            contentArea.value += content;
            updateLineNumbers();

            return this;
        };

        this.get = function () {
            return contentArea.value;
        };

        this.clear = function () {
            contentArea.value = '';
            updateLineNumbers();

            return this;
        };

        this.showLoading = function () {
            pendingDiv.classList.add('show');

            return this;
        };

        this.hideLoading = function () {
            pendingDiv.classList.remove('show');

            return this;
        };
    };

    // first line number
    updateLineNumbers();

    // Attach the FmEditor to the window object
    window.fmEditor = new FmEditor();

    // Slidebar toggle
    fmWrapper.querySelector('.toggle-slidebar').addEventListener("click", function () {
        document.querySelector('.slidebar').classList.toggle('show');
    });

    // Close the slidebar when clicking out of it
    fmWrapper.addEventListener('click', function (e) {
        if (
            !e.target.closest('.slidebar') &&
            !e.target.closest('.toggle-slidebar') &&
            !e.target.closest('.settings-modal') &&
            !e.target.closest('.modal-overlay') ||
            e.target.closest('.settings-modal button[data-close="modal"]') // cancel btn
        ) {
            fmWrapper.querySelector('.slidebar').classList.remove('show');
        }
    });

    function on(event, selector, handler) {
        document.addEventListener(event, function (e) {

            if (e.target.matches(selector)) {
                handler(e);
            }

            var parent = e.target.parentElement;
            while (parent !== null) {
                if (parent.matches(selector)) {
                    handler(e);
                }
                parent = parent.parentElement;
            }
        });
    }

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

    // Create and add the modal overlay to the DOM
    var overlayDiv = document.createElement('div');
    overlayDiv.classList.add('modal-overlay');
    fmWrapper.appendChild(overlayDiv);

    // Modal Show
    fmWrapper.querySelectorAll('*[data-modal]').forEach(function (item) {
        item.addEventListener('click', function () {
            fmWrapper.querySelector(this.getAttribute('data-modal')).classList.add('show');
            overlayDiv.classList.add('show');
        });
    });

    // Modal Hide
    fmWrapper.querySelectorAll('*[data-close="modal"]').forEach(function (item) {
        item.addEventListener('click', function () {
            this.closest('.modal').classList.remove('show');
            overlayDiv.classList.remove('show');
        });
    });

    var searchInput = fmWrapper.querySelector('.header .search-form .search-input');

    function getFileItems() {
        return  fmWrapper.querySelectorAll('.files-table .file-item');
    }

    searchInput.addEventListener('input', function () {
        var search = this.value.toLowerCase();
        getFileItems().forEach(function (ele) {
            var name = ele.querySelector('.file-name').textContent.toLowerCase();
            if (name.indexOf(search) !== -1) {
                ele.classList.remove('hide-in-search');
            } else {
                ele.classList.add('hide-in-search');
            }
        });
    });

    var
        moveFileModal = fmWrapper.querySelector('#moveFileModal');

    // Select file item event
    on('click', '#moveFileModal .files-list .item', function (e) {
        var ele = e.target.closest('.item');
        [selectFileItem, updateDestinationFolder].forEach(function (func) {
            func.call(this, e);
        }.bind(ele));
    });

    // When opening the modal copy the selected file name from the table and put it in the 'source'
    fmWrapper.querySelector('*[data-action="move"]')
        .addEventListener('click', function () {
            updateSourceFileName();
        });


    function selectFileItem(e) {
        var ele = e.target.closest('.dir-item');
        if (this === ele) {
            var selected = moveFileModal.querySelector('.files-list .item.selected');

            if (selected) {
                selected.classList.remove('selected');  
            }

            ele.parentNode.childNodes.forEach(function(node) {
                if (node.nodeType === Node.ELEMENT_NODE && node !== ele) {
                    node.setAttribute('data-open', 'false');
                    node.querySelectorAll('.item[data-open="true"]').forEach(function(item){
                        item.setAttribute('data-open', 'false');
                    });
                }
            });
        
            this.classList.add('selected');
            this.setAttribute('data-open', 'true');
        }
    }

    function updateSourceFileName() {
        var
            tableSelectedFileName = fmWrapper.querySelector('.files-table .file-item.selected .file-name'),
            sourceFile = fmWrapper.querySelector('#moveFileModal .moving-to .source');

        sourceFile.textContent = tableSelectedFileName.textContent;
    }

    function updateDestinationFolder(e) {
        var destinationFolder = moveFileModal.querySelector('.destination');

        if (this === e.target.closest('.dir-item')) {
            var
                item = this,
                dist = item.querySelector('.name').textContent;

            item = item.parentElement.parentElement;

            while(item.classList.contains('dir-item')) {
                dist = item.querySelector('.name').textContent + '/' + dist;
                item = item.parentElement.parentElement;
            }

            destinationFolder.textContent = dist;
        }
    }

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

    fmWrapper.querySelector('*[data-action="rename"]')
        .addEventListener('click', function () {
            var
                tableSelectedItem = fmWrapper.querySelector('.files-table .file-item.selected'),
                nameFor = fmWrapper.querySelector('#renameFileModal .name-for');

            nameFor.textContent = tableSelectedItem.querySelector('.file-name').textContent;
        });

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

    // Close button
    on('click', '.remove-upload-file', function (e) {
        var fileItem = e.target.closest('.file-item');
        fileItem.remove();
    });

}());
