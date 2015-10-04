cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/admob/www/AdmobPlugin.js",
        "id": "admob.AdmobAd",
        "clobbers": [
            "window.admob"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "admob": "5.2.0"
}
// BOTTOM OF METADATA
});