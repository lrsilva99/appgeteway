(function() {
    'use strict';

    angular
        .module('appgetewayApp')
        .factory('InstituicaoSearch', InstituicaoSearch);

    InstituicaoSearch.$inject = ['$resource'];

    function InstituicaoSearch($resource) {
        var resourceUrl =  'rh/' + 'api/_search/instituicaos/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
