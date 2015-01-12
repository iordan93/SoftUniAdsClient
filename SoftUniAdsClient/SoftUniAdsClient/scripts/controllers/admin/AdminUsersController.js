app.controller("AdminUsersController", ["$scope", "$rootScope", "$routeParams", "$location", "AdminUsersResource", "TownsResource",
    function ($scope, $rootScope, $routeParams, $location, AdminUsersResource, TownsResource) {
        $scope.parameters = {
            startPage: 1,
            pageSize: 5
        };

        $scope.towns = TownsResource.all();

        $scope.getUsers = function () {
            AdminUsersResource.all($scope.parameters, function (data) {
                $scope.usersInfo = data;
            });
        };

        $scope.getUsers();

        $scope.editUser = function (user) {
            $rootScope.userData = user;
            $location.path("/admin/users/edit/" + user.id);
        };

        $scope.cancel = function () {
            $location.path("/");
        }
    }]);