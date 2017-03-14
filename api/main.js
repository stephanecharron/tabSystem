(function () {
    'use strict';
    angular.module('app').directive('mainController', function ($log) {
        return {
            restrict: 'E',
            controller: function () {
                var main = this;
                main.api = null;
                main.listeners = [];
            },
            controllerAs: 'main',
            
            link: function (scope, elem, attrs, main) {
                
                var watchApi = scope.$watch('main.api', function (newValue, oldValue) {
                    
                    if (newValue !== oldValue) {
                        main.listeners.push(main.api.addListener('beforeChange', function () {
                            $log.info('from: ' + main.api.getTabIndex());
                        }));
                        main.listeners.push(main.api.addListener('afterChange', function () {
                            $log.info('to: ' + main.api.getTabIndex());
                        }));
                        watchApi();
                    }
                });
                
                main.removeListeners = function () {
                    angular.forEach(main.listeners, function (listener) {
                        main.api.removeListener(listener);
                    });
                }
            }
        }
    });
})();
