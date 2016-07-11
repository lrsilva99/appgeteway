(function() {
    'use strict';

    angular
        .module('appgetewayApp')
        .controller('FormacaoDeleteController',FormacaoDeleteController);

    FormacaoDeleteController.$inject = ['$uibModalInstance', 'entity', 'Formacao'];

    function FormacaoDeleteController($uibModalInstance, entity, Formacao) {
        var vm = this;

        vm.formacao = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Formacao.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
