(function() {
    'use strict';
    angular
        .module('appgetewayApp')
        .factory('Cargo', Cargo);

    Cargo.$inject = ['$resource'];

    function Cargo ($resource) {
        var resourceUrl =  'rh/' + 'api/cargos/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
