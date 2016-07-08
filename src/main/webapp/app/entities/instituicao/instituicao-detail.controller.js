(function() {
    'use strict';

    angular
        .module('appgetewayApp')
        .controller('InstituicaoDetailController', InstituicaoDetailController);

    InstituicaoDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Instituicao'];

    function InstituicaoDetailController($scope, $rootScope, $stateParams, entity, Instituicao) {
        var vm = this;

        vm.instituicao = entity;

        var unsubscribe = $rootScope.$on('appgetewayApp:instituicaoUpdate', function(event, result) {
            vm.instituicao = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
