describe('Unit testing great quotes', function() {
    var $compile,
        $rootScope;

    beforeEach(module('tabSystem','foo'));

    beforeEach(inject(function(_$compile_, _$rootScope_){
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('Replaces the element with the appropriate content', function() {

        $rootScope.api = {};
        var tabsScope = $rootScope.$new();
        var element = $compile("<tabs api='$parent.api'><tab name='t1'></tab><tab name='t2'></tab></tabs>")(tabsScope);
        $rootScope.$digest();
        expect(element).toBeDefined();

    });
});