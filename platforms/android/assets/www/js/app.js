'use strict';
/* App Module */
var kuralApp = angular.module('kuralApp', ['ngRoute', 'ngSanitize', 'ngTouch', 'kuralControllers']);


kuralApp.config(['$routeProvider', 
		function ($routeProvider) {
			$routeProvider.when('/home', {
				templateUrl : 'partials/home.html',
				controller : 'HomeCtrl'
			})
			otherwise({
				redirectTo : '/home'
			});
		}
	]);

kuralApp.config(function ($translateProvider) {
        $translateProvider.translations('en', {
          TITLE: 'Thirukkural',
		  HEALTH_TIPS: 'Health Tips',
		  BEAUTY_TIPS: 'Beauty Tips',
		  KURAL: 'Kural',
          BUTTON_LANG_EN: 'english',
          BUTTON_LANG_DE: 'german'
        });
        $translateProvider.translations('tn', {
          TITLE: 'Thirukkural TN',
		  HEALTH_TIPS: '\u0b86\u0bb0\u0bc7\u0bbe\u0b95\u0bcd\u0b95\u0bbf\u0baf \u0b95\u0bc1\u0bb1\u0bbf\u0baa\u0bcd\u0baa\u0bc1\u0b95\u0bb3\u0bcd',
		  COOKING_TIPS: '\u0b9a\u0bae\u0bc8\u0baf\u0bb2\u0bcd \u0b95\u0bc1\u0bb1\u0bbf\u0baa\u0bcd\u0baa\u0bc1\u0b95\u0bb3\u0bcd', 
		  TREATMENT: '\u0ba8\u0bbe\u0b9f\u0bcd\u0b9f\u0bc1 \u0bb5\u0bc8\u0ba4\u0bcd\u0ba4\u0bbf\u0baf\u0bae\u0bcd',
		  BEAUTY_TIPS: '\u0b85\u0bb4\u0b95\u0bc1 \u0b95\u0bc1\u0bb1\u0bbf\u0baa\u0bcd\u0baa\u0bc1\u0b95\u0bb3\u0bcd',
		  KURAL: '\u0ba4\u0bbf\u0bb0\u0bc1\u0b95\u0bcd\u0b95\u0bc1\u0bb1\u0bb3\u0bcd',
          BUTTON_LANG_EN: 'englisch',
          BUTTON_LANG_DE: 'deutsch'
        });
        $translateProvider.preferredLanguage('tn');
      });

