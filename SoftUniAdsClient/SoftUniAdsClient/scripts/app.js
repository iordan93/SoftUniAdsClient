var app = angular.module("softUniAds", ["ngRoute", "ngResource", "ui.bootstrap"]);
app
    .constant("baseUrl", "http://localhost:1337/api/")
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
                templateUrl: "views/admin/ads/ads.html",
                controller: "AdminAdsController",
                pageName: "adminAds",
                pageTitle: "Ads"
            })
            .when("/admin/ads/edit/:id", {
                templateUrl: "views/admin/ads/edit-ad.html",
                controller: "AdminAdsController",
                pageName: "adminEditAd",
                pageTitle: "Edit Ad"
            })
            .when("/admin/ads/delete/:id", {
                templateUrl: "views/admin/ads/delete-ad.html",
                controller: "AdminAdsController",
                pageName: "adminDeleteAd",
                pageTitle: "Delete Ad"
            })
            .when("/admin/users", {
                templateUrl: "views/admin/users/users.html",
                controller: "AdminUsersController",
                pageName: "adminUsers",
                pageTitle: "Users"
            })
            .when("/admin/users/edit/:id", {
                templateUrl: "views/admin/users/edit-user.html",
                controller: "AdminUsersController",
                pageName: "adminEditUser",
                pageTitle: "Edit User"
            })
            .when("/admin/users/delete/:id", {
                templateUrl: "views/admin/users/delete-user.html",
                controller: "AdminUsersController",
                pageName: "adminDeleteUser",
                pageTitle: "Delete User"
            })
            .when("/admin/categories", {
                templateUrl: "views/admin/categories/categories.html",
                controller: "AdminCategoriesController",
                pageName: "adminCategories",
                pageTitle: "Categories"
            })
            .when("/admin/categories/create/", {
                templateUrl: "views/admin/categories/create-category.html",
                controller: "AdminCategoriesController",
                pageName: "adminCreateCategory",
                pageTitle: "Create Category"
            })
            .when("/admin/categories/edit/:id", {
                templateUrl: "views/admin/categories/edit-category.html",
                controller: "AdminCategoriesController",
                pageName: "adminEditCategory",
                pageTitle: "Edit Category"
            })
            .when("/admin/categories/delete/:id", {
                templateUrl: "views/admin/categories/delete-category.html",
                controller: "AdminCategoriesController",
                pageName: "adminDeleteCategory",
                pageTitle: "Delete Category"
            })
            .when("/admin/towns", {
                templateUrl: "views/admin/towns/towns.html",
                controller: "AdminTownsController",
                pageName: "adminTowns",
                pageTitle: "Towns"
            })
            .when("/admin/towns/create/", {
                templateUrl: "views/admin/towns/create-town.html",
                controller: "AdminTownsController",
                pageName: "adminCreateTown",
                pageTitle: "Create Town"
            })
            .when("/admin/towns/edit/:id", {
                templateUrl: "views/admin/towns/edit-town.html",
                controller: "AdminTownsController",
                pageName: "adminEditTown",
                pageTitle: "Edit Town"
            })
            .when("/admin/towns/delete/:id", {
                templateUrl: "views/admin/towns/delete-town.html",
                controller: "AdminTownsController",
                pageName: "adminDeleteTown",
                pageTitle: "Delete Town"
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