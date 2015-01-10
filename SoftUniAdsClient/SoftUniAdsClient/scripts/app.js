var app = angular.module("softUniAds", ["ngRoute", "ngResource", "ui.bootstrap"]);
app
    .constant("baseUrl", "http://softuni-ads.azurewebsites.net/api/")
    .config(["$routeProvider", function ($routeProvider) {
        $routeProvider
         .when("/", {
             templateUrl: "views/home.html",
             controller: "HomeController"
         })
        .when("/login", {
            templateUrl: "views/login.html",
            controller: "LoginController"
        })
         .otherwise({
             redirectTo: "/"
         });
    }]);