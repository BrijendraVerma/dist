app.controller('ResultsController', function ($scope, $rootScope, $state, ResultService) {
    $scope.items = [];
    var allusers = [];
    var alluseranswers = [];
    var alltest = [];
    var userlist = [];
    var rs = [];
    $scope.lists = [];
    $scope.users = [];
     
  
    ResultService.all().then(function (tests) {
        $scope.items = tests;
        alltest= tests;
      //  console.log($scope.items);
    });

    ResultService.allUsers().then(function (users) {
        allusers = users;
        $scope.users = allusers;
      //  console.log('users',users);
    });

    ResultService.allUserAnswers().then(function (useranswers) {
        alluseranswers = useranswers;
      //  console.log(useranswers);
    });

    $scope.username = function (userid) {
        var username = '';
        for (var i = 0; i < allusers.length; i++)
        {
            if(userid==allusers[i].id)
            {
                
                username = allusers[i].name;
                break;
            }
        }
        return username;
    }

    $scope.testname = function (testid) {
        var testname = '';
        for (var i = 0; i < alltest.length; i++) {
            if (testid == alltest[i].id) {

                testname = alltest[i].testName;
                break;
            }
        }
        return testname;
    }

    $scope.resultshow = function (val)
    {
        $scope.lists = [];
        rs = [];
       
        var row = {};
        row.userid = '';
        row.username = '';
        row.testid = '';
        row.testname = '';
        row.marks = 0;
        for(var i=0;i<alltest.length;i++)
        {
            if (alltest[i].id == val)
            {
                for (var j = 0; j < alluseranswers.length; j++)
                {
                    if (alluseranswers[j].testid == val)
                    {
                        row = {};
                        row.username = $scope.username(alluseranswers[j].userid);
                        row.userid = alluseranswers[j].userid;
                        row.testid = val;

                        if (alluseranswers[j].iscorrect == true)
                        {
                            row.marks = 1;
                            rs.push(row);
                        }
                       
                    }
                }
            }
        }

        $scope.IsVisible = true;
       
        var uname = '';
        var glist = [];
        var grow = {};
        grow.username = '';
        grow.marks = 0;
        var total = 1;
        var id = 0;
        var blnFound = false;
       
        for (var r = 0; r < rs.length; r++)
        {
           
            uname = rs[r].username;
            
            if (r < rs.length-1)
            {
                id = id + 1;
            }
           
            if(rs[r].username==rs[id].username && r!=id)
            {
                total += 1;
                blnFound = true;
                if (r == rs.length - 1)
                {
                    grow.username = uname;
                    grow.marks = total;
                    glist.push(grow);
                    total = 1;
                  //  console.log(grow);
                    grow = {};
                }
            }
            else
            {
                if (blnFound == true)
                {
                    
                    grow.username = uname;
                    grow.marks = total;
                    glist.push(grow);
                  //  console.log(grow);
                    grow = {};
                    total = 1;
                   
                }

                if (blnFound == false)
                {
                    grow.username = uname;
                    grow.marks = total;
                    glist.push(grow);
                  //  console.log(grow);
                    grow = {};
                    total = 1;
                   
                }
               

                blnFound = false;

            }
           
        }
      
        $scope.lists = glist;
       // $scope.lists = rs;
      //  console.log('Lists',$scope.lists);

    }

    $scope.showall = function (val)
    {
        userlist = [];
        $scope.lists = [];
        rs = [];
       
        var row = {};
        row.userid = '';
        row.username = '';
        row.testid = '';
        row.testname = '';
        row.marks = 0;
        row.markdtls = '';
        var total = 0;

        var uname = '';
        var glist = [];
        var grow = {};
        grow.username = '';
        grow.testname = '';
        grow.testid = '';
        grow.userid = '';
        grow.marks = 0;
        grow.markdtls = '';
        var blnFound = false;

        debugger;
        if(val=='All')
        {
           
             
            for (var j = 0; j < alluseranswers.length; j++)
            {
                           row = {};
                            row.username = $scope.username(alluseranswers[j].userid);
                            row.userid = alluseranswers[j].userid;
                            row.testid = val;
                            row.testname = $scope.testname(alluseranswers[j].testid);
                            if (alluseranswers[j].iscorrect == true)
                            {
                                row.marks = 1;
                                row.markdtls = row.username + '     ' + row.testname;
                                rs.push(row);


                            }
                            
            }

            for(var j=0;j<allusers.length;j++)
            {
                for (var m = 0; m < alltest.length; m++)
                {
                    total = 0;
                    blnFound = false;
                for(var k=0;k<rs.length;k++)
                {
                    if(allusers[j].name==rs[k].username && rs[k].testname==alltest[m].testName)
                    {
                        grow = {};
                        total += 1;
                        blnFound = true;
                        grow.username = allusers[j].name;
                        grow.testname = alltest[m].testName;
                        grow.testid = rs[k].testid;
                        grow.userid = rs[k].userid;
                        grow.marks = total;
                        grow.markdtls=grow.username + ' ' + grow.testname 
                    }
                }
                if(blnFound==true)
                {
                    glist.push(grow);
                }

                }
            }
            $scope.IsAll = true;
            $scope.IsVisible = false;
            
        }
        else
        {
            for (var j = 0; j < alluseranswers.length; j++) {
                row = {};
                row.username = $scope.username(alluseranswers[j].userid);
                row.userid = alluseranswers[j].userid;
                row.testid = val;
                row.testname = $scope.testname(alluseranswers[j].testid);
                if (alluseranswers[j].iscorrect == true) {
                    row.marks = 1;
                    row.markdtls = row.username + '     ' + row.testname;
                    rs.push(row);


                }

            }

               
                for (var m = 0; m < alltest.length; m++) {
                    total = 0;
                    blnFound = false;
                    for (var k = 0; k < rs.length; k++) {
                        if (val == rs[k].userid && rs[k].testname == alltest[m].testName) {
                            grow = {};
                            total += 1;
                            blnFound = true;
                            grow.username = rs[k].username;
                            grow.testname = alltest[m].testName;
                            grow.testid = rs[k].testid;
                            grow.userid = rs[k].userid;
                            grow.marks = total;
                            grow.markdtls = grow.testname
                        }
                    }
                    if (blnFound == true) {
                        glist.push(grow);
                    }


                }
                $scope.IsAll = false;
                $scope.IsVisible = true;

        }

       
        $scope.lists = glist;
    };
});