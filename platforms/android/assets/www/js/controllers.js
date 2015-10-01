'use strict';

/* Controllers */

var kuralControllers = angular.module('kuralControllers', []);

kuralControllers.controller('HomeCtrl', ['$scope', 'StorageService',
  function($scope, storageService) {
	
	$scope.loadHome = function () {       
		console.log('Home Screen Loaded');

		//Sync Local Data
		storageService.syncDate();

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
		//console.log('Section : ' + section);
		$http.get('data/chapter.json').success(function(data) {
			$scope.section = _.find(data, function(sec){ return sec.section == section; })
    		$scope.chapters = $scope.section.chapters;
    		$scope.chapter = $scope.chapters[0]; 
  		});
	};	

	$scope.listSubChapters = function (chapter) {       
		//var section = $routeParams.section;
		console.log('Chapters : ' + JSON.stringify(chapter));
		$scope.chapter = chapter; 
		/*
		$http.get('data/chapter.json').success(function(data) {
			$scope.section = _.find(data, function(sec){ return sec.section == section; })
    		$scope.chapters = $scope.section.chapters;
  		});
		*/
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
		//console.log('Section : ' + section + ", Chapter Id : " + chapterId);
		$http.get('data/chapter.json').success(function(data) {
			var sectionJson = _.find(data, function(sec){ return sec.section == section; })
    		var chapters = sectionJson.chapters;
    		var chapter = _.find(chapters, function(chap){ return chap.id == chapterId; })
    		$scope.chapter = chapter;
    		//console.log('Chapter : ' + $scope.chapter);
  		});
	};	

	//Show Chapters
	$scope.loadSubChapters();
  }]
);


kuralControllers.controller('KuralListCtrl', ['$scope', '$routeParams', 'KuralService',
  function($scope, $routeParams, kuralService) {
	
	$scope.listKural = function () {       
		var subChapId = $routeParams.subid;
		//console.log('List Kural For  : ' + subChapId);
		var kurals = kuralService.collectKuralList(subChapId);
		if (kurals === undefined || kurals === null) {
			console.log('JSON is empty. Display Error');
			//FIXME - Display Message
		} else {
			$scope.kurals = kurals;
		}
	};	

	//Show Chapters
	$scope.listKural();
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


