// DOM Elements
var
    editor = fmWrapper.querySelector('#fm-editor'),
    lineNumbers = editor.querySelector('.line-numbers'),
    contentArea = editor.querySelector('.content-area');

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

// first line number
updateLineNumbers();

// A simple object to interact with the editor
var FmEditor = function() {

    function validateContent() {
        return (typeof content !== 'string');
    }

    this.add = function (content) {
        if (!validateContent) return;
        contentArea.value += content;
        updateLineNumbers();
    };

    this.replace = function (content) {
        if (!validateContent) return;
        contentArea.value = content;
        updateLineNumbers();
    };

    this.clear = function () {
        contentArea.value = '';
        updateLineNumbers();
    };
};

// Attach the FmEditor to the window object
window.FmEditor = new FmEditor();