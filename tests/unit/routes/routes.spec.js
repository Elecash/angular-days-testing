describe('Routes', function() {
    var $httpBackend;
    var $location;
    var $rootScope;
    var $route;

    beforeEach(module('app'));

    beforeEach(inject(function($injector){
        $httpBackend = $injector.get('$httpBackend');
        $location = $injector.get('$location');
        $rootScope = $injector.get('$rootScope');
        $route = $injector.get('$route');
    }));

    it('Should test root route', function() {
        $httpBackend.expectGET('scripts/views/route-view.html').respond({});

        $location.path('/');
        $rootScope.$digest();
        expect($route.current).toBeDefined();
    });

    it('Should go to root when otherwise', function() {
        $httpBackend.expectGET('scripts/views/route-view.html').respond({});

        $location.path('/test');
        $rootScope.$digest();
        expect($route.current).toBeDefined();
    });
});
