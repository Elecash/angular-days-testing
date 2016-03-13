angular.module('app')
    .service('GithubService', ['$resource',
        function($resource) {
            // https://developer.github.com/v3/search?q=search
            this.getUsers = function(search) {
                return $resource('https://api.github.com/search/users').get({q: search}).$promise;
            };
        }
    ]);
