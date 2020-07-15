// polyfill for the Element.prototype.closest method
if (!Element.prototype.closest) {
    var proto = Element.prototype;

    if (!proto.matches) {
        proto.matches = proto.msMatchesSelector || proto.webkitMatchesSelector;
    }

    proto.closest = function (selector) {
        var ele = this;

        if (ele.matches(selector)) return ele;

        while (ele.parentElement) { // Check for the parent element
            var parent = ele.parentElement;
            if (parent.matches(selector)) {
                // If the parent matches the selector return it
                return parent;
            }
            // otherwise switch the 'ele' to the parent element
            ele = ele.parentElement;
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

// A very simple polyfill to the Element.classList property
// Implemented methods :
// item, add, remove, contains, toggle
if (
    // Check if the classList property is defined under the base Element Object
    !('classList' in document.createElement('_'))
) {

    var classList = function (element) {
        element.className.split(' ').forEach(function (name) {
            this.push(name);
        }.bind(this));

        this._update = function () {
            element.setAttribute('class', this.join(' '));
        };
    };

    // Making the classList prototype inherit Array prototype methods
    classList.prototype = Array.prototype;

    // A shortcut for the classList prototype
    classListProto = classList.prototype;

    // classList.add()
    classListProto.add = function () {
        for (var i = 0; i < arguments.length; i++) {
            if (!this.contains(arguments[i])) {
                this.push(arguments[i]);
            }
        }

        this._update();
    };

    // classList.remove()
    classListProto.remove = function () {
        for (var j = 0; j < arguments.length; j++) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] === arguments[j]) {
                    this.splice(i, 1);
                }
            }
        }

        this._update();
    };

    // classList.item()
    classListProto.item = function (index) {
        return this[index];
    };

    // classList.contains()
    classListProto.contains = function (token) {
        return this.indexOf(token) !== -1;
    };

    // classList.toggle()
    classListProto.toggle = function (token) {
        if (!this.contains(token)) {
            this.add(token);
        } else {
            this.remove(token);
        }
    };

    // Attach the classList object to the Element prototype
    Object.defineProperty(window.Element.prototype, 'classList', {
        get: function () {
            return new classList(this);
        },
        enumerable: true,
        configurable: true
    });
}
