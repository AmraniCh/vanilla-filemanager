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