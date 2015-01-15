app.factory("AdminCategoriesResource", ["$resource", "baseUrl", "AccountService", function ($resource, baseUrl, AccountService) {
    var categoriesAdminResource = $resource(baseUrl + "admin/categories/:id", null, {
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

    return categoriesAdminResource;
}]);
