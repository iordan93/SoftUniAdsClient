app.controller("UserAdsController",
    ["$scope", "$location", "$timeout", "$routeParams", "CategoriesResource", "TownsResource", "AdsResource", "AccountService", "NotificationService",
    function ($scope, $location, $timeout, $routeParams, CategoriesResource, TownsResource, AdsResource, AccountService, NotificationService) {
        $scope.categories = CategoriesResource.all();
        $scope.towns = TownsResource.all();
        $scope.parameters = {
            startPage: 1,
            pageSize: 2
        };

        $scope.currentAdId = $routeParams.id;

        $scope.editAd = {
            categoryId: null,
            townId: null
        };

        if ($scope.currentAdId) {
            AdsResource.myAds({ id: $scope.currentAdId },
                function (data) {
                    $scope.editAd = data;
                });
        }

        $scope.removeImage = function () {
            $scope.editAd.changeImage = true;
            $scope.editAd.imageDataUrl = null;
            $(".image-box").html();
            NotificationService.displaySuccessMessage("The image will be removed after the ad has been saved.");
        }

        $scope.updateAd = function (editAd) {
            if (editAd.imageDataUrl == "images/no-photo.png") {
                editAd.imageDataUrl = null;
            }

            AdsResource.updateAd(editAd, function (data) {
                NotificationService.displaySuccessMessage("Ad edited successfully. Don't forget to submit it for publishing.");
                $timeout(function () {
                    $location.path("/user/ads");
                }, 5000);
            }, function (error) {
                NotificationService.displayErrorMessage("Ad could not be edited", error);
            });
        }

        $scope.getMyAds = function () {
            AdsResource.myAds($scope.parameters,
                function (data) {
                    $scope.adsInfo = data;
                });
        }

        $scope.getMyAds();

        $scope.newAd = {
            townId: null,
            categoryId: null
        };

        $scope.publishAd = function () {
            AdsResource.publish($scope.newAd, function (data) {
                NotificationService.displaySuccessMessage("Advertisement submitted for approval. Once approved by an administrator, it will be published.");
                $timeout(function () {
                    $location.path("/user/ads");
                }, 5000);
            }, function (error) {
                NotificationService.displayErrorMessage("Advertisement could not be published", error);
            });
        };

        $scope.fileSelected = function (fileInputField, edit) {
            var file = fileInputField.files[0];
            if (file.type.match(/image\/.*/)) {
                var reader = new FileReader();
                reader.onload = function () {
                    if (edit) {
                        $scope.editAd.changeImage = true;
                        $scope.editAd.imageDataUrl = reader.result;
                    }
                    else {
                        $scope.newAd.imageDataUrl = reader.result;
                    }

                    $scope.$apply();
                    $(".image-box").html("<img src='" + reader.result + "'>");
                };

                reader.readAsDataURL(file);
            } else {
                $(".image-box").html("<p>File type not supported!</p>");
            }
        };


        $scope.cancel = function () {
            $location.path("/user/ads");
        };

        $scope.deactivateAd = function (id) {
            AdsResource.deactivateAd(id, function (data) {
                NotificationService.displaySuccessMessage("Advertisement deactivated successfully.");
                $scope.getMyAds();
            }, function (error) {
                NotificationService.displaySuccessMessage("Advertisement could not be deactivated.");
                $scope.getMyAds();
            });
        }
    }]);