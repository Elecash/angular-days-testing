'use strict';
angular.module('app')
    .directive('uiTypeahead', [
        function() {
            return {
                restrict: 'E',
                templateUrl: 'scripts/comps/typeahead.html',
                controller: 'TypeaheadCtrl',
                controllerAs: 'ctrl',
                require: 'ngModel',
                scope: {},
                bindToController: {
                    uiDataProvider: '=',
                    uiOnSearch: '&?'
                }
            };
        }
    ]);

angular.module('app')
    .controller('TypeaheadCtrl', ['$element',
        function($element) {
            this.init = function() {
                this.isOpen = false;
                this.term = '';
                this.currentItem = null;
                this.modelOptions = {};

                if (this.uiOnSearch) {
                    this.modelOptions = {debounce: 300};
                }

                this.ngModel = $element.controller('ngModel');
                this.ngModel.$formatters.push(this.formatter);
                this.ngModel.$render = this.$render.bind(this);

                if ($element.attr('required')) {
                    this.ngModel.$setValidity('required', false);
                }
            };

            this.onSearch = function() {
                if (this.uiOnSearch) {
                    this.uiOnSearch({$term: this.term});
                }
            };

            this.onKeyDown = function($event) {
                if (this.uiDataProvider.length) {
                    if ($event.keyCode === 13) {
                        this.selectOption(this.uiDataProvider[0]);

                        $event.preventDefault();
                    }
                    else {
                        this.isOpen = true;
                    }
                }
            };

            this.selectOption = function(item) {
                this.isOpen = false;
                this.currentItem = item;
                this.term = this.currentItem.label;
                this.ngModel.$setViewValue(this.currentItem);
                this.ngModel.$setValidity('required', true);
            };

            this.$render = function() {
                this.currentItem = this.ngModel.$modelValue;

                if (this.ngModel.$modelValue) this.term = this.currentItem.label;
            };

            this.formatter = function(value) {
                return (!!value);
            };

            this.init();
        }
    ]);
