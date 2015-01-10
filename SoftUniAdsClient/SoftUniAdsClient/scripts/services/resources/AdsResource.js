app.factory("AdsResource", ["$resource", "baseUrl", "AccountService", function ($resource, baseUrl, AccountService) {
    var adsResource = $resource(baseUrl + "ads/", null, {
        "all": {
            method: "GET",
            transformResponse: transformResponse
        }
    });

    var adsUserResource = $resource(baseUrl + "user/ads/:id", null, {
        "publish": {
            method: "POST",
            headers: AccountService.getAuthHeaders()
        },
        "myAds": {
            method: "GET",
            headers: AccountService.getAuthHeaders(),
            transformResponse: transformResponse
        },
        "deactivate": {
            method: "PUT",
            url: baseUrl + "user/ads/deactivate/:id",
            params: { id: "@id" },
            headers: AccountService.getAuthHeaders()
        },
        "update": {
            method: "PUT",
            params: { id: "@id" },
            headers: AccountService.getAuthHeaders()
        },
        "delete": {
            method: "DELETE",
            params: { id: "@id" },
            headers: AccountService.getAuthHeaders()
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
            return adsResource.all(params, success, error);
        },
        publish: function (ad, success, error) {
            return adsUserResource.publish(ad, success, error);
        },
        myAds: function (params, success, error) {
            return adsUserResource.myAds(params, success, error);
        },
        deactivateAd: function (id, success, error) {
            return adsUserResource.deactivate({ id: id }, success, error);
        },
        updateAd: function (ad, success, error) {
            return adsUserResource.update(ad, success, error);
        },
        deleteAd: function (ad, success, error) {
            return adsUserResource.delete(ad, success, error);
        }
    };
}]);
