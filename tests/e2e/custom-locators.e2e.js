module.exports = function cssWithContent() {
    By.addLocator('cssWithContent',
        function(obj, optParentElement, optRootSelector) {
            var using = optParentElement || document;
            var elements = using.querySelectorAll(obj.css);

            return Array.prototype.filter.call(elements,
                function(elem) {
                    return elem.textContent.toLowerCase() === obj.content.toLowerCase();
                }
            );
        }
    );
};
