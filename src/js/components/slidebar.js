// Slidebar toggle
fmWrapper.querySelector('.toggle-slidebar').addEventListener("click", function () {
    document.querySelector('.slidebar').classList.toggle('show');
});

// Close the slidebar when clicking out of it
fmWrapper.addEventListener('click', function (e) {
    console.log(e.target.closest('button[data-close="modal"]'));
    if (
        !e.target.closest('.slidebar') &&
        !e.target.closest('.toggle-slidebar') &&
        !e.target.closest('.settings-modal') &&
        !e.target.closest('.modal-overlay') ||
        e.target.closest('button[data-close="modal"]') // cancel btn
    ) {
        fmWrapper.querySelector('.slidebar').classList.remove('show');
    }
});