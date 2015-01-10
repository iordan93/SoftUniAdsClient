var app = angular.module("softUniAds", ["ngRoute", "ngResource", "ui.bootstrap"]);
app
    .constant("baseUrl", "http://softuni-ads.azurewebsites.net/api/")
    .config(["$routeProvider", function ($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/home.html",
                controller: "HomeController",
                pageName: "home"
            })
            .when("/login", {
                templateUrl: "views/login.html",
                controller: "LoginController",
                pageName: "login"
            })
            .when("/register", {
                templateUrl: "views/register.html",
                controller: "LoginController",
                pageName: "register"
            })
            .when("/myads", {
                //templateUrl: "views/register.html",
                //controller: "LoginController",
                pageName: "myads"
            })
            .when("/publish", {
                //templateUrl: "views/register.html",
                //controller: "LoginController",
                pageName: "publish"
            })
            .when("/profile", {
                //templateUrl: "views/register.html",
                //controller: "LoginController",
                pageName: "profile"
            })
            .when("/admin/ads", {
                //templateUrl: "views/register.html",
                //controller: "LoginController",
                pageName: "adminAds"
            })
            .when("/admin/users", {
                //templateUrl: "views/register.html",
                //controller: "LoginController",
                pageName: "adminUsers"
            })
            .when("/admin/categories", {
                //templateUrl: "views/register.html",
                //controller: "LoginController",
                pageName: "adminCategories"
            })
            .when("/admin/towns", {
                //templateUrl: "views/register.html",
                //controller: "LoginController",
                pageName: "adminTowns"
            })
            .otherwise({
                 redirectTo: "/"
             });
    }]);