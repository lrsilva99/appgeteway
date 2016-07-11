(function() {
    'use strict';

    angular
        .module('appgetewayApp')
        .factory('BancoSearch', BancoSearch);

    BancoSearch.$inject = ['$resource'];

    function BancoSearch($resource) {
        var resourceUrl =  'rh/' + 'api/_search/bancos/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
