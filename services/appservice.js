//var app  = angular.module("app");

app.factory('QuestionService', function ($q) {
    var questions = [];
    return {
        all: function () {
            var qtable = horizon("Questions");
            var questions = [];
            var defer = $q.defer();
            qtable.fetch().subscribe(function (data) {
                defer.resolve(data);
              //  console.log('service ', data);
                questions = data;

            });
            return defer.promise;
        },

        getAll: function (userid ,testid) {
            var qtable = horizon("UserAnswers");
            var ans = [];
            var defer = $q.defer();
            qtable.fetch({userid :userid ,testid :testid}).subscribe(function (data) {
                defer.resolve(data);
               // console.log('service ', data);
                ans = data;

                defer.resolve(data);
                return defer.promise;
            });
            return defer.promise;
        },
        add: function (question) {
            debugger;
          //  questions.push(question);
            var qtable = horizon("Questions");
            qtable.store(question);
           // console.log('done');
            console.log('QS:', JSON.stringify(questions));
        },
        getById: function (questId) {
            var defer = $q.defer();
            horizon('Questions').find(questId).fetch().toPromise().then(function (quest) {
              //  console.log("question : ", quest);

                defer.resolve(quest);
                return defer.promise;
            })
            return defer.promise;
           

        }
    };
});

app.factory('AnswerService', function ($q) {
    return {
        update: function (answer) {
                var qtable = horizon("UserAnswers");
                qtable.update({ id: answer.id, selection: answer.selection });
              //  console.log('update done');
        },
        updatesubmit: function (answer) {
            var qtable = horizon("UserAnswers");
            qtable.update({ id: answer.id, issubmit: answer.issubmit });
            //console.log('update done');
        },
        updateanswer: function (ansid, iscorrect)
        {
           // debugger;
            var qtable = horizon("UserAnswers");
            qtable.update({ id: ansid, iscorrect: iscorrect });
          //  console.log('result compare');
        },
        updatemarks: function (id) {
           
            var qtable = horizon("Tests");
            qtable.update({ id: id, iscalculated: true });
           //  console.log('result compare');
        },
        getBytestIduserid: function (testid, userid,userTest) {
            var defer = $q.defer();
            horizon('UserAnswers').findAll({ testid: testid, userid: userid }).fetch().toPromise().then(function (answer) {
                defer.resolve(answer);
                console.log('service', answer);
                var answersub = {};
                answersub.id = '';
                answersub.issubmit = false;
                for (var i = 0 ; i < answer.length; i++) {
                    answersub.id = answer[i].id;
                    answersub.issubmit = true;
                    var qtable = horizon("UserAnswers");
                    qtable.update({ id: answersub.id, issubmit: answersub.issubmit });
                   // console.log('UserAnswers update done');
                    if(i==0)
                    {
                        for(var k=0;k<userTest.length;k++)
                        {
                            if(answer[0].testid==userTest[k].testId)
                            {
                                var qtable1 = horizon("UserTests");
                                qtable1.update({ id: userTest[k].id, issubmit: answersub.issubmit });
                               // console.log('UserTests update done');
                            }
                        }
                    }
                }
                return defer.promise;
            })
            return defer.promise;


        },
        insert: function (answer) {
                var qtable = horizon("UserAnswers");
                qtable.store(answer);
                console.log('insert done');
        },
        findById: function (usrid, questId,testId) {
            var defer = $q.defer();
            horizon('UserAnswers').find({ userid: usrid, questionid: questId ,testid: testId}).fetch().toPromise().then(function (ans) {
                defer.resolve(ans);
                return defer.promise;
            });
            return defer.promise;
          
        }
    };
});


app.factory('TestsService', function ($q) {
    var tests = [];
   return {
        all: function () {
            var qtable = horizon("Tests");
            var tests = [];
            var defer = $q.defer();
            qtable.fetch().subscribe(function (data) {
                defer.resolve(data);
               // console.log('service ', data);
                tests = data;
            });
            return defer.promise;
        },
        allusertest: function () {
            var qtable = horizon("UserTests");
            var utests = [];
            var defer = $q.defer();
            qtable.fetch().subscribe(function (data) {
                defer.resolve(data);
               console.log('all user data 111 ', data);
                utests = data;
            });
            return defer.promise;
        },
        getTestById: function (testId) {
            var defer = $q.defer();
            horizon('Tests').find(testId).fetch().toPromise().then(function (test) {
                defer.resolve(test);
                return defer.promise;
            })
            return defer.promise;
        },
        add: function (test) {
            tests.push(test);
            var qtable = horizon("Tests");
            qtable.store(test);
            console.log('done');
        }
    };
});




