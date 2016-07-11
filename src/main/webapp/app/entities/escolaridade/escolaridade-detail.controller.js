(function() {
    'use strict';

    angular
        .module('appgetewayApp')
        .controller('EscolaridadeDetailController', EscolaridadeDetailController);

    EscolaridadeDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Escolaridade'];

    function EscolaridadeDetailController($scope, $rootScope, $stateParams, entity, Escolaridade) {
        var vm = this;

        vm.escolaridade = entity;

        var unsubscribe = $rootScope.$on('appgetewayApp:escolaridadeUpdate', function(event, result) {
            vm.escolaridade = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
