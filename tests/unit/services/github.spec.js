describe('Github service', function() {
    var $httpBackend;
    var GithubService;

    beforeEach(module('app'));

    beforeEach(inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');
        GithubService = $injector.get('GithubService');
    }));

    it('Should call to https://api.github.com/search/users?q=elecash', function() {
        $httpBackend.expectGET('https://api.github.com/search/users?q=elecash').respond(200, {user: 'elecash'});

        GithubService.getUsers('elecash').then(
            function(response) {
                expect(response.user).toBe('elecash');
            }
        );

        $httpBackend.flush();
    });
});
