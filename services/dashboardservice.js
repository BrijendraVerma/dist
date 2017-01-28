app.factory("dashboardService", function ($http, $rootScope, $q) //sessionService, rememberMeService
{
    var getMyTests = function (userId,role) {
        var userTestTable = horizon("UserTests");
        //var myTests = [];
        var defer = $q.defer();
        var tfilter = { 'userId': userId, 'issubmit': 'false' };
        if (role == 'admin')
        {
            tfilter = { 'userId': userId };
        }
        userTestTable.findAll(tfilter).fetch().subscribe(function (data) {
            defer.resolve(data);
            console.log('getMyTests ', data);
          //  myTests = data;

        });
        return defer.promise;
    }

    return {        
        getMyTests: getMyTests
    }
})