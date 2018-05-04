var app = angular.module('angularjsNodejs',[]);
app.controller('myController',function($scope, $http) {
    var url = window.location.href;
    var query = url.split('/')[3].split('%20').join(" ");
    $scope.data = [];
    $scope.title = '5 '+ query + ' Images';
    var request = $http.get('/data/'+query);
    request.success(function(data) {
        $scope.data = data.items.slice(0,5);
        var i = 1;
        angular.forEach($scope.data,(value,key)=>{
          value['id'] = query + ':' + i;
          i++;
        });
        // console.log($scope.data);
    });
    request.error(function(data){
        console.log('Error: ' + data);
    });
    $scope.hovered = function(item){
      $http.post('/data/' + item.id + '/hover').success((data)=>{
        console.log("Hovered data stored!");
      }).error((data)=>{
        console.log('Error: ' + data);
      });
    }
    $scope.clicked = function(item){
      $http.post('/data/' + item.id + '/click').success((data)=>{
        console.log("Clicked data stored!");
      }).error((data)=>{
        console.log('Error: ' + data);
      });
    }
});
