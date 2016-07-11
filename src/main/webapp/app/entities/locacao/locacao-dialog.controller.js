(function() {
    'use strict';

    angular
        .module('appgetewayApp')
        .controller('LocacaoDialogController', LocacaoDialogController);

    LocacaoDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Locacao'];

    function LocacaoDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Locacao) {
        var vm = this;

        vm.locacao = entity;
        vm.clear = clear;
        vm.save = save;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.locacao.id !== null) {
                Locacao.update(vm.locacao, onSaveSuccess, onSaveError);
            } else {
                Locacao.save(vm.locacao, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('appgetewayApp:locacaoUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
