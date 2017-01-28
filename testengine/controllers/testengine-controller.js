//var app  = angular.module("app");


app.controller("TestEngineController", function ($scope,$rootScope, $stateParams, $state, QuestionService, TestsService, AnswerService,dashboardService, $q) {
    var vm = this;
   
    var testId = $stateParams.id;
    $scope.countdown = $stateParams.time;
    vm.test = {};
    vm.currentQId = 0;
    var strtest = "";
    vm.useranswers = {};
    vm.useranswers.userid = '';
    vm.useranswers.testid = testId;
    vm.useranswers.questionid = '';
    vm.useranswers.questionType = '';
    vm.useranswers.selection = [];
    vm.useranswers.iscorrect = false;
    vm.useranswers.issubmit = false;
    vm.useranswers.isanswered = false;
    var allQuestions = [];
    var getAns = [];
    var userTest = [];
    

    vm.choices = [false, false, false, false];


    TestsService.getTestById(testId).then(function (data) {
              
        vm.test = data;

        var qid=vm.test.qIds[0];
        var uid=$scope.loginState.userId;
      
       
        var uanswer = AnswerService.findById(uid, qid, testId).then(function (uanswer) {
            console.log('next old uanswer ', uanswer);
            //
            
            if (uanswer != null) {
                
                console.log('NEXT ', JSON.stringify(uanswer));
                if (uanswer.questionType == 'mcq')
                {
                    vm.useranswers.selection = uanswer.selection.slice();
                }
                else
                {
                    vm.useranswers.selection = uanswer.selection;
                }
                 
            }
        });
        

        QuestionService.getById(vm.test.qIds[0]).then(function (quest) {
            vm.question = quest;
            vm.totalQuestCount = vm.test.qIds.length;


        });

        QuestionService.all().then(function (quest) {
            allQuestions = quest;
          

        });

        dashboardService.getMyTests(uid).then(function (data) {
            userTest = data;
            
        })


    });

  


    vm.toggleSelection = function toggleSelection(choice) {
        var idx = vm.useranswers.selection.indexOf(choice);
        if (vm.useranswers.selection=="")
            vm.useranswers.selection=[];
       
        if (idx > -1) {
            vm.useranswers.selection.splice(idx, 1);
        }

        else {
            vm.useranswers.selection.push(choice);
        }

    };


    $scope.inifill = function (testId, uids, alltest) {
        const hz = new Horizon();
        const messages = hz("UserAnswers");
        AnswerService.getBytestIduserid(testId, uids, alltest).then(function (ansdtls) {
            getAns = ansdtls;
            dashboardService.getMyTests($rootScope.loginState.userId, $rootScope.loginState.role).then(function (data) {
               
                $scope.assignedTests = data;

                console.log("Time Completed", $scope.assignedTests);

                $state.go("dashboard");
                var $messageDiv = $('#msg');
                $messageDiv.style = 'color:red';
                $messageDiv.show().html('Test Completed!');
                setTimeout(function () { $messageDiv.hide().html(''); }, 5000);
                $scope.Message = 'Test Completed!.';
                $scope.stopTimer();
            })
        });
    }

    vm.submit = function ()
      {
        var uids = $scope.loginState.userId;
        $scope.inifill(testId, uids, userTest);
   
    }

    $scope.compareUserAnswer = function (answers) {


        console.log(answers);
                
        
    }

    vm.compareResults = function (answers) {
        answers.forEach(function (answer) {
            vm.test.questions.forEach(function (quest) {
                if (quest.qID == answer.questionid) {
                    console.log(answer.selection);
                    if (answer.questionType == 'mcq') {
                        var questans = quest.q.answer.split(',');
                        console.log(JSON.stringify(questans));
                        questans.forEach(function (str) {
                            if ((answer.selection.indexOf(str)) > 0) {
                                answer.iscorrect = true;
                            }
                            else {
                                answer.iscorrect = false;
                            }
                        });
                    }
                    if (answer.questionType == 'numeric') {
                        if (answer.numAns.toString() == quest.q.answer) {
                            console.log(JSON.stringify(answer.numAns));
                            answer.iscorrect = true;
                        }
                        else {
                            answer.iscorrect = false;
                        }
                    }
                    if (answer.questionType == 'boolean') {
                        if (answer.selection[0] == quest.q.answer) {
                            console.log(JSON.stringify(answer.selection));
                            answer.iscorrect = true;
                        }
                        else {
                            answer.iscorrect = false;
                        }

                    }
                    if (answer.questionType == 'text') {
                        if (quest.q.answer.toLowerCase().indexOf(answer.selection.toLowerCase()) > 0) {
                            console.log(JSON.stringify(answer.selection));
                            answer.iscorrect = true;
                        }
                        else {
                            answer.iscorrect = false;
                        }
                    }
                }
            });

        });

    };


    vm.displayResults = function (answers) {
        var strResult = '';
        vm.answers.forEach(function (answer) {
            console.log(JSON.stringify(answer));
            strResult = strResult +  'Question:' + answer.questionid + ' | Answer:' + JSON.stringify(answer.selection) + ' | Result:' + answer.iscorrect ? 'Correct\n' : 'InCorrect\n';
        });
        console.log(strResult);
    };

    vm.addUserAnswer = function (useranswers) {


        const hz = new Horizon();
        var messages = hz("UserAnswers");
        messages.findAll({ questionid: useranswers.questionid, userid: useranswers.userid }).fetch().mergeMap(function (messageList) {
            return messages.removeAll(messageList);
        }).subscribe(
        {
            next(id) { console.log('id  ${id} was removed') },
              error(err) { console.error('Error: ${err}') },
              complete() { console.log('All items removed successfully') }
        }
        );
        messages.store(useranswers);
        console.log('Updated');
    };
     
    

    vm.GoToPrevQuestion = function (useranswers, typ, qid, uid) {
          
        var uanswer = AnswerService.findById(uid, qid, testId).then(function (uanswer) {
                  console.log('next old uanswer ', uanswer);
          
                  if (uanswer == null) {
                      uanswer = {};
                      uanswer.testid = testId;
                      uanswer.questionid = qid;
                      uanswer.questionType = typ;
                      uanswer.userid = uid;
                      uanswer.selection = useranswers.selection;
                      uanswer.iscorrect = false;
                      uanswer.issubmit = false;
                      uanswer.isanswered = false;
                      AnswerService.insert(uanswer);
                      console.log("next old Inserted");

                  }
                  else {


                      console.log('PREVIOUS ', JSON.stringify(uanswer));
                      uanswer.selection = useranswers.selection;

                      AnswerService.update(uanswer);

                      
                  }
      
    
      
                  vm.currentQId = vm.currentQId - 1;
                  vm.question = {};
                  if (vm.currentQId >= 0) {
                      var questId = vm.test.qIds[vm.currentQId];
                      QuestionService.getById(questId).then(function (quest) {
                          var temp = JSON.stringify(quest);
                          vm.question = JSON.parse(temp);
     
                        
                          vm.useranswers.questionid = questId;
                          vm.useranswers.questionType = vm.question.questionType;
                          vm.useranswers.userid = uid;

     
              
                          var uanswer = AnswerService.findById(vm.useranswers.userid, vm.useranswers.questionid, testId).then(function (uanswer) {
                              console.log('next new uanswer ', uanswer);
          
                              if (uanswer == null) {
                                  vm.useranswers.questionid = questId;
                                  vm.useranswers.questionType = vm.question.questionType;
                                  vm.useranswers.userid = uid;
                                  vm.useranswers.selection = [];
                                  vm.useranswers.iscorrect = false;
                                  vm.useranswers.issubmit = false;
                                  vm.useranswers.isanswered = false;

                                 
                                  console.log("Next new not Inserted");
                              }
                              else {
                                  vm.useranswers.questionid = questId;
                                  if (vm.useranswers.questionType == 'mcq')
                                      vm.useranswers.selection = uanswer.selection.slice();
                                  else
                                      vm.useranswers.selection = uanswer.selection;
                                  vm.useranswers.iscorrect = false;
                                  vm.useranswers.issubmit = false;
                                  vm.useranswers.isanswered = false;

                                  vm.addUserAnswer(vm.useranswers);
                                  console.log("Next new not Updated");
                              }
                          });
                      });
                  };
              });




  };



  vm.GoToNextQuestion = function (useranswers, typ, qid, uid) {
              //old answer
      var uanswer = AnswerService.findById(uid, qid, testId).then(function (uanswer) {
          console.log('next old uanswer ', uanswer);
          
          if (uanswer == null) {
              uanswer = {};
              uanswer.testid = testId;
              uanswer.questionid = qid;
              uanswer.questionType = typ;
              uanswer.userid = uid;
              uanswer.selection = useranswers.selection;
              uanswer.iscorrect = false;
              uanswer.issubmit = false;
              uanswer.isanswered = false;
              AnswerService.insert(uanswer);
              console.log("next old Inserted");

          }
          else {


              console.log('NEXT ', JSON.stringify(uanswer));
              uanswer.selection = useranswers.selection;
              AnswerService.update(uanswer);

            
          }
      
    
      
      vm.currentQId += 1;
      console.log('nextval ', vm.currentQId);
      if (vm.currentQId <= vm.totalQuestCount - 1) {
          vm.question = {};
          var questId = vm.test.qIds[vm.currentQId];
          QuestionService.getById(questId).then(function (quest) {
              var temp = JSON.stringify(quest);
              vm.question = JSON.parse(temp);
     
      // debugger;
              vm.useranswers.questionid = questId;
              vm.useranswers.questionType = vm.question.questionType;
              vm.useranswers.userid = uid;

     
              
              var uanswer = AnswerService.findById(vm.useranswers.userid, vm.useranswers.questionid, testId).then(function (uanswer) {
          console.log('next new uanswer ', uanswer);
          
          if (uanswer == null) {
              vm.useranswers.questionid = questId;
              vm.useranswers.questionType = vm.question.questionType;
              vm.useranswers.userid = uid;
              vm.useranswers.selection = [];
              vm.useranswers.iscorrect = false;
              vm.useranswers.issubmit = false;
              vm.useranswers.isanswered = false;

            //  AnswerService.insert(uanswer);
              console.log("Next new not Inserted");
          }
          else {
              vm.useranswers.questionid = questId;
              if (vm.useranswers.questionType == 'mcq')
                  vm.useranswers.selection = uanswer.selection.slice();
              else
                  vm.useranswers.selection = uanswer.selection;
              vm.useranswers.iscorrect = false;
              vm.useranswers.issubmit = false;
              vm.useranswers.isanswered = false;

              vm.addUserAnswer(vm.useranswers);
              console.log("Next new  Updated");
                }
      });

     

     
          });
      };
      });
  };


 


  $scope.timerRunning = false;
  $scope.startTimer = function () {
      $scope.$broadcast('timer-start');
      $scope.timerRunning = true;
  };
  $scope.stopTimer = function () {
      if ($scope.timerRunning) {
          $scope.$broadcast('timer-stopped');
          $scope.timerRunning = false;
      }
  };
  $scope.stopTimerExplicitly = function () {
      $scope.timerRunning = false;
  };

  $scope.$on('timer-stopped', function (event, data) {
      console.log('Timer Stopped - data = ', data);
      $scope.timerRunning = false;
      vm.submit();
      alert("Time Completed!");
     

     
  });

  $scope.startTimer();


  

});