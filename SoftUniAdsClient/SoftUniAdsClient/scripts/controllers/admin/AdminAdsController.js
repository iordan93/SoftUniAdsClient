app.controller("AdminAdsController", ["$scope", "$rootScope", "AdminAdsResource", function ($scope, $rootScope, AdminAdsResource) {
    $scope.parameters = {
        startPage: 1,
        pageSize: 2
    };

    $scope.getAds = function () {
        AdminAdsResource.all($scope.parameters,
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