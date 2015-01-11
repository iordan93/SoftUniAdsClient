app.controller("AdminAdsController",
    ["$scope", "$rootScope", "$location", "$timeout", "$routeParams", "AdminAdsResource", "NotificationService", "CategoriesResource", "TownsResource",
        function ($scope, $rootScope, $location, $timeout, $routeParams, AdminAdsResource, NotificationService, CategoriesResource, TownsResource) {
            $scope.categories = CategoriesResource.all();
            $scope.towns = TownsResource.all();

            $scope.parameters = {
                startPage: 1,
                pageSize: 2,
                status: null
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

            $rootScope.$on("statusFilterChanged", function (event, status) {
                $scope.parameters.status = status;
                $scope.parameters.startPage = 1;
                $scope.getAds();
            });

            $scope.getAds();

            $scope.approveAd = function (ad) {
                AdminAdsResource.approveAd(ad, function (data) {
                    NotificationService.displaySuccessMessage("The ad has been approved successfully.");
                    $scope.getAds();
                }, function (error) {
                    NotificationService.displayErrorMessage("The ad could not be approved", error);
                    $scope.getAds();
                });
            };

            $scope.rejectAd = function (ad) {
                AdminAdsResource.rejectAd(ad, function (data) {
                    NotificationService.displaySuccessMessage("The ad has been rejected successfully.");
                    $scope.getAds();
                }, function (error) {
                    NotificationService.displayErrorMessage("The ad could not be rejected", error);
                    $scope.getAds();
                });
            };

            $scope.cancel = function () {
                $location.path("/admin/ads");
            }

            $scope.currentAdId = $routeParams.id;

            $scope.editAd = {
                categoryId: null,
                townId: null
            };

            $scope.openDatepicker = function (e) {
                e.preventDefault();
                e.stopPropagation();
                $scope.datePickerOpened = true;
            }

            if ($scope.currentAdId) {
                AdminAdsResource.all({ id: $scope.currentAdId },
                    function (data) {
                        $scope.editAd = data;
                    });
            }

            $scope.removeImage = function () {
                $scope.editAd.changeImage = true;
                $scope.editAd.imageDataUrl = null;
                $(".image-box").html("");
                NotificationService.displaySuccessMessage("The image will be removed after the ad has been saved.");
            };

            $scope.updateAd = function (ad) {
                if (ad.imageDataUrl == "images/no-photo.png") {
                    ad.imageDataUrl = null;
                }

                AdminAdsResource.updateAd(ad, function (data) {
                    NotificationService.displaySuccessMessage("Ad edited successfully.");
                    $timeout(function () {
                        $location.path("/admin/ads");
                    }, 5000);
                }, function (error) {
                    NotificationService.displayErrorMessage("Ad could not be edited", error);
                });
            };

            $scope.deleteAd = function (ad) {
                AdminAdsResource.deleteAd(ad, function (data) {
                    NotificationService.displaySuccessMessage("Ad deleted successfully.");
                    $timeout(function () {
                        $location.path("/admin/ads");
                    }, 5000);
                }, function (error) {
                    NotificationService.displayErrorMessage("Ad could not be deleted", error);
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
        }]);