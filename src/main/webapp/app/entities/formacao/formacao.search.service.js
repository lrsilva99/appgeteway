(function() {
    'use strict';

    angular
        .module('appgetewayApp')
        .factory('FormacaoSearch', FormacaoSearch);

    FormacaoSearch.$inject = ['$resource'];

    function FormacaoSearch($resource) {
        var resourceUrl =  'rh/' + 'api/_search/formacaos/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
