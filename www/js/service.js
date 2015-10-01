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
	var storageFactory = {}; 
	var keyKurals =  "kurals";
	var keySyncTime =  "sync_time_kural";
	var keySyncVersion =  "sync_version_kural";
	var synced;


	//Collect Kurals from storage
	storageFactory.collectKural = function () {	
		var data =  window.localStorage.getItem(keyKurals);
		console.log('Collecting kural from Local Storage');
		return JSON.parse(data);
	}

	//Sync Kurals
	storageFactory.syncDate = function() {
		var self = this;
		var fileURL =  "data/kural.json";
		//var syncTime =  window.localStorage.getItem(keySyncTime);
		var version = window.localStorage.getItem(keySyncVersion);
		
		jQuery.getJSON(fileURL, function (data) {
			//console.log("Loading Quotes from FileSystem");
		}).done(function(data) {
			if(!version || data.version > version) {
				console.log("Updating Local Storage from filesystem");
				window.localStorage.setItem(keySyncTime, data.time);
				window.localStorage.setItem(keySyncVersion, data.version);
				window.localStorage.setItem(keyKurals, JSON.stringify(data.kurals));
			}	
		}).fail(function(jqXHR, textStatus, errorThrown) {
			console.log("Show Error Message - " + textStatus);
		}).always(function() {
			
		});

		//FIXME - Do it one for each session
		if(!synced) {
			var uri = encodeURI("http://thirukkural.careerwrap.com/?json=y");
			var lastSyncTime = window.localStorage.getItem(keySyncTime);
			if(lastSyncTime) {
				lastSyncTime = lastSyncTime - 18000;
				uri = encodeURI("http://thirukkural.careerwrap.com/?json=y&ts=" + lastSyncTime);
			} 
			console.log("Download URL : " + uri);
			console.log("Synced Flag : " + synced);
			jQuery.getJSON(uri, function (data) {
				//console.log("Loading Latest Articles from Server");
			}).done(function(data) {
				//console.log("Fresh Data " + JSON.stringify(data));
				self.syncLocalStorage(data);
				synced = true;
			}).fail(function(jqXHR, textStatus, errorThrown) {
				console.log("Show Error Message - " + textStatus);
			}).always(function() {
				
			});
		}	
	}

	//Sync Temp JSON
	storageFactory.syncLocalStorage = function(remoteJSON) {	
		var localKurals =  window.localStorage.getItem(keyKurals);
		var localJSON = JSON.parse(localKurals);
		console.log("Modified Array Size : " + _.size(remoteJSON));		
		console.log("Local Array Size : " + _.size(localJSON));		
		if(_.size(remoteJSON) >  0) {
			$.each(remoteJSON.tips, function(key, item) {
				var newKural = true;
				_.find(localJSON,function(rw, rwIdx) { 
					if(rw.id == item.id) { 
						console.log ("Replace Existing Object for : " + item.id); 
						localJSON[rwIdx] = item;
						newKural = false; 
						return true;
					}; 
				});
				//If new kural
				if(newKural) {
					console.log("New Object for : " + key + " - " + JSON.stringify(item));
					item.new = true;
					localJSON.push(item);
				} 
			});
			window.localStorage.setItem(keyQuotes, JSON.stringify(localJSON));
			var modifiedTime = remoteJSON.time;
			if(typeof modifiedTime != 'undefined') {
				window.localStorage.setItem(keySyncTime, remoteJSON.time);
			}
		}	
	}


	return storageFactory;
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
				kurals = _.filter(kurals, function(item) { 
					return _.contains(item.category, parseInt(subchapid)); 
				});
			}	
			//articles = _.sortBy(articles, "post_date").reverse();
			//console.log("Filtered Kural Length : " + kurals.length);
		}
		return kurals;
    }
	
    return factory;
}); 


