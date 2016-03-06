'use strict';
angular.module('app')
    .directive('uiView', [
        function() {
            return {
                restrict: 'E',
                templateUrl: 'scripts/views/view.html',
                controller: 'ViewCtrl',
                controllerAs: 'vm',
                scope: {}
            };
        }
    ]);

angular.module('app')
    .controller('ViewCtrl', ['GithubService',
        function(GithubService) {
            this.user = '';
            this.provider = [];

            this.onChange = function($term) {
                GithubService.getUsers($term).then(
                    this.onGetUsers.bind(this)
                );
            };

            this.onGetUsers = function($response) {
                var users = [];

                for (var i=0, l=$response.items.length; i<l; i++) {
                    users.push({
                        label: $response.items[i].login,
                        value: $response.items[i]
                    });
                }

                this.provider = users;
            };
        }
    ]);
