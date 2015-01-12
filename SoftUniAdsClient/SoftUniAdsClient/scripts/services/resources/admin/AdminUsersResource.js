app.factory("AdminUsersResource", ["$resource", "baseUrl", "AccountService", function ($resource, baseUrl, AccountService) {
    var adsAdminResource = $resource(baseUrl + "admin/users/:username", null, {
        "all": {
            method: "GET",
            headers: AccountService.getAuthHeaders()
        }
    });

    return adsAdminResource;
}]);
