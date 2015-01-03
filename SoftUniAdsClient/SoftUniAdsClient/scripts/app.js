var app = angular.module("softUniAds", ["ngRoute"]);
app.value("toastr", toastr)
    .constant("baseUrl", "http://localhost:1337/")
    .config(["$routeProvider", function ($routeProvider) {
        $routeProvider.
          when("/", {
              templateUrl: "views/partials/home.html",
              controller: "HomeController"
          }).
          otherwise({
              redirectTo: "/"
          });
    }]);