'use strict';

describe('Controller Tests', function() {

    describe('Escolaridade Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockEscolaridade;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockEscolaridade = jasmine.createSpy('MockEscolaridade');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Escolaridade': MockEscolaridade
            };
            createController = function() {
                $injector.get('$controller')("EscolaridadeDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'appgetewayApp:escolaridadeUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
