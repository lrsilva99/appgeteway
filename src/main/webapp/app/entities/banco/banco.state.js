(function() {
    'use strict';

    angular
        .module('appgetewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('banco', {
            parent: 'entity',
            url: '/banco',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'appgetewayApp.banco.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/banco/bancos.html',
                    controller: 'BancoController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('banco');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('banco-detail', {
            parent: 'entity',
            url: '/banco/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'appgetewayApp.banco.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/banco/banco-detail.html',
                    controller: 'BancoDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('banco');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Banco', function($stateParams, Banco) {
                    return Banco.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        .state('banco.new', {
            parent: 'banco',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/banco/banco-dialog.html',
                    controller: 'BancoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                codigo: null,
                                nome: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('banco', null, { reload: true });
                }, function() {
                    $state.go('banco');
                });
            }]
        })
        .state('banco.edit', {
            parent: 'banco',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/banco/banco-dialog.html',
                    controller: 'BancoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Banco', function(Banco) {
                            return Banco.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('banco', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('banco.delete', {
            parent: 'banco',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/banco/banco-delete-dialog.html',
                    controller: 'BancoDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Banco', function(Banco) {
                            return Banco.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('banco', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
