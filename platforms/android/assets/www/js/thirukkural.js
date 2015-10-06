//Device Ready Event
document.addEventListener("deviceready", onDeviceReadyAction, false);
function onDeviceReadyAction() {
	//console.log(cordova.file);
	//console.log(FileTransfer);
	/*
	var lastSyncTime = window.localStorage.getItem("sync_time");
	if (lastSyncTime) {
		downloadLatestKural();
	} else {
		loadInitialKural();	
	}
	*/

	// Manage Ad
	initializeAd();

	//Handle Menu 
	$( "#menu-cntrl" ).click(function() {
		if($("#menu").is(":visible")) {
			hidePopup();
			//$("#menu").hide(200);
		} else {
			$("#menu").show(300);
			$("#setting").hide(200);
		}
	});

	//Handle Menu 
	$( "#setting-cntrl" ).click(function() {
		if($("#setting").is(":visible")) {
			hidePopup();	
			//$("#setting").hide(200);
		} else {
			$("#setting").show(300);
			$("#menu").hide(200);
		}
	});


}


//Load Initial Kural
function loadInitialKural() {
	var fileURL =  "data/kural.json";
	jQuery.getJSON(fileURL, function (data) {
		console.log( "Loading Initial Kural...");
	}).done(function(data) {
		window.localStorage.setItem("sync_time_kural", data.time);
		window.localStorage.setItem("kural", JSON.stringify(data.tips));
	}).fail(function() {
		console.log( "Show Error Message" );
	}).always(function() {
		//var element = angular.element($("#tips-div"));
		//element.scope().loadTips();
		//element.scope().$apply();
	});
}

// Function to download latest Kural JSON
function downloadLatestKural() {
	var message = "Synchronizing Latest Kurals...";
	var fileTransfer = new FileTransfer();
	var uri = encodeURI("http://thirukkural.careerwrap.com/?json=y");
	var lastSyncTime = window.localStorage.getItem("sync_time_kural");
	if(lastSyncTime) {
		uri = encodeURI("http://thirukkural.careerwrap.com/?json=y&ts=" + lastSyncTime);
	} 
	var fileURL = cordova.file.cacheDirectory + "/kural.json";
	console.log("Download URL : " + uri);
	fileTransfer.download(uri, fileURL, function (entry) {
		console.log("download complete: " + entry.toURL());
		syncLocalStorage(fileURL);
	}, function (error) {
		console.log("download error source " + error.source);
		console.log("download error target " + error.target);
		console.log("Download Error : " + error.code + " - " + error.exception);
		console.log("http_status " + error.http_status);
	},false);
}

//Sync Temp JSON
function syncLocalStorage(file) {
	//console.log("Temp JSON URL : " + file);
	jQuery.getJSON(file, function (data) {
		if (!angular.isUndefined(data)) {
			var localTips =  window.localStorage.getItem("kural");
			var localJSON = JSON.parse(localTips);
			var newJSON = [];
			//console.log("Initial Array Size : " + _.size(localJSON));
			$.each(data.tips, function(key, item) {
				console.log(key + " - " + JSON.stringify(item));
				var newTip = true;
				_.find(localJSON,function(rw, rwIdx) { 
					if(rw.id == item.id) { 
						//console.log ("Replace Existing Object for : " + key); 
						localJSON[rwIdx] = item;
						newTip = false; 
						return true;
					}; 
				});
				//If new tip
				if(newTip) {
					//console.log("New Object for : " + key + " - " + JSON.stringify(item));
					//console.log("Array Size : " + _.size(localJSON));
					localJSON.push(item);
					newJSON.push(item);
					//console.log("Modified Array Size : " + _.size(localJSON));
				} 
			});
			//console.log("New Array Size : " + _.size(newJSON));
			//console.log("Modified Array Size : " + _.size(localJSON));
			window.localStorage.setItem("kural", JSON.stringify(localJSON));
			var modifiedTime = data.time;
			if(typeof modifiedTime != 'undefined') {
				window.localStorage.setItem("sync_time_kural", data.time);
			}
		}	
		//var element = angular.element($("#main"));
		//element.scope().collectStatistics();
		//element.scope().$apply();
		//console.log("Hide Indicator on download complete");
		//ActivityIndicator.hide();
	}).fail(function () {
		console.log("Show Error Message");
		//ActivityIndicator.hide();
	}).always(function () {
		//ActivityIndicator.hide();
	});
}



function hidePopup() {
	hideMenu();
	hideSetting();
}

function hideMenu() {
	$("#menu").hide(200);
}

function hideSetting() {
	$("#setting").hide(200);
}



function initializeAd() {

	admob.initAdmob("ca-app-pub-8439744074965483/1680062851","ca-app-pub-8439744074965483/6529064851");
    document.addEventListener(admob.Event.onInterstitialReceive, onInterstitialReceive, false);
    document.addEventListener(admob.Event.onInterstitialFailedReceive,onReceiveFail, false);
    document.addEventListener(admob.Event.onBannerFailedReceive,onReceiveFail, false);

    admob.showBanner(admob.BannerSize.SMART_BANNER, admob.Position.BOTTOM_CENTER, null);
  	admob.cacheInterstitial();

}

//Load AdMob Interstitial Ad
function showInterstitial(){
    admob.isInterstitialReady(function(isReady){
        if(isReady){
            admob.showInterstitial();
        }
    });
}

function onInterstitialReceive (message) {
    //alert(message.type + " ,you can show it now");
    //admob.showInterstitial();//show it when received
}

function onReceiveFail (message) {
 	var msg=admob.Error[message.data];
    if(msg==undefined){
       msg=message.data;
    }
    //console.log("load fail: " + message.type + "  " + msg);
} 
