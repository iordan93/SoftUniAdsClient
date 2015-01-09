app.factory("CategoriesResource", ["$resource", "baseUrl", function ($resource, baseUrl) {
    var categoriesResource = $resource(baseUrl + "categories");

    return {
        all: function (success, error) {
            return categoriesResource.query(success, error);
        }
    };
}]);