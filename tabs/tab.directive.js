(function () {
    'use strict';
    angular.module('tabSystem').directive('tab',tab);
    
    function tab() {
        
        return {
            restrict: 'E',
            require: ['^tabs', 'tab'],
            templateUrl : 'tabs/tab.html',
            transclude: true,
            controllerAs: 'tabCtrl',
            scope: {
                name : '@'
            },
            controller: function () {
                var tabCtrl = this;
                
            },
            link: function ($scope, $elem, $attr, $controllers) {
                var CTRL = {
                    TABS: $controllers[0],
                    TAB: $controllers[1]
                };
                
                CTRL.TAB.name = $scope.name;
                CTRL.TABS.add(CTRL.TAB);
            }
        }
    }
})();
