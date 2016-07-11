(function() {
    'use strict';

    angular
        .module('appgetewayApp')
        .factory('CargoSearch', CargoSearch);

    CargoSearch.$inject = ['$resource'];

    function CargoSearch($resource) {
        var resourceUrl =  'rh/' + 'api/_search/cargos/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
