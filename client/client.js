var app = angular.module('myApp', []);


app.controller('recipes', function($scope) {
    $scope.msg = "JOHN";
});

/*
app.controller('recipes', function($scope, $http) {
  
  $scope.msg = "Hello World";
  
  $http({
    method: 'GET',
    url: 'https://resitassignment.herokuapp.com/api/'
  }).then(function successCallback(response) {

    $scope.msg = response.data;


  }, function errorCallback(response) {
    // 请求失败执行代码
    $scope.msg = Error;
  });

});
*/