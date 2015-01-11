app.factory("AdminAdsResource", ["$resource", "baseUrl", "AccountService", function ($resource, baseUrl, AccountService) {
    var adsAdminResource = $resource(baseUrl + "admin/ads/:id", null, {
        "all": {
            method: "GET",
            headers: AccountService.getAuthHeaders(),
            transformResponse: transformResponse
        }
    });

    function transformResponse(data, headers) {
        data = angular.fromJson(data);
        if (data.ads) {
            angular.forEach(data.ads, function (ad) {
                ad.imageDataUrl = ad.imageDataUrl || "images/no-photo.png";
            });
        }
        else {
            data.imageDataUrl = data.imageDataUrl || "images/no-photo.png";
        }

        return data;
    }

    return {
        all: function (params, success, error) {
            return adsAdminResource.all(params, success, error)
        }
    };
}]);
