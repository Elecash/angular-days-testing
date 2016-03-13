// PhantomJS 1 doesn't have .bind() we need to add it
// We're using PhantomJS 2 and we don't need this, it's here just for learning purposes
(function () {
    'use strict';
    // minimal polyfill for phantomjs
    if (!Function.prototype.bind) {
        Function.prototype.bind = function (oThis) {
            if (typeof this !== "function") {
                // closest thing possible to the ECMAScript 5
                // internal IsCallable function
                throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
            }

            var aArgs = Array.prototype.slice.call(arguments, 1),
                fToBind = this,
                fNOP = function () {},
                fBound = function () {
                    return fToBind.apply(this instanceof fNOP && oThis
                            ? this
                            : oThis,
                        aArgs.concat(Array.prototype.slice.call(arguments)));
                };

            fNOP.prototype = this.prototype;
            fBound.prototype = new fNOP();

            return fBound;
        };
    }
})();

// There are localStorage storage problems with Firefox 37 (and below)
// https://github.com/pivotal/jasmine/issues/299
if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
    var mock = (function() {
        var store = {};
        return {
            getItem: function(key) {
                return store[key];
            },
            setItem: function(key, value) {
                store[key] = value.toString();
            },
            clear: function() {
                store = {};
            }
        };
    })();
    Object.defineProperty(window, 'localStorage', { value: mock, configurable: true, enumerable: true, writable: true });
    Object.defineProperty(window, 'sessionStorage', { value: mock, configurable: true, enumerable: true, writable: true });
}
