app.factory("AdsResource", ["$resource", "baseUrl", function ($resource, baseUrl) {
    var adsResource = $resource(baseUrl + "api/ads", null, {
        "all": {
            method: "GET",
            transformResponse: function (data, headers) {
                data = angular.fromJson(data);
                angular.forEach(data.ads, function (ad) {
                    ad.imageDataUrl = ad.imageDataUrl || "http://placehold.it/150";
                });

                return data;
            }
        }
    });

    return {
        all: function () {
            return adsResource.all();
        }
    };
}]);
