(function () {
    'use strict';
    angular.module('tabSystem').directive('tabs', tabs);
    
    function tabs() {
        return {
            restrict: 'E',
            templateUrl: 'tabs/tabs.html',
            transclude: true,
            controllerAs: 'tabsCtrl',
            controller: tabsController,
            bindToController: {
                api: '='
            }
        };
    }
    
    function tabsController() {
        var tabCounter = 0;
        var tabsCtrl = this;
        tabsCtrl.tabs = [];
        tabsCtrl.tabIndex = 0;
        
        var eventRegisterMap = {
            beforeChange: [],
            afterChange: []
        };
        
        tabsCtrl.api = {
            addListener: function (name, callback) {
                if (eventRegisterMap[name]) {
                    eventRegisterMap[name].push(callback);
                }
                else {
                    throw 'there is no callback name: ' + name;
                }
            },
            getTabIndex: function () {
                return tabsCtrl.tabIndex;
            }
        };
        
        tabsCtrl.add = function (tab) {
            if (!tabsCtrl.tabs.length) {
                tab.active = true;
            }
            tab.index = tabCounter++;
            tabsCtrl.tabs.push(tab);
        };
        
        tabsCtrl.select = function (tab) {
            if (tab.index === tabsCtrl.tabIndex) return;
            
            tabsCtrl.$$applyCallback('beforeChange');
            angular.forEach(tabsCtrl.tabs, function (tab) {
                tab.active = false;
            });
            tab.active = true;
            tabsCtrl.tabIndex = tab.index;
            tabsCtrl.$$applyCallback('afterChange');
            
        };
        
        tabsCtrl.$$applyCallback = function (name) {
            
            if (eventRegisterMap[name]) {
                angular.forEach(eventRegisterMap[name], function (callback) {
                    callback();
                });
            } else {
                throw 'there is no callback name: ' + name;
            }
        }
    }
    
})();
