(function() {
    'use strict';

    angular
        .module('appgetewayApp')
        .factory('EscolaridadeSearch', EscolaridadeSearch);

    EscolaridadeSearch.$inject = ['$resource'];

    function EscolaridadeSearch($resource) {
        var resourceUrl =  'rh/' + 'api/_search/escolaridades/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
