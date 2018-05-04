var app = angular.module('angularjsNodejs',[]);
app.controller('adminController', function($scope, $http) {
  var url = window.location.href
  var query = url.split('/')[3];
  $scope.data = [];
  $scope.title = "Admin for " + query;
  // console.log(url);
  var request = $http.get(query + '/data/admin');
  request.success(function(data) {
      $scope.data = data;
  });
  request.error(function(data){
      console.log('Error: ' + data);
  });
});
