var app = angular.module("softUniAds", ["ngRoute", "ngResource", "ui.bootstrap"]);
app.value("toastr", toastr)
    .constant("baseUrl", "http://localhost:1337/")
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