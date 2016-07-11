(function() {
    'use strict';

    angular
        .module('appgetewayApp')
        .factory('LocacaoSearch', LocacaoSearch);

    LocacaoSearch.$inject = ['$resource'];

    function LocacaoSearch($resource) {
        var resourceUrl =  'rh/' + 'api/_search/locacaos/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
