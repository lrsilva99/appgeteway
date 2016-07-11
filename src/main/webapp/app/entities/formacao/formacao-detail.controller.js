(function() {
    'use strict';

    angular
        .module('appgetewayApp')
        .controller('FormacaoDetailController', FormacaoDetailController);

    FormacaoDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Formacao'];

    function FormacaoDetailController($scope, $rootScope, $stateParams, entity, Formacao) {
        var vm = this;

        vm.formacao = entity;

        var unsubscribe = $rootScope.$on('appgetewayApp:formacaoUpdate', function(event, result) {
            vm.formacao = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
