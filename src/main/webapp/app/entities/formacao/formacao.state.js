(function() {
    'use strict';

    angular
        .module('appgetewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('formacao', {
            parent: 'entity',
            url: '/formacao',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'appgetewayApp.formacao.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/formacao/formacaos.html',
                    controller: 'FormacaoController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('formacao');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('formacao-detail', {
            parent: 'entity',
            url: '/formacao/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'appgetewayApp.formacao.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/formacao/formacao-detail.html',
                    controller: 'FormacaoDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('formacao');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Formacao', function($stateParams, Formacao) {
                    return Formacao.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        .state('formacao.new', {
            parent: 'formacao',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/formacao/formacao-dialog.html',
                    controller: 'FormacaoDialogController',
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
                    $state.go('formacao', null, { reload: true });
                }, function() {
                    $state.go('formacao');
                });
            }]
        })
        .state('formacao.edit', {
            parent: 'formacao',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/formacao/formacao-dialog.html',
                    controller: 'FormacaoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Formacao', function(Formacao) {
                            return Formacao.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('formacao', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('formacao.delete', {
            parent: 'formacao',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/formacao/formacao-delete-dialog.html',
                    controller: 'FormacaoDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Formacao', function(Formacao) {
                            return Formacao.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('formacao', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
