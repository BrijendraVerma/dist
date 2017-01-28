var app = angular.module("app", ['ngRoute', 'ui.router', 'timer', 'ngDialog']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider',
  function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    
      $stateProvider.state('index', {
          url: '/',
          templateUrl: '/users/templates/login.html',
          controller: 'LoginController'
      })
       .state('login', {
           url: '/login/index',
           templateUrl: '/users/templates/login.html',
           controller: 'LoginController'
       })
          .state('user', {
              url: '/user/index',
              templateUrl: '/users/templates/usermaster.html',
              controller: 'UserController'


          })

       .state('dashboard', {
           url: '/dashboard',
           templateUrl: 'users/templates/dashboard.html',
           controller: 'DashboardController'
       })

          .state('allresults',
         {
             url: '/allresults',
             templateUrl: 'admin/templates/allresults.html',
             controller: 'ResultsController as rs'
         })

            .state('results',
         {
             url: '/results',
             templateUrl: 'admin/templates/results.html',
             controller: 'ResultsController as rs'
         })
       .state('createTest', {
           templateUrl: '/admin/templates/test-create.html',
           controller: 'TestsController  as vm'
       })
       .state('showTests', {
           url: '/testengine/show',
           templateUrl: '/testengine/templates/test-show.html',
           controller: 'TestsController  as vm'
       })
       .state('runTest', {
           url: '/testengine/run/:id?time',
           templateUrl: '/testengine/templates/test-run.html',
           controller: 'TestEngineController as vm'
           //,
           //controllerAs: 'vm'
       })
      .state('questions', {
          url: '/questions',
          templateUrl: '/admin/templates/questions.html',
          controller: 'QuestionsController  as vm'
         
      })
      .state('assignTests', {
          url: '/assignTests',
          templateUrl: '/admin/templates/assign-test.html',
          controller: 'AssignedTestController'

      })
      //.otherwise('/', { templateUrl: '/users/templates/login.html', controller: 'LoginController' });

      //$locationProvider.html5Mode({
      //    enabled: true,
      //    requireBase: false
      //});

      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/');

     
  }]);


app.run(function ($rootScope, $templateCache, $state) {
    //$rootScope.$on('$viewContentLoaded', function () {
    //    $templateCache.removeAll();
    //});

    $rootScope.$on('$stateChangeStart',
        function (event, toState, toParams, fromState, fromParams) {
            //alert(config.headers.Authorization);
            //console.log(fromState);
            //console.log(toState);
            // log($rootScope.loginState);
            $rootScope.$previousState = fromState;
            //alert(sessionService.isTokenExist());
            //if ((toState.name == "dashboard"))// && sessionService.isTokenExist()
            //{
            //}
            //else
            //debugger;
                if (toState.name != "index" && ((null == $rootScope.loginState || undefined == $rootScope.loginState) || (null != $rootScope.loginState && !$rootScope.loginState.isLoggedIn))) {
                  //  console.log('DENY');
                    event.preventDefault();
                    $state.go('index');
                }
                else {
                   // console.log('ALLOW');
                }
        });

    $state.transitionTo('index');
});


app.factory('QuestionService', function() {
    var questions =[
      { 
        "id" :"1",
        "questionType":"mcq",
        "text":"What is the capital of India?",
        "choice":"Mumbai\nBangalore\nNew Delhi",
        "answer":"3",
        "category":"programming",
        "subcategory":"c#"
        
      },
       { 
         "id":"2",
         "questionType":"mcq",
        "text":"Jio is owned by which company?",
        "choice":"Reliance\nTata\nAirtel",
        "answer":"1",
        "category":"programming",
        "subcategory":"c#"
         
       }
      ];
    return {
        all: function() {
            return questions;  
        },
        add: function (question) {
            var qtable = horizon("Questions");
            qtable.store(question);
         //   console.log('done');
          questions.push(question);
          
          console.log('QS:', JSON.stringify(questions));
        }
    };
});


app.factory('TestsService', function() {
    var tests =[
      { 
        "id" :"1",
        "testName":"Test 1",
        "questions":[{"qID":"1"},{"qID":"2"}]
      },
       { 
         "id":"2",
         "testName":"Test 2",
       },
       {"id":"3","testName":"Test 3","questions":[{"qID":"1","q":{"id":"1","questionType":"mcq","text":"What is the capital of India?","choice":"Mumbai\nBangalore\nNew Delhi","answer":"3","category":"programming","subcategory":"c#","$$hashKey":"object:9","checked":true}},{"qID":"2","q":{"id":"2","questionType":"mcq","text":"Jio is owned by which company?","choice":"Reliance\nTata\nAirtel","answer":"1","category":"programming","subcategory":"c#","$$hashKey":"object:10","checked":true}}],"id":3}
      ];
      
    return {
        all: function() {
            return tests;  
        },
        add: function(test){
          tests.push(test);
          console.log('QS:', JSON.stringify(test));
        }
    };
});


