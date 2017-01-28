var app  = angular.module("app");


app.controller("TestsController", function (QuestionService, TestsService,$scope,$timeout, $q){
  var vm = this;
  $scope.isShow = false;
  TestsService.all().then(function (data) {
      vm.tests = data;
  });


  vm.test = {};
  
   QuestionService.all().then(function (data) {
       vm.questions = data;
  });
  
  vm.createTest = function (test) {
    var selQ = vm.questions.map(function(q){
      if (q.checked) {
          return q.id;
      }
    });
    
    test.qIds=[];

    for (var i = 0; i < selQ.length; i++)
    {
        if (selQ[i] !=null )
        {
            test.qIds.push(selQ[i]);
        }

    }
   
   // test.qIds = selqids;
      //test.id = id;
    test.iscalculated = false;
    TestsService.add(test);

    var $messageDiv = $('#msg');
    $messageDiv.style = 'color:red';
    $messageDiv.show().html('Test created successfully!');
    setTimeout(function () { $messageDiv.hide().html(''); }, 5000);
    $scope.Message = 'Test created successfully.';
    
  };

  vm.editTest = function (testid) {
      $scope.isShow = true;
      var seltest = horizon("Tests");
      var defer = $q.defer();
      seltest.find(testid).fetch().subscribe(function (testdata) {
          defer.resolve(testdata);
          console.log('service 1', testdata);
          QuestionService.all().then(function (data) {
              vm.questions = data;
              testdata.qIds.forEach(function (questid) {
                  vm.questions.forEach(function (quest) {
                      if (questid == quest.id) {
                          quest.checked = true;
                      }
                  });
              });
          });
      });

  };



  vm.saveTest = function (test) {
      vm.createTest(test);
      $scope.vm.question = {};
      var $messageDiv = $('#msg');
      $messageDiv.style = 'color:red';
      $messageDiv.show().html('Test edited successfully!');
      setTimeout(function () { $messageDiv.hide().html(''); }, 5000);
      $scope.Message = 'Test edited successfully.';
      console.log('Test deletd successfully.');
  };


  vm.deleteTest = function (testid) {
      var seltest = horizon("Tests");
      seltest.remove(testid);
      TestsService.all().then(function (data) {
          vm.tests = data;
      });

      var $messageDiv = $('#msg');
      $messageDiv.style = 'color:red';
      $messageDiv.show().html('Test deletd successfully!');
      setTimeout(function () { $messageDiv.hide().html(''); }, 5000);
      $scope.Message = 'Test deletd successfully.';
      console.log('Test deletd successfully.');
  };
});