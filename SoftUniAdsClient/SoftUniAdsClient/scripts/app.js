var app = angular.module("softUniAds", ["ngRoute", "ngResource", "ui.bootstrap"]);
app
    .constant("baseUrl", "http://softuni-ads.azurewebsites.net/api/")
    .config(["$routeProvider", function ($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/home.html",
                controller: "HomeController",
                pageName: "home",
                pageTitle: "Home"
            })
            .when("/login", {
                templateUrl: "views/login.html",
                controller: "LoginController",
                pageName: "login",
                pageTitle: "Login"
            })
            .when("/register", {
                templateUrl: "views/register.html",
                controller: "RegisterController",
                pageName: "register",
                pageTitle: "Registration"
            })
            .when("/user/ads", {
                templateUrl: "views/user/my-ads.html",
                controller: "UserAdsController",
                pageName: "myads",
                pageTitle: "My Ads"
            })
            .when("/user/publish", {
                templateUrl: "views/user/publish-new-ad.html",
                controller: "UserAdsController",
                pageName: "publish",
                pageTitle: "Publish New Ad"
            })
            .when("/user/editAd/:id", {
                templateUrl: "views/user/edit-ad.html",
                controller: "UserAdsController",
                pageName: "edit",
                pageTitle: "Edit Ad"
            })
            .when("/user/deleteAd/:id", {
                templateUrl: "views/user/delete-ad.html",
                controller: "UserAdsController",
                pageName: "delete",
                pageTitle: "Delete Ad"
            })
            .when("/user/profile", {
                templateUrl: "views/user/profile.html",
                controller: "UserProfileController",
                pageName: "profile",
                pageTitle: "Edit User Profile"
            })
            .when("/admin/ads", {
                templateUrl: "views/admin/ads.html",
                controller: "AdminAdsController",
                pageName: "adminAds",
                pageTitle: "Ads"
            })
            .when("/admin/users", {
                //templateUrl: "views/register.html",
                //controller: "LoginController",
                pageName: "adminUsers",
                pageTitle: "Users"
            })
            .when("/admin/categories", {
                //templateUrl: "views/register.html",
                //controller: "LoginController",
                pageName: "adminCategories",
                pageTitle: "Categories"
            })
            .when("/admin/towns", {
                //templateUrl: "views/register.html",
                //controller: "LoginController",
                pageName: "adminTowns",
                pageTitle: "Towns"
            })
            .otherwise({
                redirectTo: "/"
            });
    }])
    .run(["$rootScope", "$location", "AccountService", function ($rootScope, $location, AccountService) {
        $rootScope.$on("$locationChangeStart", function (e) {
            if ($location.path().indexOf("/user/") != -1 && !AccountService.isLoggedIn()) {
                $location.path("#/");
            }

            if ($location.path().indexOf("/admin/") != -1 && !AccountService.isAdmin()) {
                $location.path("#/");
            }
        });
    }]);