// Create and add the modal overlay to the DOM
var overlayDiv = document.createElement('div');
overlayDiv.classList.add('modal-overlay');
fmWrapper.appendChild(overlayDiv);

// Modal Show
fmWrapper.querySelectorAll('*[data-modal]').forEach(function (item) {
    item.addEventListener('click', function () {
        fmWrapper.querySelector(this.dataset.modal).classList.add('show');
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