app.controller("RegisterController", ["$scope", "$location", "TownsResource", "AccountService", "NotificationService",
    function ($scope, $location, TownsResource, AccountService, NotificationService) {
        $scope.userData = {
            townId: null
        };

        $scope.towns = TownsResource.all();

        $scope.register = function (userData) {
            if (userData.password != userData.confirmPassword) {
                NotificationService.displayErrorMessage("The passwords do not match.");
                return;
            }

            AccountService.register(userData, function (data) {
                NotificationService.displaySuccessMessage("Registration successful.");
                $location.path("#/");
            }, function (error) {
                NotificationService.displayErrorMessage("Registration unsuccessful", error);
            });
        }
    }]);