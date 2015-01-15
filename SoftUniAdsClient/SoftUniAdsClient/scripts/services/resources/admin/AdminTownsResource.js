app.factory("AdminTownsResource", ["$resource", "baseUrl", "AccountService", function ($resource, baseUrl, AccountService) {
    var townsAdminResource = $resource(baseUrl + "admin/towns/:id", null, {
        "all": {
            method: "GET",
            headers: AccountService.getAuthHeaders()
        },
        "create": {
            method: "POST",
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

    return townsAdminResource;
}]);
