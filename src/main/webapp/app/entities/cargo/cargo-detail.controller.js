(function() {
    'use strict';

    angular
        .module('appgetewayApp')
        .controller('CargoDetailController', CargoDetailController);

    CargoDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Cargo'];

    function CargoDetailController($scope, $rootScope, $stateParams, entity, Cargo) {
        var vm = this;

        vm.cargo = entity;

        var unsubscribe = $rootScope.$on('appgetewayApp:cargoUpdate', function(event, result) {
            vm.cargo = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
