//var app = angular.module("app");

app.factory("loginService", function ($http, $rootScope, $q) //sessionService, rememberMeService
{



    var doLogin = function(user)
    {
        var userTable = horizon("Users");
        var defer = $q.defer();
        userTable.find({ 'name': user.userName, 'password': user.password }).fetch().subscribe(function (data) {
            defer.resolve(data);
            console.log('service ', data);

        });
        return defer.promise;
        //return user;
        //return getUserByUserName(user.userName);
    }

    var getAllUsers = function () {
        var userTable = horizon("Users");
        var defer = $q.defer();
        userTable.fetch().subscribe(function (data) {
            defer.resolve(data);
            console.log('service ', data);

        });
        return defer.promise;
        //return user;
        //return getUserByUserName(user.userName);
    }

    //var getToken = function (user) {

    //    var data = "username=" + user.userName + "&password=" + user.password + "&grant_type=password";
       
    //    //, { withCredentials: true }
    //    return $http.post(TGETS.ServiceBaseUrl + "/token", data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }) //,'Access-Control-Allow-Origin':'*'
    //    //return $http.post(TGETS.ServiceBaseUrl + "/token", data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }) //,'Access-Control-Allow-Origin':'*'
    //        .then(function (res) {
    //            //  log(res);
    //            return res;
    //        })       
    //}

    //var obtainLocalAccessToken = function (provider, token) {

    //    //var data = "username=" + user.userName + "&password=" + user.password + "&grant_type=password";

    //    //, { withCredentials: true }
    //    //return $http.post(TGETS.ServiceBaseUrl + "/token", data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }) //,'Access-Control-Allow-Origin':'*'
    //    //return $http.post(TGETS.ServiceBaseUrl + "/token", data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }) //,'Access-Control-Allow-Origin':'*'
    //    return $http.get(TGETS.ServiceBaseUrl + "/TgetsAuth/ObtainLocalAccessToken?provider=" + provider + "&externalAccessToken=" + token)
    //        .then(function (res) {
    //            //  log(res);
    //            return res;
    //        })
    //}

    //var getUserInfoFromToken = function (token) {
        
    //    //return $http.post(TGETS.ServiceBaseUrl + "/token", data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }) //,'Access-Control-Allow-Origin':'*'
    //    return $http.get(TGETS.ServiceBaseUrl + "/TgetsAuth/GetUserInfoFromToken?accessToken=" + token)
    //        .then(function (res) {
    //            //  log(res);
    //            return res;
    //        })
    //}

    var logout = function () {
        ////$window.sessionStorage.setItem('token', '');
        //sessionService.deleteToken();
        $rootScope.loginState = {
            isLoggedIn: false,
            userId: null,
            user: null
        };     
    }

    return {
       // loginState: loginState,
        doLogin: doLogin,
        //getUserByUserName: getUserByUserName,
        //getToken: getToken,
        logout: logout,
        getAllUsers: getAllUsers
        //obtainLocalAccessToken: obtainLocalAccessToken,
        //getUserInfoFromToken: getUserInfoFromToken
    }
})
