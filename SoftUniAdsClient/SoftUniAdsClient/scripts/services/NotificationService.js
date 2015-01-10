app.factory("NotificationService", ["$rootScope", "$timeout", function ($rootScope, $timeout) {
    $rootScope.notifications = [];
    var service = {
        add: function (type, message, timeout) {
            $rootScope.notifications.push({
                type: type,
                msg: message,
                close: function (index) {
                    return service.closeNotificationByIndex(index);
                }
            });

            if (timeout) {
                $timeout(function () {
                    service.closeNotification(this);
                }, timeout);
            }
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
            return service.add("success", message, timeout);
        },
        displayErrorMessage: function (message, timeout) {
            var errors = [];
            if (message && message.error_description) {
                errors.push(message.error_description);
            }

            if (message && message.modelState) {
                var modelStateErrors = message.modelState;
                for (var propertyName in modelStateErrors) {
                    var errorMessages = modelStateErrors[propertyName];
                    var trimmedName = propertyName.substr(propertyName.indexOf('.') + 1);
                    for (var i = 0; i < errorMessages.length; i++) {
                        var currentError = errorMessages[i];
                        errors.push(trimmedName + ' - ' + currentError);
                    }
                }
            }

            if (errors.length > 0) {
                message += ":<br>" + errors.join("<br>");
            }

            return service.add("danger", message, timeout);
        }
    };
}]);