var app = angular.module('angularjsNodejsTutorial',[]);
app.controller('myController', function($scope, $http) {
    var url = window.location.href;
    var query = url.split('/')[3].split('%20').join(" ");
    $scope.data = [];
    $scope.title = '5 '+ query+' images';
    var request = $http.get('/data/'+query);
    request.success(function(data) {
        $scope.data = data.items.slice(0,5);
        var i = 1;
        angular.forEach($scope.data,(value,key)=>{
          value['id'] = query + i;
        });
        console.log($scope.data);;
    });
    request.error(function(data){
        console.log('Error: ' + data);
    });
    $scope.hovered = function(id){

    }
    $scope.clicked = function(id){

    }
});
