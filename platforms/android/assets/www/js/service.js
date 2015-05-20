/* Services */
var kuralServices = angular.module('kuralServices', []);

kuralServices.factory('cacheService', ['$cacheFactory', function ($cacheFactory) {
		return $cacheFactory('kural-cache');
	}
]);


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


//Factory for loading the kural from Local Storage
kuralServices.factory ('StorageService', function () {
	return {
		collectKural: function () {	
			var data =  window.localStorage.getItem("kural");
			console.log('Collecting kural from Local Storage');
			return JSON.parse(data);
		}
	}
}); 


//Factory for managing kural
kuralServices.factory ('KuralService', function (StorageService, _, cacheService) {
	var factory = {}; 
	
	factory.fetchKural = function() {
		var key = 'kural';
		var kurals = cacheService.get(key);
		if(!kurals) {
			kurals = StorageService.collectKural();
			if(kurals) {
				cacheService.put(key, kurals);
			}
		}
		return kurals;
	}
 
    factory.collectKuralList = function(subchapid) {
		var self = this;
		var kurals = self.fetchKural();
		if(kurals) {
			if(subchapid) {
				kurals = _.filter(kurals, function(item){ console.log(item.category); return true; });
			}	
			//articles = _.sortBy(articles, "post_date").reverse();
			console.log("Filtered Kural Length : " + kurals.length);
		}
		return kurals;
    }
	
    return factory;
}); 


