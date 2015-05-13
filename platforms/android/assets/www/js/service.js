/* Services */
var kuralServices = angular.module('kuralServices', []);

//Factory for collecting category
kuralServices.factory ('ChapterService', ['$http', function ($http) {
	var factory = {}; 
	
	//Collect Chapters
    factory.collectChapters = function() {
    	$http.get('data/chapter.json').success(function(response) {
		    chapters = response;
		    return chapters;
  		});
    }
	
    return factory;
}]); 

