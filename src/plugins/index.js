var async = require('async');

module.exports = function(donna, cb) {

    donna.logger.info("Loading Built-in Plugins");

    // List of all plugins
    var plugins = [
        "wit-ai",
        "sms"
    ];

    // Iterate thru all built-in plugins
    async.each(plugins, function(pluginName, callback) {
        // Load current plugin
        var pluginPath = "./plugins/"+pluginName;
        donna.registerPlugin(pluginPath, callback);
    }, function(err){
        if( err ) {
            cb(err);
        } else {
            cb(null);
        }
    });

}
