var app = angular.module("softUniAds", ["ngRoute", "ngResource", "ui.bootstrap"]);
app.value("toastr", toastr)
    .constant("baseUrl", "http://softuni-ads.azurewebsites.net/api/")
    .config(["$routeProvider", function ($routeProvider) {
        $routeProvider
         .when("/", {
             templateUrl: "views/home.html",
             controller: "HomeController"
         })
         .otherwise({
             redirectTo: "/"
         });
    }]);