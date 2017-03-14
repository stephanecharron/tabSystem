(function () {
    'use strict';
    angular.module('tabSystem').directive('tabs', tabs);
    
    tabs.$inject = ['$log'];
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
    
    function tabsController($log) {
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
                    $log.info(name, callback, ' -> added');
                    return callback;
                }
                else {
                    throw 'there is no callback name: ' + name;
                }
            },
            removeListener: function (listener) {
                eventRegisterMap.beforeChange.splice(listener, 1);
                eventRegisterMap.afterChange.splice(listener, 1);
                $log.info(listener, ' -> remove');
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
