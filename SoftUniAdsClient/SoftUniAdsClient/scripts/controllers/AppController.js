app.controller("AppController", ["$scope", "$route", "$location", "AccountService", "NotificationService",
    function ($scope, $route, $location, AccountService, NotificationService) {
        $scope.$route = $route;
        $scope.AccountService = AccountService;

        $scope.logout = function () {
            AccountService.logout();
            NotificationService.displaySuccessMessage("Logout successful.");
            $location.path("#/");
        }
    }]);