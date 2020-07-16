import './global.js';
import './polyfill.js';
import './chmod.js';
import './theme.js';
import './loading.js';
import './editor.js';

import './components/slidebar.js';
import './components/files-table.js';
import './components/modal.js';
import './components/move-file-modal-select-file';

// Modal components
import './components/modals/move-file-modal.js';
import './components/modals/remove-file-modal.js';
import './components/modals/rename-file-modal.js';
import './components/modals/permissions-modal.js';

setTimeout(function () {
    fmWrapper
        .querySelector('.permissions-modal .alert.error')
        .style.display = 'block';
    fmWrapper
        .querySelector('.permissions-modal .alert.error')
        .style.opacity = '1';
}, 4000);