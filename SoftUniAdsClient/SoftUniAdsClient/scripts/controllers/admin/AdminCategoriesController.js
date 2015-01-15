app.controller("AdminCategoriesController", ["$scope", "$timeout", "$routeParams", "$location", "AdminCategoriesResource", "NotificationService",
    function ($scope, $timeout, $routeParams, $location, AdminCategoriesResource, NotificationService) {
        $scope.parameters = {
            startPage: 1,
            pageSize: 5,
            sortBy: "Id"
        };

        $scope.getCategories = function () {
            AdminCategoriesResource.all($scope.parameters, function (data) {
                $scope.categoriesInfo = data;
            });
        };

        $scope.getCategories();

        $scope.currentCategoryId = $routeParams.id;

        $scope.changeSortBy = function (column) {
            $scope.parameters.sortBy = column;
            $scope.getCategories();
        }

        if ($scope.currentCategoryId) {
            AdminCategoriesResource.all({ id: $scope.currentCategoryId },
                function (data) {
                    $scope.editCategory = data;
                });
        }

        $scope.createCategory = function () {
            AdminCategoriesResource.create($scope.newCategory, function (data) {
                NotificationService.displaySuccessMessage("The category has been created successfully.");
                $timeout(function () {
                    $location.path("/admin/categories");
                }, 5000);
            }, function (error) {
                NotificationService.displayErrorMessage("The category could not be created", error);
            });
        };

        $scope.updateCategory = function () {
            AdminCategoriesResource.update($scope.editCategory, function (data) {
                NotificationService.displaySuccessMessage("The category has been edited successfully.");
                $timeout(function () {
                    $location.path("/admin/categories");
                }, 5000);
            }, function (error) {
                NotificationService.displayErrorMessage("The category could not be edited", error);
            });
        };

        $scope.deleteCategory = function () {
            AdminCategoriesResource.delete($scope.editCategory, function (data) {
                NotificationService.displaySuccessMessage("The category was deleted successfully.");
                $timeout(function () {
                    $location.path("/admin/categories");
                }, 5000);
            }, function (error) {
                NotificationService.displayErrorMessage("The category could not be deleted", error);
            });
        };

        $scope.cancel = function () {
            $location.path("/admin/categories");
        }
    }]);