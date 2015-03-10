var async = require('async');

module.exports = function(donna, cb) {

    donna.logger.info("Loading Built-in Plugins");

    // List of all plugins
    var plugins = donna.config.plugins || [];

    // Iterate thru all built-in plugins
    async.each(plugins, function(pluginPath, callback) {
        // Load current plugin
        donna.registerPlugin(pluginPath, callback);
    }, function(err){
        if( err ) {
            cb(err);
        } else {
            cb(null);
        }
    });

}
