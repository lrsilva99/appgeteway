(function() {
    'use strict';
    angular
        .module('appgetewayApp')
        .factory('Escolaridade', Escolaridade);

    Escolaridade.$inject = ['$resource'];

    function Escolaridade ($resource) {
        var resourceUrl =  'rh/' + 'api/escolaridades/:id';

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
