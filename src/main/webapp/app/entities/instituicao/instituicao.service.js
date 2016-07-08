(function() {
    'use strict';
    angular
        .module('appgetewayApp')
        .factory('Instituicao', Instituicao);

    Instituicao.$inject = ['$resource'];

    function Instituicao ($resource) {
        var resourceUrl =  'rh/' + 'api/instituicaos/:id';

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
