app.factory("assignedTestService", function ($http, $rootScope, $q) //sessionService, rememberMeService
{
    var assignTests = function (userTests, userTests1) {
        var userTestsTable = horizon("UserTests");
       // userTestsTable.findAll({ testId: testId }).fetch().toPromise().then(function (userTests) {
            $.each(userTests1, function (i, userTest1) {
                console.log('inner', userTests1)
                userTestsTable.remove({ id: userTest1.id });
           // })
            
        });
       // console.log('outter',userTests)
        userTestsTable.store(userTests);
    }

    var getSelectedUsersforTest = function (testId) {
        var userTestTable = horizon("UserTests");
        //var myTests = [];
        var defer = $q.defer();
        userTestTable.findAll({ 'testId': testId }).fetch().subscribe(function (data) {
            defer.resolve(data);
            console.log('getSelectedUsersforTest ', data);
            //myTests = data;

        });
        return defer.promise;
    }
    return {
        // loginState: loginState,
        assignTests: assignTests,
        getSelectedUsersforTest: getSelectedUsersforTest
    }

})