app.factory("AdsResource", ["$resource", "baseUrl", function ($resource, baseUrl) {
    var adsResource = $resource(baseUrl + "api/ads", null, {
        "all": {
            method: "GET"
        }
    });

    return {
        all: function () {
            return adsResource.all();
        }
    };
}]);
