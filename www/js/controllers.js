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
	};	

	//Show Chapters
	$scope.loadChapters();
  }]
);

kuralControllers.controller('SubChapterCtrl', ['$scope',  '$http', '$routeParams', '_',
  function($scope, $http, $routeParams) {
	
	$scope.loadSubChapters = function () {       
		var section = $routeParams.section;
		var chapterId = $routeParams.id;
		console.log('Section : ' + section + ", Chapter Id : " + chapterId);
		$http.get('data/chapter.json').success(function(data) {
			var sectionJson = _.find(data, function(sec){ return sec.section == section; })
    		var chapters = sectionJson.chapters;
    		var chapter = _.find(chapters, function(chap){ return chap.id == chapterId; })
    		$scope.chapter = chapter;
    		console.log('Chapter : ' + $scope.chapter);
  		});
	};	

	//Show Chapters
	$scope.loadSubChapters();
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


