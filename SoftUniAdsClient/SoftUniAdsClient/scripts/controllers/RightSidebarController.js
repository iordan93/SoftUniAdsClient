app.controller("RightSidebarController", ["$scope", "$rootScope", "CategoriesResource", "TownsResource",
    function ($scope, $rootScope, CategoriesResource, TownsResource) {
        $scope.categories = CategoriesResource.all();
        $scope.selectedCategoryId = null;
        $scope.selectCategory = function (id) {
            $scope.selectedCategoryId = id;
        };

        $scope.towns = TownsResource.all();
         $scope.selectedTownId = null;
        $scope.selectTown = function (id) {
            $scope.selectedTownId = id;
        };
}]);