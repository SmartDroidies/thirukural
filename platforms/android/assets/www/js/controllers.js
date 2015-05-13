'use strict';

/* Controllers */

var kuralControllers = angular.module('kuralControllers', []);

kuralControllers.controller('HomeCtrl', ['$scope', 
  function($scope) {
	
	$scope.loadHome = function () {       
		console.log('Home Screen Loaded');
		$scope.status = 'Welcome User';
	};	

	//Show Home
	$scope.loadHome();
  }]
);

kuralControllers.controller('ChapterCtrl', ['$scope',  '$http',
  function($scope,  $http) {
	
	$scope.loadChapters = function () {       
		console.log('Load Chapters');
		$http.get('data/chapter.json').success(function(data) {
    		$scope.chapters = data;
  		});
		console.log('Load Chapters : ' + $scope.chapters);
	};	

	//Show Chapters
	$scope.loadChapters();
  }]
);


kuralControllers.controller('ChapterCtrlOld', ['$scope', 'ChapterService',
  function($scope, chapterService) {
	
	$scope.loadChapters = function () {       
		console.log('Load Chapters');
		$scope.chapters = chapterService.collectChapters();
		console.log('Load Chapters : ' + $scope.chapters);
	};	

	//Show Chapters
	$scope.loadChapters();
  }]
);


