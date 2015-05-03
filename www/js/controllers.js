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

