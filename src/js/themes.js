// Theme options click event
fmWrapper.querySelectorAll('.theme-option').forEach(function (option) {
    option.addEventListener('click', function () {
        // removing all other theme classes
        fmWrapper.classList.forEach(function (className) {
            if (className.indexOf('-theme') !== -1) {
                fmWrapper.classList.remove(className);
            }
        });
        // add the theme class
        fmWrapper.classList.add(this.dataset.theme);
    });
});