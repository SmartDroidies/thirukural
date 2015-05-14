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

kuralControllers.controller('ChapterCtrl', ['$scope',  '$http', '$routeParams', '_',
  function($scope, $http, $routeParams) {
	
	$scope.loadChapters = function () {       
		var section = $routeParams.section;
		console.log('Section : ' + section);
		$http.get('data/chapter.json').success(function(data) {
			$scope.section = _.find(data, function(sec){ return sec.section == section; })
    		$scope.chapters = $scope.section.chapters;
  		});
		//console.log('Load Chapters : ' + $scope.chapters);
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


