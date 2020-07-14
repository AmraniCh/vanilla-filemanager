window.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        fmWrapper.querySelectorAll('.loading').forEach(function (item) {
            item.classList.remove('loading');
        });
    }, 500);
});