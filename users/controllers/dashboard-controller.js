app.controller('DashboardController', function ($scope,$timeout, dashboardService, QuestionService,AnswerService,TestsService, $rootScope, $state) {

    var allQuestions = [];
    var allAnswers = [];
    var allftest = [];
    var testtime = 0;

    dashboardService.getMyTests($rootScope.loginState.userId, $rootScope.loginState.role).then(function (data) {

        $scope.assignedTests = data;
       
        console.log("$scope.assignedTests", $scope.assignedTests);

        })

    TestsService.all().then(function (alltests) {
        allftest = alltests;
        $scope.AllTests = alltests;
    })

    $scope.startTest = function (testId) {
      
        for (var i = 0; i < allftest.length; i++)
        {
            if (allftest[i].id == testId) {
                testtime = allftest[i].testTime;
            }
        }
        var test = { id: testId, time: testtime };
        $state.go('runTest', test);
    }

    QuestionService.all().then(function (quest) {
        allQuestions = quest;
       // console.log('Result Calculate',quest);


    });

    const hz = new Horizon();
    const channels = hz("UserAnswers");
    channels.watch().subscribe(allAnswer => {
        allAnswers = allAnswer;
      //  console.log('allAnswers: ', allAnswers);
    });


    $scope.showresult = function () {

        // var test ='';
        $state.go("results");
        //console.log('Test Result');
        // $location.path('/templates/results.html');
    }
    $scope.showrall = function () {
              
        // var test ='';
        $state.go("allresults");
        //console.log('Test Result');
        // $location.path('/templates/results.html');
    }



    $scope.calculateTestResults = function (testId)
    {
       
        var correctans = [];
        var questAns = [];
        var userAns = [];
        var cmplen = 0;
        var arrtest = [];
      
        for (var i = 0; i < allAnswers.length; i++)
        {
            if (allAnswers[i].testid == testId)
            {
                for (var j = 0; j < allQuestions.length; j++) {

                    if (allQuestions[j].id == allAnswers[i].questionid) {
                       
                        if (allAnswers[i].questionType == 'mcq')
                        {
                            cmplen = 0;
                           
                            questAns = allQuestions[j].answer.split(',');
                            userAns = allAnswers[i].selection.slice();
                            for (var o = 0; o < questAns.length; o++)
                            {
                                for (var n = 0; n < userAns.length; n++)
                                {
                                    if (questAns[o].toLowerCase() == userAns[n].toLowerCase())
                                    {
                                        cmplen = cmplen + 1;
                                    }
                                }
                            }

                            if (cmplen > 0 && cmplen == questAns.length && questAns.length == questAns.length)
                            {
                                correctans.push({ questionid: allAnswers[i].questionid, userid: allAnswers[i].userid, iscorrect: true, id: allAnswers[i].id, testid: allAnswers[i].testid})
                            }
                        }
                        else if (allAnswers[i].questionType == 'boolean') {
                            
                            if (allQuestions[j].answer.toLowerCase() == allAnswers[i].selection.toLowerCase())
                            {
                                correctans.push({ questionid: allAnswers[i].questionid, userid: allAnswers[i].userid, iscorrect: true, id: allAnswers[i].id, testid: allAnswers[i].testid})
                            }
                        }
                        else if (allAnswers[i].questionType == 'numeric') {
                          
                            if (allQuestions[j].answer == allAnswers[i].selection) {
                                correctans.push({ questionid: allAnswers[i].questionid, userid: allAnswers[i].userid, iscorrect: true, id: allAnswers[i].id, testid: allAnswers[i].testid })
                            }

                        }
                        else if (allAnswers[i].questionType == 'text') {

                            if (allQuestions[j].answer == allAnswers[i].selection) {
                                correctans.push({ questionid: allAnswers[i].questionid, userid: allAnswers[i].userid, iscorrect: true, id: allAnswers[i].id, testid: allAnswers[i].testid })
                            }

                        }
                       
                    }


                }
            }

        }
       
      
        for (var k=0;k<correctans.length;k++)
        {
            AnswerService.updateanswer(correctans[k].id, correctans[k].iscorrect);
           
        }

       
        for (var p=0;p<allftest.length;p++)
        {
            if(testId==allftest[p].id)
            {
                AnswerService.updatemarks(allftest[p].id);
                break;
            }
        }
       
        var $messageDiv = $('#msg');
        $messageDiv.style = 'color:red';
        $messageDiv.show().html('Test calculated successfully!');
        setTimeout(function () { $messageDiv.hide().html(''); }, 5000);
        $scope.Message = 'Test calculated successfully.';
    }
})