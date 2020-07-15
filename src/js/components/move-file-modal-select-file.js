var filesItems = fmWrapper.querySelectorAll('.movefile-modal .files-list .item');

filesItems.forEach(function (item) {
    item.addEventListener('click', function (e) {
        if (this === e.target.closest('.dir-item')) {
            filesItems.forEach(function (item) {
                item.classList.remove('selected');
            });
            this.classList.add('selected');
        }
    });
});