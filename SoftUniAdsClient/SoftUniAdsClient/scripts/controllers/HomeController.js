app.controller("HomeController", ["$scope", "$rootScope", "AdsResource", function ($scope, $rootScope, AdsResource) {
    $scope.parameters = {
        startPage: 1,
        pageSize: 2
    };

    $scope.getAds = function () {
        AdsResource.all($scope.parameters,
            function (data) {
                $scope.adsInfo = data;
            });
    }

    $rootScope.$on("categoryFilterChanged", function (event, categoryId) {
        $scope.parameters.categoryId = categoryId;
        $scope.parameters.startPage = 1;
        $scope.getAds();
    });

    $rootScope.$on("townFilterChanged", function (event, townId) {
        $scope.parameters.townId = townId;
        $scope.parameters.startPage = 1;
        $scope.getAds();
    });

    $scope.getAds();
}]);