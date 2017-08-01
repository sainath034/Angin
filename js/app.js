var app = angular.module('admin', ['ui.router']);

app.controller('HomeController', function ($scope) {
    $scope.text = 'Welcome to Angin';
});

app.controller('LoginController', function ($scope) {
    $scope.text = 'Login';
});

app.controller('RegisterController', function ($scope, $http) {
    $scope.text = 'Register';
    $http.get("http://localhost:58967/api/UserType/Get")
        .then(function mySuccess(response) {
            $scope.usertype = response.data;
        }, function myError(response) {
            alert('error');
        });

});

app.controller('HomePageController', function ($scope, $stateParams) {
    $scope.Customer = $stateParams;
});

app.controller('NavBarController', function ($scope, $stateParams) {
    $scope.key = localStorage.getItem('id');
    $scope.logout = function () {
        localStorage.setItem('id', null);
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
                    Password: $scope.Password,
                    UserTypeId: $scope.UserTypeId._id
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
                    localStorage.setItem('id', response.data._id);
                    $state.go("homepage", response.data);
                },
                function (response) { // optional
                    alert('fail');
                });
    }
});

app.controller('ModuleController', function ($scope, $http, $state) {
    $scope.text = 'Module';
    $scope.CreateModule = function () {
        $http({
                url: 'http://localhost:58967/api/Module/Insert',
                method: "POST",
                data: $.param({
                    ModuleName: $scope.ModuleName,
                    ModuleCode: $scope.ModuleCode
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(function (response) {
                    $state.go("homepage");
                },
                function (response) { // optional
                    alert('fail');
                });
    };
});

app.controller('ViewUserController', function ($scope, $http) {
    $scope.text = 'View User Type';
    $http.get("http://localhost:58967/api/Master/GetUserType")
        .then(function mySuccess(response) {
            $scope.usertypes = response.data;
        }, function myError(response) {
            alert('error');
        });
});

app.controller('GetUserController', function ($scope, $http) {
    $scope.text = 'Add User Type';
    $http.get("http://localhost:58967/api/Module/Get")
        .then(function mySuccess(response) {
            $scope.modules = response.data;
        }, function myError(response) {
            alert('error');
        });
});

app.controller('AddUserController', function ($scope, $http, $state) {
    $scope.AddUserType = function () {
        $http({
                url: 'http://localhost:58967/api/UserType/Insert',
                method: "POST",
                data: $.param({
                    UserTypeName: $scope.UserTypeName,
                    UserTypeCode: $scope.UserTypeCode,
                    Modules: $scope.Modules
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(function (response) {
                    $state.go("usertype");
                },
                function (response) { // optional
                    alert('fail');
                });
    };
});

app.controller('EditUserController', function ($scope, $http, $state) {
    $scope.text = 'Edit User Type';

    $scope.EditUserType = function () {
        $http({
                url: 'http://localhost:58967/api/UserType/UpdateById',
                method: "POST",
                data: $.param({
                    UserTypeName: $scope.UserTypeName,
                    UserTypeCode: $scope.UserTypeCode,
                    Modules: $scope.Modules,
                    _id: $scope._id
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(function (response) {
                    $state.go("usertype");
                },
                function (response) { // optional
                    alert('fail');
                });
    };
});

app.controller('GetUserByIdController', function ($scope, $http, $stateParams) {
    $scope.text = 'Edit User Type';
    $http.get("http://localhost:58967/api/Module/Get")
        .then(function mySuccess(response) {
            $scope.modules = response.data;
            console.log($scope.modules);
        }, function myError(response) {
            alert('error');
        });
    $http.get("http://localhost:58967/api/UserType/GetById?id=" + $stateParams.id)
        .then(function mySuccess(response) {
            $scope.UserTypeName = response.data.UserTypeName;
            $scope.UserTypeCode = response.data.UserTypeCode;
            $scope.Modules = response.data.Modules;
            $scope._id = response.data._id;
        }, function myError(response) {
            alert('error');
        });
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
            params: {
                FirstName: null,
                Modules:null
            },
            controller: "HomePageController",
            templateUrl: "partials/homepage.html"
        })
        .state("module", {
            url: "/module",
            templateUrl: "partials/module.html"
        })
        .state("usertype", {
            url: "/usertype",
            params: {
                id: null,
            },
            templateUrl: "partials/user.html"
        })
        .state("editusertype", {
            url: "/editusertype",
            params: {
                id: null,
            },
            controller: "GetUserByIdController",
            templateUrl: "partials/edituser.html"
        })
        .state("addusertype", {
            url: "/addusertype",
            controller: "GetUserController",
            templateUrl: "partials/adduser.html"
        });
});
