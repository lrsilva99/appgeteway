(function() {
    'use strict';
    angular
        .module('appgetewayApp')
        .factory('Locacao', Locacao);

    Locacao.$inject = ['$resource'];

    function Locacao ($resource) {
        var resourceUrl =  'rh/' + 'api/locacaos/:id';

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
