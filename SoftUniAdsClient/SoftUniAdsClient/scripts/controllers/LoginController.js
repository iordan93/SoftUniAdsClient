app.controller("LoginController", ["$scope", "AccountService", "NotificationService", "$location",
    function ($scope, AccountService, NotificationService, $location) {
        $scope.login = function (userData) {
            AccountService.login(userData, function (data) {
                NotificationService.displaySuccessMessage("Login successful.");
                $location.path("/");
            }, function (error) {
                NotificationService.displayErrorMessage("Login unsuccessful", error);
            });
        }
    }]);