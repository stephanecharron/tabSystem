(function () {
    'use strict';
    angular.module('app').directive('mainController', function(){
        return {
            restrict:'E',
            controller: function () {
                var main = this;
                main.api = null;
            },
            controllerAs: 'main',
            link: function (scope, elem, attrs, main) {
                scope.$watch('main.api' , function (newValue, oldValue) {
                    if(newValue !== oldValue){
                        main.api.addListener('beforeChange', function () {
                            console.log('from: '+main.api.getTabIndex());
                        });
                        main.api.addListener('afterChange', function () {
                            console.log('to: '+main.api.getTabIndex());
                        });
                    }
                });
            }
        }
    });
})();
 
