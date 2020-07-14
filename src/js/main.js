import './global.js';
import './chmod.js';
import './theme.js';
import './loading.js';
import './editor.js';

import './components/slidebar.js';
import './components/files-table.js';
import './components/modal.js';

/*
var content = `&lt;span&gt;
    hahaha
    &lt;/span&gt;`;

var out = "<span>";

var j = 0;
for (var i = 0; i < content.length; i++) {
    if (content[i] === "\n") {
        out += content.substr(j, i - 1) + "</span>";
        out += "<span>";
        j = i + 1;
        //console.log(content[i] + content[i + 1] + content[i + 2] + content[i + 3] + content[i+4])
    }
}
out += "</span>";

document.querySelector('.editor').innerHTML = "<pre>" + out + "</pre>"*/

/*
var myCodeMirror = CodeMirror(document.querySelector('.editor'));

var myCodeMirror = CodeMirror(document.querySelector('.editor'), {
    value: "function myScript(){return 100;}\n",
    mode:  "javascript",
    lineNumbers: true
});*/

/*
var i = 1;

var a = document.createElement('span');
a.textContent = i;
document.querySelector('.editor .line-numbers').appendChild(a);

document.querySelector('.editor .content-area')
    .addEventListener('input', function () {
        var content = this.value;
        if (content[content.length - 1] === "\n") {
            var span = document.createElement('span');
            i++;
            span.textContent = i;
            document.querySelector('.editor .line-numbers').appendChild(span);
        }
    });
*/

