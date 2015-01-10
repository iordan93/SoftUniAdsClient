app.controller("AppController", ["$scope", "AccountService", "NotificationService", function ($scope, AccountService, NotificationService) {
    $scope.AccountService = AccountService;
    $scope.isAnonymous = AccountService.isAnonymous();
}]);