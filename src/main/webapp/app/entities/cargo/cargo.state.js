(function() {
    'use strict';

    angular
        .module('appgetewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('cargo', {
            parent: 'entity',
            url: '/cargo?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'appgetewayApp.cargo.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/cargo/cargos.html',
                    controller: 'CargoController',
                    controllerAs: 'vm'
                }
            },
            params: {
                page: {
                    value: '1',
                    squash: true
                },
                sort: {
                    value: 'id,asc',
                    squash: true
                },
                search: null
            },
            resolve: {
                pagingParams: ['$stateParams', 'PaginationUtil', function ($stateParams, PaginationUtil) {
                    return {
                        page: PaginationUtil.parsePage($stateParams.page),
                        sort: $stateParams.sort,
                        predicate: PaginationUtil.parsePredicate($stateParams.sort),
                        ascending: PaginationUtil.parseAscending($stateParams.sort),
                        search: $stateParams.search
                    };
                }],
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('cargo');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('cargo-detail', {
            parent: 'entity',
            url: '/cargo/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'appgetewayApp.cargo.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/cargo/cargo-detail.html',
                    controller: 'CargoDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('cargo');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Cargo', function($stateParams, Cargo) {
                    return Cargo.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        .state('cargo.new', {
            parent: 'cargo',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/cargo/cargo-dialog.html',
                    controller: 'CargoDialogController',
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
                    $state.go('cargo', null, { reload: true });
                }, function() {
                    $state.go('cargo');
                });
            }]
        })
        .state('cargo.edit', {
            parent: 'cargo',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/cargo/cargo-dialog.html',
                    controller: 'CargoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Cargo', function(Cargo) {
                            return Cargo.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('cargo', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('cargo.delete', {
            parent: 'cargo',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/cargo/cargo-delete-dialog.html',
                    controller: 'CargoDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Cargo', function(Cargo) {
                            return Cargo.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('cargo', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
