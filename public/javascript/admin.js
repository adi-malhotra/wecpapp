var app = angular.module('angularjsNodejsTutorial',[]);
app.controller('adminController', function($scope, $http) {
  var url = window.location.href
  var query = url.split('/')[3];
  $scope.data = [];
  var request = $http.get(query+'/admin');
  request.success(function(data) {
      $scope.data = data;
      console.log(data);
  });
  request.error(function(data){
      console.log('Error: ' + data);
  });
});
