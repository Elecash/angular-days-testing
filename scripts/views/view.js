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
    .controller('ViewCtrl', [
        function() {
            this.user = '';
        }
    ]);
