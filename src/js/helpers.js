function on(event, selector, handler) {
    document.addEventListener(event, function (e) {

        if (e.target.matches(selector)) {
            handler(e);
        }

        var parent = e.target.parentElement;
        while (parent !== null) {
            if (parent.matches(selector)) {
                handler(e);
            }
            parent = parent.parentElement;
        }
    });
}

export {on};