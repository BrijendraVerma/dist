
app.controller("AssignedTestController", function ($scope,$timeout, loginService,assignedTestService, TestsService) {

    $scope.users = [];
    var existuser = [];
    var testassignusers = [];
    var testselusers = [];
    $scope.userSelection = [];
    loginService.getAllUsers().then(function (data) {
        $scope.users = data;
    })

   // $scope.existingUserTests = [];

    TestsService.all().then(function (data) {
        $scope.tests = data;
      //  console.log('tests', data);
    })

    TestsService.allusertest().then(function (data) {
        testassignusers = data;
        console.log('all user test', data);
    })

    $scope.assignTest = function () {
       
        TestsService.allusertest().then(function (data) {
            testassignusers = data;
            console.log('Add.....', data);
    
       // console.log("checkedUsers", $scope.userSelection);
       // console.log("assignedTests", $scope.assignedTest);
        var assignedTestName = "";

       
        $.each($scope.tests, function (i, test) {           
            if (test.id == $scope.assignedTest) {
                assignedTestName = test.testName;
            }            
        })
        testselusers = [];
        var addtest = {};
        addtest.userId = '';
        addtest.id = '';

        for (var k = 0; k < testassignusers.length; k++)
        {

            if(testassignusers[k].testId==$scope.assignedTest)
            {
                addtest.userId = testassignusers[k].userId;
                addtest.id = testassignusers[k].id;
                testselusers.push(addtest);
                addtest = {};
            }
        }

        var userTests = [];
        var userTests1 = [];
        var blnFound = true;
        var utadd = {};
        utadd.id = '';

        $.each($scope.userSelection, function (i, item) {
            blnFound = false;
            for (var j = 0; j < testselusers.length; j++)
            {
                
                if (testselusers[j].userId == item)
                {
                    blnFound = true;
                    break;
                }
              
               
            }
           
            if (blnFound == false)
            {
                userTests.push({ 'userId': item, 'testId': $scope.assignedTest, "testName": assignedTestName, "issubmit": 'false', "Marks": 0 });
            }
           
           
           // $scope.existingUserTests
        })
        var blnF = false;
        var adduserid = {};
        adduserid.id = '';
       
        for (var p = 0; p < testselusers.length; p++)
        {
            blnF = false;
            $.each($scope.userSelection, function (i, item) 
            {
                if(testselusers[p].userId==item)
                {
                    blnF = true;
                  
                }
              
                   
            })
                if(blnF==false)
                {
                    adduserid.id = testselusers[p].id;
                    userTests1.push(adduserid);
                    adduserid = {};
                }
            
        }
      
        assignedTestService.assignTests(userTests, userTests1);
        })
     
        var $messageDiv = $('#msg');
        $messageDiv.style = 'color:red';
        $messageDiv.show().html('Test assign successfully!');
        setTimeout(function () { $messageDiv.hide().html(''); }, 5000);
        $scope.Message = 'Test assign successfully.';
    }


    $scope.getSelectedUsersforTest = function (testId) {
        $scope.userSelection = [];
        assignedTestService.getSelectedUsersforTest(testId).then(function (data) {
           // $scope.existingUserTests = data;
            $.each(data, function (i, item) {
                $scope.userSelection.push(item.userId);
            })
            

            //$scope.$apply();
        })
    }

    $scope.toggleSelection = function toggleSelection(userId) {
        var idx = $scope.userSelection.indexOf(userId);

        // is currently selected
        if (idx > -1) {
            $scope.userSelection.splice(idx, 1);
        }

            // is newly selected
        else {
            $scope.userSelection.push(userId);
        }
    };

})