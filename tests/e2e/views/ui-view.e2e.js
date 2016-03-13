describe('View', function() {
    beforeEach(function() {
        browser.get('http://localhost:9877/#/');
    });

    it('Should have an ui-view component', function() {
        expect(element(by.css('ui-view')).isPresent()).toBeTruthy();
    });

    it('Should open and close dropdown on click search field', function() {
        var search = element(by.model('ctrl.term'));
        var menu = element(by.css('.form.dropdown-menu'));
        search.click();

        expect(menu.isDisplayed()).toBeTruthy();

        search.click();

        expect(menu.isDisplayed()).toBeFalsy();
    });

    it('Should show an empty dropdown if search field is empty', function() {
        var search = element(by.model('ctrl.term'));
        var results = element.all(by.repeater('item in ctrl.uiDataProvider'));
        search.click();

        expect(results.count()).toBe(0);
    });

    it('Should show several results in dropdown if search field is filled', function() {
        var search = element(by.model('ctrl.term'));
        var results = element.all(by.repeater('item in ctrl.uiDataProvider'));
        search.sendKeys('angular');

        expect(results.count()).toBeGreaterThan(0);
    });

    it('Should select first result on press enter', function() {
        var search = element(by.model('ctrl.term'));
        var results = element.all(by.repeater('item in ctrl.uiDataProvider'));
        search.sendKeys('elecash');
        search.sendKeys(protractor.Key.ENTER);

        expect(search.getAttribute('value')).toBe('Elecash');
    });
});
