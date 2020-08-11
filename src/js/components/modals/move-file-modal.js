import {on} from '../../helpers';

var
    moveFileModal = fmWrapper.querySelector('#moveFileModal');

// Select file item event
on('click', '#moveFileModal .files-list .item', function (e) {
    var ele = e.target.closest('.item');
    [selectFileItem, updateDestinationFolder].forEach(function (func) {
        func.call(this, e)
    }.bind(ele));
});

// When opening the modal copy the selected file name from the table and put it in the 'source'
fmWrapper.querySelector('*[data-action="move"]')
    .addEventListener('click', function () {
        updateSourceFileName();
    });


function selectFileItem(e) {
    var ele = e.target.closest('.dir-item');
    if (this === ele) {
        var selected = moveFileModal.querySelector('.files-list .item.selected');

        if (selected) {
            selected.classList.remove('selected');  
        }

        ele.parentNode.childNodes.forEach(function(node) {
            if (node.nodeType === Node.ELEMENT_NODE && node !== ele) {
                node.setAttribute('data-open', 'false');
                node.querySelectorAll('.item[data-open="true"]').forEach(function(item){
                    item.setAttribute('data-open', 'false');
                });
            }
        });
    
        this.classList.add('selected');
        this.setAttribute('data-open', 'true');
    }
}

function updateSourceFileName() {
    var
        tableSelectedFileName = fmWrapper.querySelector('.files-table .file-item.selected .file-name'),
        sourceFile = fmWrapper.querySelector('#moveFileModal .moving-to .source');

    sourceFile.textContent = tableSelectedFileName.textContent;
}

function updateDestinationFolder(e) {
    var destinationFolder = moveFileModal.querySelector('.destination');

    if (this === e.target.closest('.dir-item')) {
        var
            item = this,
            dist = item.querySelector('.name').textContent;

        item = item.parentElement.parentElement;

        while(item.classList.contains('dir-item')) {
            dist = item.querySelector('.name').textContent + '/' + dist;
            item = item.parentElement.parentElement;
        }

        destinationFolder.textContent = dist;
    }
}