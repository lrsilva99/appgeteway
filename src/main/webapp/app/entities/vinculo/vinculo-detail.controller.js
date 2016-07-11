(function() {
    'use strict';

    angular
        .module('appgetewayApp')
        .controller('VinculoDetailController', VinculoDetailController);

    VinculoDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Vinculo'];

    function VinculoDetailController($scope, $rootScope, $stateParams, entity, Vinculo) {
        var vm = this;

        vm.vinculo = entity;

        var unsubscribe = $rootScope.$on('appgetewayApp:vinculoUpdate', function(event, result) {
            vm.vinculo = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
