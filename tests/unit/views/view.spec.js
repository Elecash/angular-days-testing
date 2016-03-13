describe('ui-view component', function() {
    var $compile;
    var $rootScope;
    var GithubService;
    var element;
    var ctrl;

    beforeEach(module('app'));
    beforeEach(module('templates'));

    beforeEach(inject(function($injector) {
        $compile = $injector.get('$compile');
        $rootScope = $injector.get('$rootScope');
        GithubService = $injector.get('GithubService');

        element = $compile('<ui-view></ui-view>')($rootScope);
        $rootScope.$digest();

        ctrl = element.controller('uiView');
    }));

    it('Should contain a ui-view template', function() {
        expect(element.html()).toContain('<ui-typeahead ng-model="vm.user" ui-data-provider="vm.provider" ui-on-search="vm.onChange($term)" class="ng-pristine ng-untouched ng-valid ng-isolate-scope ng-not-empty">');
    });

    it('Should get Github users when there is a new search', function() {
        spyOn(GithubService, 'getUsers').and.callFake(
            function() {
                return {
                    then: function(){}
                };
            }
        );

        ctrl.onChange('elecash');

        expect(GithubService.getUsers).toHaveBeenCalledWith('elecash');
    });

    it('Should not get Github users when search is empty', function() {
        spyOn(GithubService, 'getUsers').and.callFake(
            function() {
                return {
                    then: function(){}
                };
            }
        );

        ctrl.onChange('');

        expect(GithubService.getUsers).not.toHaveBeenCalled();
    });

    it('Should create a provider on get users', function() {
        var $response = {
            items: [
                {
                    id: 0,
                    login: 'test 0'
                },
                {
                    id: 1,
                    login: 'test 1'
                }
            ]
        };

        ctrl.onGetUsers($response);

        expect(ctrl.provider).toEqual([
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
        ]);
    });
});
