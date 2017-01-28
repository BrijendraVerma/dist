var Answer = {
    anws: [
      
    ],

    refreshUI: function () {
        var elem = document.getElementById('anws');
        var html = "";

        console.log(this.anws.length);
        if (this.anws.length === 0) {
            elem.innerHTML = "Please add answer for above question!!!";
            return;
        }
      

        var btnDelete = "<button class='btn btn-danger btn-sm'  type='button' onclick='Answer.remove(this)' class='btn'>remove</button>";

        for (var i = 0; i < this.anws.length; i++) {
            var anw = this.anws[i];
            var style = "";

            html += "<li id=" + anw.id + " class=" + style + ">" + this.anws[i].task + btnDelete + "</li>";
        }

        elem.innerHTML = html;
    },
    add: function () {
        var anw = document.getElementById('anw').value;

        this.anws.push({ id: anws.length + 1, task: anw });

       

        this.refreshUI();
    },
  
    remove: function (el) {
        el.parentNode.classList.remove("anw-completed");

        var anwId = el.parentNode.id;

        var anwIndex;

        for (var i = 0; i < this.anws.length; i++) {
            anwIndex = i;
            if (anw.id == anwId) {
                break;
            }
        }

        this.anws.splice(anwIndex, 1);


        Answer.refreshUI();

    }
};

Answer.refreshUI();



