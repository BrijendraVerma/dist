app.factory('ResultService', function ($q) {
    var allresult = [];
    return {
        all: function () {
            var qtable = horizon("Tests");
            var alltests = [];
            var defer = $q.defer();
            qtable.fetch().subscribe(function (data) {
                defer.resolve(data);
              //  console.log('service', data);
                alltests = data;

            });
            return defer.promise;
        },
        allUserAnswers: function () {
            var qtable = horizon("UserAnswers");
            var allresult = [];
            var defer = $q.defer();
            qtable.order("userid", "ascending").fetch().subscribe(function (data) {
                defer.resolve(data);
                //  console.log('service', data);
                allresult = data;

            });
            return defer.promise;
        },

        allUsers: function () {
            var qtable = horizon("Users");
            var users = [];
            var defer = $q.defer();
            qtable.fetch().subscribe(function (data) {
                defer.resolve(data);
                //  console.log('service', data);
                users = data;

            });
            return defer.promise;
        }

    }
});