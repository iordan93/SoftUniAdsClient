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
            .when("/myads", {
                //templateUrl: "views/register.html",
                //controller: "LoginController",
                pageName: "myads",
                pageTitle: "My Ads"
            })
            .when("/publish", {
                //templateUrl: "views/register.html",
                //controller: "LoginController",
                pageName: "publish",
                pageTitle: "Publish New Ad"
            })
            .when("/profile", {
                //templateUrl: "views/register.html",
                //controller: "LoginController",
                pageName: "profile",
                pageTitle: "Edit User Profile"
            })
            .when("/admin/ads", {
                //templateUrl: "views/register.html",
                //controller: "LoginController",
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
    }]);