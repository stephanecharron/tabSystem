angular.module('app', []);

angular.module('app').directive('inputsControl', function ($controller) {
    return {
        restrict: 'E',
        template: '<ng-transclude />',
        controllerAs: 'inputsController',
        controller: function () {
            this.inputs =  [{},{},{},{}];
            var indexInsert = 0;
            this.pin = '';
    
            this.add = function (input) {
                if(this.inputs.length == 1){
                    input.focus();
                }
                this.inputs[indexInsert].elem = input;
                this.inputs[0].elem.focus();
                indexInsert++;
            };
            
            this.next = function (input) {
                var index = this.inputs.indexOf(input);
                if(!!this.inputs[index+1] && input.value){
                    this.inputs[index+1].elem.focus();
                }
            };
            
            this.update =function () {
                var _this = this
                this.pin  ='';
                     angular.forEach(this.inputs, function (input) {
                         if(input.value !== null && input.value !== undefined) {
                             _this.pin += input.value;
                         }
                });
            }
        },
        transclude: true
    }
});

angular.module('app').directive('pin', function () {
    return {
        require: ['^inputsControl', 'pin'],
        restrict: 'A',
        controllerAs: 'pinCtrl',
        controller: function () {},
        link: function (scope, elem, attrs, ctrl) {
            ctrl[0].add(elem);
        }
    }
});
