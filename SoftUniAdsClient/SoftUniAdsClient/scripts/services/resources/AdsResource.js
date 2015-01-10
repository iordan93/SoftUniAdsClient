app.factory("AdsResource", ["$resource", "baseUrl", "AccountService", function ($resource, baseUrl, AccountService) {
    var adsResource = $resource(baseUrl + "ads/", null, {
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

    var adsUserResource = $resource(baseUrl + "user/ads/:id", null, {
        "publish": {
            method: "POST",
            headers: AccountService.getAuthHeaders()
        }
    });

    return {
        all: function (params, success, error) {
            return adsResource.all(params, success, error);
        },
        publish: function (ad, success, error) {
            return adsUserResource.publish(ad, success, error);
        }
    };
}]);
