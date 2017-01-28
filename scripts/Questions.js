var Question = {
    quizs: [
      
    ],

    refreshUI: function () {
        var elem = document.getElementById('quizs');
        var html = "";
        if (this.quizs.length === 0) {
            elem.innerHTML = "Please add option for above question!!!!!!";
            return;
        }
        var btnDelete = "<button class='btn btn-warning btn-sm' type='button' onclick='Question.remove(this)' class='btn'>remove</button>";

        for (var i = 0; i < this.quizs.length; i++) {
            var quiz = this.quizs[i];
            var style = "";
            html += "<li  ng-model='vm.question.choice' id=" + quiz.id + " class=" + style + ">" + this.quizs[i].task + btnDelete + "</li>";
        }

        elem.innerHTML = html;
    },
    add: function () {
        var quiz = document.getElementById('quiz').value;

        this.quizs.push({ id: quizs.length + 1, task: quiz });

      

        this.refreshUI();
    },
    
    remove: function (el) {
        el.parentNode.classList.remove("quiz-completed");

        var quizId = el.parentNode.id;

        var quizIndex;

        for (var i = 0; i < this.quizs.length; i++) {
            quizIndex = i;
            if (quiz.id == quizId) {
                break;
            }
        }

        this.quizs.splice(quizIndex, 1);


        Question.refreshUI();

    }
};

Question.refreshUI();



