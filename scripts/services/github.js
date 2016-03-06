angular.module('app')
    .service('GithubService', ['$resource',
        function($resource) {
            // https://developer.github.com/v3/search/#search-users
            this.getUsers = function(search) {
                return $resource('https://api.github.com/search/users').get({q: search}).$promise;
            };
        }
    ]);
