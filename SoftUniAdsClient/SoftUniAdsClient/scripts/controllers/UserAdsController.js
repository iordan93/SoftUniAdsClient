app.controller("UserAdsController", ["$scope", "$location", "$timeout", "CategoriesResource", "TownsResource", "AdsResource", "AccountService", "NotificationService",
    function ($scope, $location, $timeout, CategoriesResource, TownsResource, AdsResource, AccountService, NotificationService) {
        $scope.categories = CategoriesResource.all();
        $scope.towns = TownsResource.all();
        $scope.newAd = {
            townId: null,
            categoryId: null
        };

        $scope.publishAd = function () {
            AdsResource.publish($scope.newAd, function (data) {
                NotificationService.displaySuccessMessage("Advertisement submitted for approval. Once approved by an administrator, it will be published.");
                $timeout(function () {
                    $location.path("#/");
                }, 5000);
            }, function (error) {
                NotificationService.displayErrorMessage("Advertisement could not be published", error);
            });
        };

        $scope.cancel = function () {
            $location.path("#/");
        }
    }]);