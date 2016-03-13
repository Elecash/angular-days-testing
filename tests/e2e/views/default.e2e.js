describe('Default route', function() {
    beforeEach(function() {
        browser.get('http://localhost:9877/#/test');
    });

    it('Should have an ui-view component', function() {
        expect(element(by.css('ui-view')).isPresent()).toBeTruthy();
    });
});
