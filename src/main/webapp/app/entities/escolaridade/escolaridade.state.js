(function() {
    'use strict';

    angular
        .module('appgetewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('escolaridade', {
            parent: 'entity',
            url: '/escolaridade',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'appgetewayApp.escolaridade.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/escolaridade/escolaridades.html',
                    controller: 'EscolaridadeController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('escolaridade');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('escolaridade-detail', {
            parent: 'entity',
            url: '/escolaridade/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'appgetewayApp.escolaridade.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/escolaridade/escolaridade-detail.html',
                    controller: 'EscolaridadeDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('escolaridade');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Escolaridade', function($stateParams, Escolaridade) {
                    return Escolaridade.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        .state('escolaridade.new', {
            parent: 'escolaridade',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/escolaridade/escolaridade-dialog.html',
                    controller: 'EscolaridadeDialogController',
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
                    $state.go('escolaridade', null, { reload: true });
                }, function() {
                    $state.go('escolaridade');
                });
            }]
        })
        .state('escolaridade.edit', {
            parent: 'escolaridade',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/escolaridade/escolaridade-dialog.html',
                    controller: 'EscolaridadeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Escolaridade', function(Escolaridade) {
                            return Escolaridade.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('escolaridade', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('escolaridade.delete', {
            parent: 'escolaridade',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/escolaridade/escolaridade-delete-dialog.html',
                    controller: 'EscolaridadeDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Escolaridade', function(Escolaridade) {
                            return Escolaridade.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('escolaridade', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
