(function() {
    'use strict';

    angular
        .module('appgetewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('locacao', {
            parent: 'entity',
            url: '/locacao',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'appgetewayApp.locacao.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/locacao/locacaos.html',
                    controller: 'LocacaoController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('locacao');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('locacao-detail', {
            parent: 'entity',
            url: '/locacao/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'appgetewayApp.locacao.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/locacao/locacao-detail.html',
                    controller: 'LocacaoDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('locacao');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Locacao', function($stateParams, Locacao) {
                    return Locacao.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        .state('locacao.new', {
            parent: 'locacao',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/locacao/locacao-dialog.html',
                    controller: 'LocacaoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                nome: null,
                                descricao: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('locacao', null, { reload: true });
                }, function() {
                    $state.go('locacao');
                });
            }]
        })
        .state('locacao.edit', {
            parent: 'locacao',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/locacao/locacao-dialog.html',
                    controller: 'LocacaoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Locacao', function(Locacao) {
                            return Locacao.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('locacao', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('locacao.delete', {
            parent: 'locacao',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/locacao/locacao-delete-dialog.html',
                    controller: 'LocacaoDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Locacao', function(Locacao) {
                            return Locacao.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('locacao', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
