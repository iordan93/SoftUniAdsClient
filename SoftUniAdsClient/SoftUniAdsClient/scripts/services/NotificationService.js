app.factory("NotificationService", ["$rootScope", "$timeout", function ($rootScope, $timeout) {
    $rootScope.notifications = [];
    var service = {
        add: function (type, message, timeout) {
            $rootScope.notifications.push({
                type: type,
                msg: message,
                close: function () {
                    return service.closeNotification(this);
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
    return service;
}]);