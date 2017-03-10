(function () {
    'use strict';
    angular.module('tabSystem').factory('Api', function () {
        return function (tabIndex, eventRegisterMap) {
            
            this.addListener = function (name, callback) {
                if(eventRegisterMap[name]){
                    eventRegisterMap[name].push(callback);
                } else {
                    throw 'there is no callback name: ' + name;
                }
            };
            
            this.getTabIndex = function () {
                return tabIndex;
            };
        }
    });
    
       
        
   
    
   
    
})();
