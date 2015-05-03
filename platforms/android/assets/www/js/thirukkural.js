//Device Ready Event
document.addEventListener("deviceready", onDeviceReadyAction, false);
function onDeviceReadyAction() {
	//console.log(cordova.file);
	//console.log(FileTransfer);
	var lastSyncTime = window.localStorage.getItem("sync_time");
	if (lastSyncTime) {
		//downloadLatestTips();
	} else {
		//loadInitialTips();	
	}

	// Manage Ad
	//showBannerAd();
	//initializeInterAd();
	
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
