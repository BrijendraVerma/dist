var app  = angular.module("app");

app.controller("QuestionsController", function ($scope,QuestionService,$timeout, ngDialog) {
  
    var vm = this;
    $scope.count = 0;
    $scope.crrvalue = '';
    $scope.qid = '';
    $scope.choices = [];
    $scope.anschoices = [];
  vm.questions = QuestionService.all().then(function (data) {
      vm.questions=data;
  });
  console.log(vm.questions);
  //vm.question = {};
  //vm.question.questionType = "mcq";
  //vm.question.category = "programming";
  //vm.question.subcategory = "c#";
  
  vm.questionTypes = [
    'numeric',
    'boolean',
    'text',
    'mcq'
  ];

    // Add New Directives
 
  $scope.mcq = function () {
      $scope.choices = [];
      $scope.anschoices = [];
  };

  $scope.addNewChoice = function () {
      var newItemNo = $scope.choices.length + 1;
      $scope.choices.push({ 'id': 'choice' + newItemNo });
  };

  $scope.removeChoice = function() {
      var lastItem = $scope.choices.length-1;
      $scope.choices.splice(lastItem);
  };
  
  $scope.addNewansChoice = function () {
      var newItemNo = $scope.anschoices.length + 1;
      $scope.anschoices.push({ 'id': 'choice' + newItemNo });
  };

  $scope.removeansChoice = function () {
      var lastItem = $scope.anschoices.length - 1;
      $scope.anschoices.splice(lastItem);
  };

    //


  vm.showQuestCreateWindow = function (event) {
      // debugger;
      event.preventDefault();
      ngOpenDialog = ngDialog.open({
          template: '/admin/templates/create-question.html',
          className: 'ngdialog-theme-plain',
          appendClassName: 'ngdialog-custom',
          scope: $scope
      });
  }

 
  
  vm.addQuestion = function (question, choices, anschoices) {
      question.category = '';
      question.subcategory = '';
      var blnFound = true;

      if (question.questionType == 'mcq')
      {
          var str = '';
          if (question.questionType == 'mcq')
          {
              question.choice = [];
          }
          else {
              question.choice = '';
          }

          question.answer = '';

          for (var i = 0; i < choices.length; i++) {
              if (question.questionType == 'mcq') {
                  question.choice.push(choices[i].name);
              }


          }

          if (question.questionType == 'mcq') {
              str = '';
              for (var i = 0; i < anschoices.length; i++) {
                  str += anschoices[i].name + ',';
              }
              str = str.substring(0, str.length - 1);
              question.answer = str;
          }

      }
      else
      {
          question.choice = '';
      }
    
      if(question.questionType == 'mcq')
      {
          if(choices.length==0 && anschoices.length==0)
          {
              blnFound = false;
          }
      }
     
      if (blnFound == true) {
          QuestionService.add(question);
      }
   
      $scope.vm.question = {};
      var $messageDiv = $('#msg');
      $messageDiv.style = 'color:red';
      $messageDiv.show().html('Records Updated!');
      setTimeout(function () { $messageDiv.hide().html(''); }, 5000);
      $scope.Message = 'Question created successfully.';
  };
  
});














