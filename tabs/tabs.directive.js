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
            bindToController : {
                api: '='
            }
        };
    }
    
    tabsController.$inject = ['Api'];
    function tabsController(Api) {
        var tabsCtrl = this;
        tabsCtrl.tabs = [];
        tabsCtrl.tabIndex = 0;
        var eventRegisterMap = {
            beforeChange: [],
            afterChange : []
        };
        tabsCtrl.api = new Api(tabsCtrl.tabIndex, eventRegisterMap);
        var tabCounter = 0;
        
        tabsCtrl.add = function (tab) {
            if (!tabsCtrl.tabs.length) {
                tab.active = true;
            }
            tab.index = tabCounter++;
            tabsCtrl.tabs.push(tab);
        };
        
        tabsCtrl.select = function (tab) {
            tabsCtrl.$$applyCallback('beforeChange');
            angular.forEach(tabsCtrl.tabs, function (tab) {
                tab.active = false;
            });
            tab.active = true;
            tabsCtrl.$$applyCallback('afterChange');
    
        };
    
        tabsCtrl.$$applyCallback = function (name) {
        
            if(eventRegisterMap[name]){
                angular.forEach(eventRegisterMap[name], function (callback) {
                    callback();
                });
            } else {
                throw 'there is no callback name: ' + name;
            }
        }
    
       
        
    }
    
})();
