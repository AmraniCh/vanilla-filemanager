var
    chmod = [0, 0, 0],
    rules = {
        read: 4,
        write: 2,
        execute: 1
    };

fmWrapper.querySelectorAll('.perm-table .checkbox')
    .forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            fmWrapper.querySelector('.numeric-chmod').textContent = getChmodString.call(this);
        });
});

function getChmodString() {
    var
        group = this.getAttribute('data-group'),
        action = this.getAttribute('data-action'),
        checked = this.querySelector('input[type="checkbox"]').checked;

    switch (group) {
        case 'owner':
            if (checked) {
                chmod[0] += rules[action];
            } else {
                chmod[0] -= rules[action];
            }
            break;
        case 'group':
            if (checked) {
                chmod[1] += rules[action];
            } else {
                chmod[1] -= rules[action];
            }
            break;
        case 'others':
            if (checked) {
                chmod[2] += rules[action];
            } else {
                chmod[2] -= rules[action];
            }
            break;
    }

    return '0' + chmod.join('');
}