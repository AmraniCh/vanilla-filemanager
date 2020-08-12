import {on} from "../../helpers";

// Close button
on('click', '.remove-upload-file', function (e) {
    var fileItem = e.target.closest('.file-item');
    fileItem.remove();
});