app.controller("AdminUsersController", ["$scope", "$timeout", "$routeParams", "$location", "AdminUsersResource", "TownsResource", "NotificationService",
    function ($scope, $timeout, $routeParams, $location, AdminUsersResource, TownsResource, NotificationService) {
        $scope.parameters = {
            startPage: 1,
            pageSize: 5,
            sortBy: "UserName"
        };

        $scope.towns = TownsResource.all();

        $scope.getUsers = function () {
            AdminUsersResource.all($scope.parameters, function (data) {
                $scope.usersInfo = data;
            });
        };

        $scope.getUsers();

        $scope.currentUserId = $routeParams.id;

        $scope.editUser = {
            townId: null
        };

        $scope.changeSortBy = function (column) {
            $scope.parameters.sortBy = column;
            $scope.getUsers();
        }

        if ($scope.currentUserId) {
            AdminUsersResource.all({ id: $scope.currentUserId },
                function (data) {
                    $scope.editUser = data;
                });
        }


        $scope.updateProfile = function () {
            AdminUsersResource.updateProfile($scope.editUser, function (data) {
                NotificationService.displaySuccessMessage("The user has been edited successfully.");
                $timeout(function () {
                    $location.path("/admin/users");
                }, 5000);
            }, function (error) {
                NotificationService.displayErrorMessage("The user could not be edited", error);
            });
        };

        $scope.updatePassword = function () {
            if ($scope.editPassword.newPassword != $scope.editPassword.confirmPassword) {
                NotificationService.displayErrorMessage("The new passwords do not match.");
                return;
            }

            $scope.editPassword.username = $scope.editUser.userName;
            AdminUsersResource.updatePassword($scope.editPassword, function (data) {
                NotificationService.displaySuccessMessage("The password was edited successfully.");
                $timeout(function () {
                    $location.path("/admin/users");
                }, 5000);
            }, function (error) {
                NotificationService.displayErrorMessage("The password could not be edited", error);
            });
        };

        $scope.deleteUser = function () {
            AdminUsersResource.delete({ username: $scope.editUser.userName }, function (data) {
                NotificationService.displaySuccessMessage("The user was deleted successfully.");
                $timeout(function () {
                    $location.path("/admin/users");
                }, 5000);
            }, function (error) {
                NotificationService.displayErrorMessage("The user could not be deleted", error);
            });
        };

        $scope.cancel = function () {
            $location.path("/admin/users");
        }
    }]);