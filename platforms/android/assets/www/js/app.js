'use strict';
/* App Module */
var kuralApp = angular.module('kuralApp', ['ngRoute', 'ngSanitize', 'ngTouch', 'kuralControllers', 'kuralServices', 'pascalprecht.translate', 'underscore']);

kuralApp.config(['$routeProvider', 
		function ($routeProvider) {
			$routeProvider.when('/home', {
				templateUrl : 'partials/home.html',
				controller : 'HomeCtrl'
			}).
			when('/chapter/:section', {
				templateUrl : 'partials/chapters.html',
				controller : 'ChapterCtrl'
			}).
			when('/sub-chapter/:section/:id', {
				templateUrl : 'partials/sub-chapters.html',
				controller : 'SubChapterCtrl'
			}).
			when('/kural/:subid', {
				templateUrl : 'partials/kural-list.html',
				controller : 'KuralListCtrl'
			}).
			otherwise({
				redirectTo : '/home'
			});
		}
	]);

kuralApp.config(function ($translateProvider) {
        $translateProvider.translations('en', {
          TITLE: 'Thirukkural',
        });
        $translateProvider.translations('tn', {
          TITLE: '\u0ba4\u0bbf\u0bb0\u0bc1\u0b95\u0bcd\u0b95\u0bc1\u0bb1\u0bb3\u0bcd',
          HOME: '\u0bae\u0bc1\u0b95\u0baa\u0bcd\u0baa\u0bc1',
		  VALLUVAR: '\u0ba4\u0bbf\u0bb0\u0bc1\u0bb5\u0bb3\u0bcd\u0bb3\u0bc1\u0bb5\u0bb0\u0bcd',
		  ARATHU: '\u0b85\u0bb1\u0ba4\u0bcd\u0ba4\u0bc1\u0baa\u0bcd\u0baa\u0bbe\u0bb2\u0bcd', 
		  PORUT: '\u0baa\u0bca\u0bb0\u0bc1\u0b9f\u0bcd\u0baa\u0bbe\u0bb2\u0bcd',
		  KAMATHU: '\u0b95\u0bbe\u0bae\u0ba4\u0bcd\u0ba4\u0bc1\u0baa\u0bcd\u0baa\u0bbe\u0bb2\u0bcd'
        });
        $translateProvider.preferredLanguage('tn');
      });

