app.controller("RightSidebarController", ["$scope", "$rootScope", "CategoriesResource", "TownsResource",
    function ($scope, $rootScope, CategoriesResource, TownsResource) {
        $scope.categories = CategoriesResource.all();
        $scope.towns = TownsResource.all();
}]);