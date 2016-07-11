(function() {
    'use strict';

    angular
        .module('appgetewayApp')
        .factory('VinculoSearch', VinculoSearch);

    VinculoSearch.$inject = ['$resource'];

    function VinculoSearch($resource) {
        var resourceUrl =  'rh/' + 'api/_search/vinculos/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
