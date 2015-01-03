app.controller("HomeController", ["$scope", "AdsResource", function ($scope, AdsResource) {
    $scope.adsInfo = AdsResource.all();
}]);