app.controller("LeftSidebarController", ["$scope", "$rootScope", function ($scope, $rootScope) {
    $scope.status = null;
    $scope.selectMyAdsStatus = function (status) {
        $scope.status = status;
        $rootScope.$broadcast("statusFilterChanged", status);
    };
}]);