(function() {
    'use strict';

    angular
        .module('appgetewayApp')
        .controller('VinculoDialogController', VinculoDialogController);

    VinculoDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Vinculo'];

    function VinculoDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Vinculo) {
        var vm = this;

        vm.vinculo = entity;
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
            if (vm.vinculo.id !== null) {
                Vinculo.update(vm.vinculo, onSaveSuccess, onSaveError);
            } else {
                Vinculo.save(vm.vinculo, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('appgetewayApp:vinculoUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
