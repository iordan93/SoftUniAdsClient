app.controller("UserProfileController", ["$scope", "TownsResource", "ProfileResource", "NotificationService",
    function ($scope, TownsResource, ProfileResource, NotificationService) {
        $scope.towns = TownsResource.all();
        $scope.userData = ProfileResource.profile();

        $scope.updateProfile = function () {
            ProfileResource.update($scope.userData, function (data) {
                NotificationService.displaySuccessMessage("The profile has been edited successfully.");
            }, function (error) {
                NotificationService.displayErrorMessage("The profile could not be edited");
            });
        };

        $scope.updatePassword = function () {
            if ($scope.passwordData.newPassword != $scope.passwordData.confirmPassword) {
                NotificationService.displayErrorMessage("The new passwords do not match.");
                return;
            }

            ProfileResource.updatePassword($scope.passwordData, function (data) {
                NotificationService.displaySuccessMessage("The new password has been saved successfully.");
            }, function (error) {
                NotificationService.displayErrorMessage("The new password could not be saved", error);
            });
        }
    }]);