// Making a reference to the fileManager wrapper dom element in the window object
if (window) {
    window.fmWrapper = document.querySelector('.fm-wrapper');
}

// polyfill for the Element.prototype.closest method (IE9)
if (!Element.prototype.closest) {
    var proto = Element.prototype;

    if (!proto.matches) {
        proto.matches = proto.msMatchesSelector || proto.webkitMatchesSelector;
    }

    proto.closest = function (selector) {
        var ele = this;

        while (ele.parentElement) { // Check for the parent element
            var parent = ele.parentElement;
            if (parent.matches(selector)) {
                return parent; // If the parent matches the selector return it
            }
            ele = ele.parentElement; // otherwise switch the 'ele' to the parent element
        }
    };
}

// NodeList forEach polyfill
if (!NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}
