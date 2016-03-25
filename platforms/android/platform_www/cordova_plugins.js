cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/admob/www/AdmobPlugin.js",
        "id": "admob.AdmobAd",
        "pluginId": "admob",
        "clobbers": [
            "window.admob"
        ]
    },
    {
        "file": "plugins/cordova-plugin-whitelist/whitelist.js",
        "id": "cordova-plugin-whitelist.whitelist",
        "pluginId": "cordova-plugin-whitelist",
        "runs": true
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "admob": "5.2.0",
    "cordova-plugin-whitelist": "1.0.0"
}
// BOTTOM OF METADATA
});