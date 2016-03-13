'use strict';
angular.module('app')
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'scripts/views/route-view.html'
                })
                .otherwise('/');
        }
    ]);
