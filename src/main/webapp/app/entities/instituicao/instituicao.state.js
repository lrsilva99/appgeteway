(function() {
    'use strict';

    angular
        .module('appgetewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('instituicao', {
            parent: 'entity',
            url: '/instituicao',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'appgetewayApp.instituicao.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/instituicao/instituicaos.html',
                    controller: 'InstituicaoController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('instituicao');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('instituicao-detail', {
            parent: 'entity',
            url: '/instituicao/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'appgetewayApp.instituicao.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/instituicao/instituicao-detail.html',
                    controller: 'InstituicaoDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('instituicao');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Instituicao', function($stateParams, Instituicao) {
                    return Instituicao.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        .state('instituicao.new', {
            parent: 'instituicao',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/instituicao/instituicao-dialog.html',
                    controller: 'InstituicaoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                sigla: null,
                                nome: null,
                                email: null,
                                telefone: null,
                                endereco: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('instituicao', null, { reload: true });
                }, function() {
                    $state.go('instituicao');
                });
            }]
        })
        .state('instituicao.edit', {
            parent: 'instituicao',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/instituicao/instituicao-dialog.html',
                    controller: 'InstituicaoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Instituicao', function(Instituicao) {
                            return Instituicao.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('instituicao', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('instituicao.delete', {
            parent: 'instituicao',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/instituicao/instituicao-delete-dialog.html',
                    controller: 'InstituicaoDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Instituicao', function(Instituicao) {
                            return Instituicao.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('instituicao', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
