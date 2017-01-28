app.factory("userService", function ($http, $q) {
    var tests = [{ name: "Brijendra" }, { name: "Rajesh" }];
 
    var createUser = function (user) {
        var userTable = horizon("Users");
        userTable.store(user);


                   
    }

    

    return {
        
        createUser: createUser
       
          
           
    }
})