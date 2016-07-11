(function() {
    'use strict';

    angular
        .module('appgetewayApp')
        .controller('FormacaoDialogController', FormacaoDialogController);

    FormacaoDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Formacao'];

    function FormacaoDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Formacao) {
        var vm = this;

        vm.formacao = entity;
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
            if (vm.formacao.id !== null) {
                Formacao.update(vm.formacao, onSaveSuccess, onSaveError);
            } else {
                Formacao.save(vm.formacao, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('appgetewayApp:formacaoUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
