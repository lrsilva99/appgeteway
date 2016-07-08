(function() {
    'use strict';

    angular
        .module('appgetewayApp')
        .controller('InstituicaoDialogController', InstituicaoDialogController);

    InstituicaoDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Instituicao'];

    function InstituicaoDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Instituicao) {
        var vm = this;

        vm.instituicao = entity;
        vm.clear = clear;
        vm.save = save;
        vm.instituicaos = Instituicao.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.instituicao.id !== null) {
                Instituicao.update(vm.instituicao, onSaveSuccess, onSaveError);
            } else {
                Instituicao.save(vm.instituicao, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('appgetewayApp:instituicaoUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
