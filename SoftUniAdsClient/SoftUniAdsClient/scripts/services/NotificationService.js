app.factory("NotificationService", ["$rootScope", "$timeout", "$sce", function ($rootScope, $timeout, $sce) {
    var DEFAULT_TIMEOUT = 5000;
    $rootScope.notifications = [];
    var service = {
        add: function (type, message, timeout) {
            timeout = timeout || DEFAULT_TIMEOUT;
            $rootScope.notifications.push({
                type: type,
                msg: message,
                close: function (index) {
                    return service.closeNotificationByIndex(index);
                }
            });

            $timeout(function () {
                service.closeNotification(this);
            }, timeout);
        },
        closeNotification: function (notification) {
            return service.closeNotificationByIndex($rootScope.notifications.indexOf(notification));
        },
        closeNotificationByIndex: function (index) {
            return $rootScope.notifications.splice(index, 1);
        }
    };

    return {
        displaySuccessMessage: function (message, timeout) {
            return service.add("success", $sce.trustAsHtml(message), timeout);
        },
        displayErrorMessage: function (message, serverError, timeout) {
            var errors = [];
            if (serverError && serverError.error_description) {
                errors.push(serverError.error_description);
            }

            if (serverError && serverError.modelState) {
                var modelStateErrors = serverError.modelState;
                for (var propertyName in modelStateErrors) {
                    var errorMessages = modelStateErrors[propertyName];
                    var trimmedName = propertyName.substr(propertyName.indexOf(".") + 1);
                    for (var i = 0; i < errorMessages.length; i++) {
                        var currentError = errorMessages[i];
                        errors.push(trimmedName + " - " + currentError);
                    }
                }
            }

            if (errors.length > 0) {
                message += ":<br>" + errors.join("<br>");
            }
            debugger;
            return service.add("danger", $sce.trustAsHtml(message), timeout);
        }
    };
}]);