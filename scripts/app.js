'use strict';

angular.module('app', [
    'ngRoute',
    'ngAnimate',
    'mgcrea.ngStrap'
]);

angular.module('app')
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'scripts/app.html'
                })
                .otherwise('/');
        }
    ]);
