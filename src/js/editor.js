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