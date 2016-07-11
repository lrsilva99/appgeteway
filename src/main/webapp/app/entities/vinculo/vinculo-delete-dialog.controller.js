(function() {
    'use strict';

    angular
        .module('appgetewayApp')
        .controller('VinculoDeleteController',VinculoDeleteController);

    VinculoDeleteController.$inject = ['$uibModalInstance', 'entity', 'Vinculo'];

    function VinculoDeleteController($uibModalInstance, entity, Vinculo) {
        var vm = this;

        vm.vinculo = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Vinculo.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
