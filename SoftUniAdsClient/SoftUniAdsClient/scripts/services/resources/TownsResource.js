app.factory("TownsResource", ["$resource", "baseUrl", function ($resource, baseUrl) {
    var townsResource = $resource(baseUrl + "towns");

    return {
        all: function (success, error) {
            return townsResource.query(success, error);
        }
    };
}]);