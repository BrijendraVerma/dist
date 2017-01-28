//var app = angular.module("app");


app.controller('LoginController', function ($scope, loginService, $rootScope, $state) {
    $scope.$rootScope = false;
    $scope.$rootScope = '';
    $scope.user = {
        userName: "smeeta",
        password:"123",
        group: 'admin'
    }
    
    //userTable.store(user);

    $scope.error = "";

    $scope.submitted = false;
   
    //rememberMeService.save("userName", "admin");

    //console.log(rememberMeService.get("userName"));
    //console.log(rememberMeService.get("pass"));

    //var user = {
    //    userName: rememberMeService.get("userName"),//"admin",
    //    password: rememberMeService.get("pass")// "123456"
    //}

   //$scope.loginState = loginService.loginState;
    //$scope.loginState.isLoggedIn = false;

    $rootScope.loginState = {
        isLoggedIn: false,
        userId: null,
        user: null,
        role: 'nonadmin'
    };

   // console.log($rootScope);
    
    $scope.loginState = $rootScope.loginState

    //$scope.user = user;
    //$scope.loginState = loginState;
    
    $scope.doLogin = function (isValid, user) {
        
       // debugger;
        
        $scope.submitted = !isValid;
        if (!isValid)
        {
            return;
        }

        var user = loginService.doLogin(user).then(function (user) {
          
            if (user) {
                $rootScope.loginState.user = user;
                $rootScope.loginState.userId = user.id;
                $rootScope.loginState.isLoggedIn = true;
                $rootScope.loginState.role = user.group;
                $rootScope.isloggedIn = true;
                $rootScope.message = 'welcome  ';
                $state.go("dashboard");
              
            }
            else
            {
                if ($scope.user.userName == 'smeeta' && $scope.user.password == '123')
                {
                    
                    $rootScope.loginState.user = $scope.user;
                    $rootScope.loginState.userId = '1';
                    $rootScope.loginState.isLoggedIn = true;
                    $rootScope.loginState.role = $scope.user.group;
                    $rootScope.isloggedIn = true;
                    $rootScope.message = 'welcome  ';
                    $state.go("dashboard");
                }
                else {
                    $scope.error = "User Name or Password is wrong !!"
                }
            }
        });
        

        
        //loginService.doLogin(user).then(function (data) {
            
        //    if (null != data) {
        //        $rootScope.loginState.user = data;
        //        //$rootScope.loginState.userId = data.id;

        //        ////Get Token
        //        //loginService.getToken(user).then(function (res) {
        //        //    //log(res.status);
        //        //    if(res.status == 200)
        //        //    {
        //        //        //$window.sessionStorage.setItem('token', res.data.access_token);
        //        //        sessionService.setToken(res.data.access_token);
                                               
        //        //        $rootScope.loginState.isLoggedIn = true;
        //        //        if ($rootScope.loginState.isLoggedIn) {
        //        //            $scope.error = null;
                            
        //        //            if ($scope.rememberMe && !TGETS.IsMobile) {
        //        //                rememberMeService.save("userName", user.userName);
        //        //                console.log(rememberMeService.get("userName"));
        //        //                rememberMeService.save("pass", user.password);
        //        //            }
        //        //            $state.go("dashboard");
        //        //        }
        //        //    }
        //        //    else
        //        //    {
        //        //        $scope.error = res.error;
        //        //    }
        //        //})


               
        //    }
        //    else {
        //        $scope.error = "User Name or Password is not valid!";
        //    }
        //})
        //$scope.loginState = loginService.loginState;
        //if (loginService.loginState.isLoggedIn) {
        //    //$location.path("/dashboard");
        //    $state.go("dashboard");
        //}
    }


    //$scope.doFacebookLogin = function () {
    //    $facebook.login().then(function (response) {
    //        console.log(response);
    //        var auth_token = response.authResponse.accessToken;
    //        //alert(auth_token);
    //        setTimeout(function () {
    //            refresh(auth_token);
    //        },10)
            
    //    });
    //}

    //function refresh(token) {
    //    $facebook.api("/me").then(
    //      function (response) {
    //          console.log(response);
    //          $scope.welcomeMsg = "Welcome " + response.name;
    //          //alert($scope.welcomeMsg);
    //          $scope.isLoggedIn = true;

    //          loginService.obtainLocalAccessToken("Facebook", token).then(function (resData) {
    //              console.log(resData);
    //              if (resData.status == 200)
    //              {
    //                  console.log(resData.data.userName);
    //                  console.log(resData.data.access_token);
    //                  $rootScope.loginState.user = {};
    //                  $rootScope.loginState.user.userName = resData.data.userName;
    //                  $rootScope.loginState.userId = resData.data.userName;

    //                  sessionService.setToken(resData.data.access_token);

    //                  $rootScope.loginState.isLoggedIn = true;
    //                  if ($rootScope.loginState.isLoggedIn) {
    //                      $scope.error = null;
    //                      $state.go("dashboard");
    //                  }
    //              }
    //          })

    //      },
    //      function (err) {
    //          alert(err);
    //          $scope.welcomeMsg = "Please log in";
    //      });
    //}


    //$scope.$on('event:google-plus-signin-success', function (event, authResult) {
    //    // User successfully authorized the G+ App!
    //    console.log(event);
    //    console.log(authResult);
    //    console.log('Signed in!');

    //    $scope.isLoggedIn = true;
    //    var token = authResult.access_token;

    //    loginService.obtainLocalAccessToken("Google", token).then(function (resData) {
    //        console.log(resData);
    //        if (resData.status == 200) {
    //            console.log(resData.data.userName);
    //            console.log(resData.data.access_token);
    //            $rootScope.loginState.user = {};
    //            $rootScope.loginState.user.userName = resData.data.userName;
    //            $rootScope.loginState.userId = resData.data.userName;

    //            sessionService.setToken(resData.data.access_token);

    //            $rootScope.loginState.isLoggedIn = true;
    //            if ($rootScope.loginState.isLoggedIn) {
    //                $scope.error = null;
    //                $state.go("dashboard");
    //            }
    //        }
    //    })


    //});
    //$scope.$on('event:google-plus-signin-failure', function (event, authResult) {
    //    // User has not authorized the G+ App!
    //    console.log('Not signed into Google Plus.');
    //});

    ////---------------------------------------
    
    //console.log(user);
    //console.log(rememberMeService.get("userName"));

    ////if(TGETS.IsMobile)
    ////{
    ////    //If Credentials are rememeberd then ogged in directly
    ////    if (undefined != rememberMeService.get("userName") && undefined != rememberMeService.get("pass"))
    ////    {
    ////        $scope.doLogin(true,user);
    ////    }
    ////}

});
