(function() {
    'use strict';
    angular
        .module('appgetewayApp')
        .factory('Vinculo', Vinculo);

    Vinculo.$inject = ['$resource'];

    function Vinculo ($resource) {
        var resourceUrl =  'rh/' + 'api/vinculos/:id';

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
