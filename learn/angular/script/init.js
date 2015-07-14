/**
* demoApp Module
*
* Description
*/
var app=angular.module('myapp', []);
app.controller('listCtrl',function($scope,$http,$filter){
    $scope.$watch("keyword",function(newV,oldV){
        if(newV!==oldV){
            $scope.hasItem=$filter("filter")($scope.rankFilteredList,$scope.keyword).length>0?true:false;
        }
    });
    $http.jsonp("http://qq.100bt.com/activity/20150123/fightRank.jsonp?callback=JSON_CALLBACK").success(function(data){
            $scope.rankFilteredList=data.list;
            $scope.hasItem=data.list.length>0?true:false;
    });
})
