app.factory("AdminAdsResource", ["$resource", "baseUrl", "AccountService", function ($resource, baseUrl, AccountService) {
    var adsAdminResource = $resource(baseUrl + "admin/ads/:id", null, {
        "all": {
            method: "GET",
            headers: AccountService.getAuthHeaders(),
            transformResponse: transformResponse
        },
        "approveAd": {
            method: "PUT",
            url: baseUrl + "admin/ads/approve/:id",
            params: { id: "@id" },
            headers: AccountService.getAuthHeaders()
        },
        "rejectAd": {
            method: "PUT",
            url: baseUrl + "admin/ads/reject/:id",
            params: { id: "@id" },
            headers: AccountService.getAuthHeaders()
        },
        "updateAd": {
            method: "PUT",
            params: { id: "@id" },
            headers: AccountService.getAuthHeaders()
        },
        "deleteAd": {
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

    return adsAdminResource;
}]);
