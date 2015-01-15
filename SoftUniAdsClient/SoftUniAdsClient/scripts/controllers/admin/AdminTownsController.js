app.controller("AdminTownsController", ["$scope", "$timeout", "$routeParams", "$location", "AdminTownsResource", "NotificationService",
    function ($scope, $timeout, $routeParams, $location, AdminTownsResource, NotificationService) {
        $scope.parameters = {
            startPage: 1,
            pageSize: 5,
            sortBy: "Id"
        };

        $scope.getTowns = function () {
            AdminTownsResource.all($scope.parameters, function (data) {
                $scope.townsInfo = data;
            });
        };

        $scope.getTowns();

        $scope.currentTownId = $routeParams.id;

        $scope.changeSortBy = function (column) {
            $scope.parameters.sortBy = column;
            $scope.getTowns();
        }

        if ($scope.currentTownId) {
            AdminTownsResource.all({ id: $scope.currentTownId },
                function (data) {
                    $scope.editTown = data;
                });
        }

        $scope.createTown = function () {
            AdminTownsResource.create($scope.newTown, function (data) {
                NotificationService.displaySuccessMessage("The town has been created successfully.");
                $timeout(function () {
                    $location.path("/admin/towns");
                }, 5000);
            }, function (error) {
                NotificationService.displayErrorMessage("The town could not be created", error);
            });
        };

        $scope.updateTown = function () {
            AdminTownsResource.update($scope.editTown, function (data) {
                NotificationService.displaySuccessMessage("The town has been edited successfully.");
                $timeout(function () {
                    $location.path("/admin/towns");
                }, 5000);
            }, function (error) {
                NotificationService.displayErrorMessage("The town could not be edited", error);
            });
        };

        $scope.deleteTown = function () {
            AdminTownsResource.delete($scope.editTown, function (data) {
                NotificationService.displaySuccessMessage("The town was deleted successfully.");
                $timeout(function () {
                    $location.path("/admin/towns");
                }, 5000);
            }, function (error) {
                NotificationService.displayErrorMessage("The town could not be deleted", error);
            });
        };

        $scope.cancel = function () {
            $location.path("/admin/towns");
        }
    }]);