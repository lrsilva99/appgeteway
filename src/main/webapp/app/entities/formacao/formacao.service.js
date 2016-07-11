(function() {
    'use strict';
    angular
        .module('appgetewayApp')
        .factory('Formacao', Formacao);

    Formacao.$inject = ['$resource'];

    function Formacao ($resource) {
        var resourceUrl =  'rh/' + 'api/formacaos/:id';

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
