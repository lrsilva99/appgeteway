(function() {
    'use strict';

    angular
        .module('appgetewayApp')
        .controller('EscolaridadeDeleteController',EscolaridadeDeleteController);

    EscolaridadeDeleteController.$inject = ['$uibModalInstance', 'entity', 'Escolaridade'];

    function EscolaridadeDeleteController($uibModalInstance, entity, Escolaridade) {
        var vm = this;

        vm.escolaridade = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Escolaridade.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
