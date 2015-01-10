app.controller("RegisterController", ["$scope", "TownsResource", "AccountService", "NotificationService",
    function ($scope, TownsResource, AccountService, NotificationService) {
    $scope.towns = TownsResource.all();

    $scope.register = function (userData) {
        if (userData.password != userData.confirmPassword) {
            NotificationService.displayErrorMessage("The passwords do not match.");
            return;
        }

        userData.townId = userData.town.id;
        AccountService.register(userData, function (data) {
            debugger;
            NotificationService.displaySuccessMessage("Registration successful.");
            $location.path("/");
        }, function (error) {
            NotificationService.displayErrorMessage("Registration unsuccessful", error);
        });
    }
}]);