app.factory("AdsResource", ["$resource", "baseUrl", function ($resource, baseUrl) {
    var adsResource = $resource(baseUrl + "ads", null, {
        "all": {
            method: "GET",
            transformResponse: function (data, headers) {
                data = angular.fromJson(data);
                angular.forEach(data.ads, function (ad) {
                    ad.imageDataUrl = ad.imageDataUrl || "images/no-photo.png";
                });

                return data;
            }
        }
    });

    return {
        all: function (params, success, error) {
            return adsResource.all(params, success, error);
        }
    };
}]);
