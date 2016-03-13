describe('ui-typeahead component', function() {
    var $compile;
    var $rootScope;
    var GithubService;
    var element;
    var ctrl;
    var ngModel;

    function compile(elem) {
        element = $compile(elem)($rootScope);
        $rootScope.$digest();

        ngModel = element.controller('ngModel');
        ctrl = element.controller('uiTypeahead');
    }

    beforeEach(module('app'));
    beforeEach(module('templates'));
    beforeEach(inject(function($injector) {
        $compile = $injector.get('$compile');
        $rootScope = $injector.get('$rootScope');
        GithubService = $injector.get('GithubService');

        $rootScope.user = '';
        $rootScope.provider = [
            {
                label: 'test 0',
                value: {
                    id: 0,
                    login: 'test 0'
                }
            },
            {
                label: 'test 1',
                value: {
                    id: 1,
                    login: 'test 1'
                }
            }
        ];
        $rootScope.onSearch = function () {};
    }));

    describe('With onSearch callback and not required', function() {
        beforeEach(function() {
            compile('<ui-typeahead ng-model="user" ui-data-provider="provider" ui-on-search="onSearch($term)"></ui-typeahead>');
        });

        it('Should contain a ui-typeahead template', function() {
            expect(element.html()).toContain('<div class="form dropdown" ng-class="{open: ctrl.isOpen}">');
        });

        it('Should initialize component with search and without required', function() {
            expect(ctrl.isOpen).toBeFalsy();
            expect(ctrl.term).toBe('');
            expect(ctrl.currentItem).toBeFalsy();
            expect(ctrl.modelOptions).toEqual({debounce: 300});
        });

        it('Should call onSearch callback when there is a new search', function() {
            spyOn(ctrl, 'uiOnSearch').and.callThrough();

            ctrl.term = 'search';
            ctrl.onSearch();

            expect(ctrl.uiOnSearch).toHaveBeenCalledWith({$term: 'search'});
        });

        it('Should open combo if user type on search are there are results', function() {
            var $event = {
                keyCode: 43
            };

            ctrl.onKeyDown($event);

            expect(ctrl.isOpen).toBeTruthy();
        });

        it('Should select option if user press intro are there are results', function() {
            var $event = {
                keyCode: 13,
                preventDefault: function(){}
            };

            spyOn(ctrl, 'selectOption').and.callFake(function(){});
            spyOn($event, 'preventDefault').and.callThrough();

            ctrl.onKeyDown($event);

            expect(ctrl.selectOption).toHaveBeenCalledWith(ctrl.uiDataProvider[0]);
            expect($event.preventDefault).toHaveBeenCalled();
        });

        it('Should not select option if user press intro are there are no results', function() {
            var $event = {
                keyCode: 13,
                preventDefault: function(){}
            };

            ctrl.uiDataProvider = [];

            spyOn(ctrl, 'selectOption').and.callThrough();
            spyOn($event, 'preventDefault').and.callThrough();

            ctrl.onKeyDown($event);

            expect(ctrl.selectOption).not.toHaveBeenCalled();
            expect($event.preventDefault).not.toHaveBeenCalled();
        });

        it('Should select an option', function() {
            spyOn(ngModel, '$setViewValue').and.callThrough();
            spyOn(ngModel, '$setValidity').and.callThrough();

            ctrl.selectOption(ctrl.uiDataProvider[0]);

            expect(ctrl.isOpen).toBeFalsy();
            expect(ctrl.currentItem).toEqual(ctrl.uiDataProvider[0]);
            expect(ctrl.term).toBe('test 0');
            expect(ngModel.$setViewValue).toHaveBeenCalledWith(ctrl.uiDataProvider[0]);
            expect(ngModel.$setValidity).toHaveBeenCalledWith('required', true);
        });

        it('Should render an item if an option has been selected', function() {
            ctrl.ngModel.$modelValue = ctrl.uiDataProvider[0];

            ctrl.$render();

            expect(ctrl.currentItem).toEqual(ctrl.uiDataProvider[0]);
            expect(ctrl.term).toBe('test 0');
        });

        it('Should not render an item if an option has not been selected', function() {
            ctrl.ngModel.$modelValue = null;

            ctrl.$render();

            expect(ctrl.currentItem).toBeFalsy();
            expect(ctrl.term).toBeFalsy();
        });

        it('Should format as false a null value', function() {
            var format = ctrl.formatter(null);

            expect(format).toBeFalsy();
        });

        it('Should format as true an object', function() {
            var format = ctrl.formatter({});

            expect(format).toBeTruthy();
        });
    });

    describe('Without onSearch callback and required', function() {
        beforeEach(function() {
            compile('<ui-typeahead ng-model="vm.user" ui-data-provider="vm.provider" required></ui-typeahead>');
        });

        it('Should contain a ui-typeahead template', function() {
            expect(element.html()).toContain('<div class="form dropdown" ng-class="{open: ctrl.isOpen}">');
        });

        it('Should initialize component with search and without required', function() {
            expect(ctrl.isOpen).toBeFalsy();
            expect(ctrl.term).toBe('');
            expect(ctrl.currentItem).toBeFalsy();
            expect(ctrl.modelOptions).toEqual({});
        });

        it('Should not call onSearch callback when there is a new search', function() {
            ctrl.onSearch();

            expect(ctrl.uiOnSearch).not.toBeDefined();
        });
    });
});
