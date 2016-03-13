describe('View', function() {
    beforeEach(function() {
        browser.get('http://localhost:9875/#/');
    });

    it('Should have an ui-view component', function() {
        expect(element(by.css('ui-view')).isPresent()).toBeTruthy();
    });
});
