app.factory("AccountService", ["$http", "baseUrl", function ($http, baseUrl) {
    var KEY_USER_DATA = "currentUserInfo";
    return {
        register: function (data, success, error) {
            var request = {
                method: "POST",
                url: baseUrl + "user/register",
                data: data
            };

            $http(request)
                .success(function (data) {
                    localStorage[KEY_USER_DATA] = angular.toJson(data);
                    success(data);
                })
                .error(error);
        },
        login: function (data, success, error) {
            var request = {
                method: "POST",
                url: baseUrl + "user/login",
                data: data
            };

            $http(request)
                .success(function (data) {
                    localStorage[KEY_USER_DATA] = angular.toJson(data);
                    success(data);
                })
                .error(error);
        },
        logout: function () {
            localStorage.removeItem(KEY_USER_DATA);
        },
        getCurrentUser: function () {
            var userInfo = localStorage[KEY_USER_DATA];
            if (userInfo) {
                return angular.fromJson(userInfo);
            }
        },
        isAnonymous: function () {
            return this.getCurrentUser() == undefined;
        },
        isLoggedIn: function () {
            return !this.isAnonymous();
        },
        isRegularUser: function () {
            var user = this.getCurrentUser();
            return (user != undefined) && (!user.isAdmin);
        },
        isAdmin: function () {
            var user = this.getCurrentUser();
            return (user != undefined) && (user.isAdmin);
        },
        getAuthHeaders: function () {
            var headers = {};
            var user = this.getCurrentUser();
            if (user) {
                headers.Authorization = "Bearer " + user.access_token;
            }

            return headers;
        }
    };
}]);