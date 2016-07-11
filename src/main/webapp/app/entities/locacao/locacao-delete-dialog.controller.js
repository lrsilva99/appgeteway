(function() {
    'use strict';

    angular
        .module('appgetewayApp')
        .controller('LocacaoDeleteController',LocacaoDeleteController);

    LocacaoDeleteController.$inject = ['$uibModalInstance', 'entity', 'Locacao'];

    function LocacaoDeleteController($uibModalInstance, entity, Locacao) {
        var vm = this;

        vm.locacao = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Locacao.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
