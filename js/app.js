var app = angular.module('admin', ['ui.router']);

app.controller('HomeController', function ($scope) {
    $scope.text = 'Welcome to Angin';
});

app.controller('LoginController', function ($scope) {
    $scope.text = 'Login';
});

app.controller('RegisterController', function ($scope) {
    $scope.text = 'Register';
});

app.controller('HomePageController', function ($scope,$stateParams) {
    $scope.Customer = $stateParams;
});

app.controller('NavBarController', function ($scope,$stateParams) {
    $scope.key = localStorage.getItem('id');
    $scope.logout = function(){
      localStorage.setItem('id',null);
    };
});

app.controller('InsertCustomerController', function ($scope, $http, $state) {
    $scope.InsertCustomer = function () {
        $http({
                url: 'http://localhost:58967/api/Customer/InsertCustomer',
                method: "POST",
                data: $.param({
                    FirstName: $scope.FirstName,
                    MiddleName: $scope.MiddleName,
                    LastName: $scope.LastName,
                    Mobile: $scope.Mobile,
                    Email: $scope.Email,
                    Password: $scope.Password
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(function (response) {
                    $state.go("login")
                },
                function (response) { // optional
                    alert('fail');
                    $scope.FailedtoInsert = true;
                });
    }
});

app.controller('LoginController', function ($scope, $http, $state) {
    $scope.Login = function () {
        $http({
                url: 'http://localhost:58967/api/Customer/Login',
                method: "POST",
                data: $.param({
                    Email: $scope.Email,
                    Password: $scope.Password
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(function (response) {
                    localStorage.setItem('id',response.data._id);
                    $state.go("homepage",response.data);
                },
                function (response) { // optional
                    alert('fail');
                });
    }
});

app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when("", "/home");

    $stateProvider
        .state("home", {
            url: "/home",
            controller: "HomeController",
            templateUrl: "../partials/home.html"
        })
        .state("login", {
            url: "/login",
            controller: "LoginController",
            templateUrl: "partials/login.html"
        })
        .state("register", {
            url: "/register",
            controller: "RegisterController",
            templateUrl: "partials/register.html"
        })
        .state("homepage", {
            url: "/homepage",
            params:{FirstName:null},
            controller: "HomePageController",
            templateUrl: "partials/homepage.html"
        });
});
