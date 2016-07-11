(function() {
    'use strict';

    angular
        .module('appgetewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('vinculo', {
            parent: 'entity',
            url: '/vinculo',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'appgetewayApp.vinculo.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/vinculo/vinculos.html',
                    controller: 'VinculoController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('vinculo');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('vinculo-detail', {
            parent: 'entity',
            url: '/vinculo/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'appgetewayApp.vinculo.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/vinculo/vinculo-detail.html',
                    controller: 'VinculoDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('vinculo');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Vinculo', function($stateParams, Vinculo) {
                    return Vinculo.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        .state('vinculo.new', {
            parent: 'vinculo',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/vinculo/vinculo-dialog.html',
                    controller: 'VinculoDialogController',
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
                    $state.go('vinculo', null, { reload: true });
                }, function() {
                    $state.go('vinculo');
                });
            }]
        })
        .state('vinculo.edit', {
            parent: 'vinculo',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/vinculo/vinculo-dialog.html',
                    controller: 'VinculoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Vinculo', function(Vinculo) {
                            return Vinculo.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('vinculo', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('vinculo.delete', {
            parent: 'vinculo',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/vinculo/vinculo-delete-dialog.html',
                    controller: 'VinculoDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Vinculo', function(Vinculo) {
                            return Vinculo.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('vinculo', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
