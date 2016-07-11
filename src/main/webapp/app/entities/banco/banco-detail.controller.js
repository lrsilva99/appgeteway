(function() {
    'use strict';

    angular
        .module('appgetewayApp')
        .controller('BancoDetailController', BancoDetailController);

    BancoDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Banco'];

    function BancoDetailController($scope, $rootScope, $stateParams, entity, Banco) {
        var vm = this;

        vm.banco = entity;

        var unsubscribe = $rootScope.$on('appgetewayApp:bancoUpdate', function(event, result) {
            vm.banco = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
