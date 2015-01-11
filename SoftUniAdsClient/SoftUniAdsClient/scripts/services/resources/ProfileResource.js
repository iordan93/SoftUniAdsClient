app.factory("ProfileResource", ["$resource", "baseUrl", "AccountService", function ($resource, baseUrl, AccountService) {
    var profileResource = $resource(baseUrl + "user/profile/", null, {
        "profile": {
            method: "GET",
            headers: AccountService.getAuthHeaders()
        },
        "update": {
            method: "PUT",
            headers: AccountService.getAuthHeaders()
        },
        "updatePassword": {
            method: "PUT",
            url: baseUrl + "user/changePassword",
            headers: AccountService.getAuthHeaders()
        }
    });

    return {
        profile: function (success, error) {
            return profileResource.profile(success, error);
        },
        update: function (profile, success, error) {
            return profileResource.update(profile, success, error);
        },
        updatePassword: function (passwordData, success, error) {
            return profileResource.updatePassword(passwordData, success, error);
        }
    };
}]);
