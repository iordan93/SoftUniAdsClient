app.factory("AdminUsersResource", ["$resource", "baseUrl", "AccountService", function ($resource, baseUrl, AccountService) {
    var adsAdminResource = $resource(baseUrl + "admin/users/:id", null, {
        "all": {
            method: "GET",
            headers: AccountService.getAuthHeaders()
        },
        "updateProfile": {
            method: "PUT",
            url: baseUrl + "admin/user/:username",
            params: { username: "@userName" },
            headers: AccountService.getAuthHeaders()
        },
        "updatePassword": {
            method: "PUT",
            url: baseUrl + "admin/setPassword",
            headers: AccountService.getAuthHeaders()
        },
        "delete": {
            method: "DELETE",
            url: baseUrl + "admin/user/:username",
            params: { username: "@username" },
            headers: AccountService.getAuthHeaders()
        }
    });

    return adsAdminResource;
}]);
