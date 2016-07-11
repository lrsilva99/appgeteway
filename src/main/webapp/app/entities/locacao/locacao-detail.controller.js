(function() {
    'use strict';

    angular
        .module('appgetewayApp')
        .controller('LocacaoDetailController', LocacaoDetailController);

    LocacaoDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Locacao'];

    function LocacaoDetailController($scope, $rootScope, $stateParams, entity, Locacao) {
        var vm = this;

        vm.locacao = entity;

        var unsubscribe = $rootScope.$on('appgetewayApp:locacaoUpdate', function(event, result) {
            vm.locacao = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
