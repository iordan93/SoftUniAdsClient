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

        $scope.fileSelected = function (fileInputField) {
            var file = fileInputField.files[0];
            if (file.type.match(/image\/.*/)) {
                var reader = new FileReader();
                reader.onload = function () {
                    $scope.newAd.imageDataUrl = reader.result;
                    $(".image-box").html("<img src='" + reader.result + "'>");
                };

                reader.readAsDataURL(file);
            } else {
                $(".image-box").html("<p>File type not supported!</p>");
            }
        };


        $scope.cancel = function () {
            $location.path("#/");
        };
    }]);