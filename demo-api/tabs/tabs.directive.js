(function () {
    'use strict';
    angular.module('tabSystem').directive('tabs', tabs);
    
    function tabs() {
        return {
            restrict: 'E',
            templateUrl: 'tabs/tabs.html',
            transclude: true,
            controllerAs: 'tabsCtrl',
            controller: tabsController
        };
    }
    
    function tabsController() {
        var tabsCtrl = this;
        tabsCtrl.tabs = [];
        
        tabsCtrl.add = function (tab) {
            if (!tabsCtrl.tabs.length) {
                tab.active = true;
            }
            tabsCtrl.tabs.push(tab);
        };
        
        tabsCtrl.select = function (tab) {
            angular.forEach(tabsCtrl.tabs, function (tab) {
                tab.active = false;
            });
            tab.active = true;
        };
    }
    
})();
