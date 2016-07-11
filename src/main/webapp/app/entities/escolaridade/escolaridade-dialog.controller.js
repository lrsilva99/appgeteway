(function() {
    'use strict';

    angular
        .module('appgetewayApp')
        .controller('EscolaridadeDialogController', EscolaridadeDialogController);

    EscolaridadeDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Escolaridade'];

    function EscolaridadeDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Escolaridade) {
        var vm = this;

        vm.escolaridade = entity;
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
            if (vm.escolaridade.id !== null) {
                Escolaridade.update(vm.escolaridade, onSaveSuccess, onSaveError);
            } else {
                Escolaridade.save(vm.escolaridade, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('appgetewayApp:escolaridadeUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
