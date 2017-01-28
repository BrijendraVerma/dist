app.controller("UserController", function ($scope,$timeout, userService, $state) {

    $scope.error = "";

    $scope.submitted = false;

    $scope.createUser = function (user) {
       
        var result = userService.createUser(user);
      
       
        $scope.user.name = "";
        $scope.user.password = "";
        var $messageDiv = $('#msg');
        $messageDiv.style = 'color:red';
        $messageDiv.show().html('User created successfully!');
        setTimeout(function () { $messageDiv.hide().html(''); }, 5000);
        $scope.Message = 'User created successfully!';

        
    }

});