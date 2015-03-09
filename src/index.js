var winston = require('winston');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');

var Donna = module.exports = (function() {

    // Donna.logger = null;
    //
    // Donna.intentEmitter = null;
    //
    // Donna.options = null;

    Donna.prototype.defaultOptions = {
        logger: {
            colorize: true,
            timestamp: true,
            showLevel: true,
            level: "debug"
        }
    };

    function Donna(options) {

        // Merge options and defaults
        options = typeof options === "undefined" ? {} : options;
        this.options = _.cloneDeep(Donna.prototype.defaultOptions);
        _.merge(this.options, options);

        return this;
    }


    Donna.prototype.registerPlugin = function(plugin, cb) {

        if (typeof plugin === "string") {
            this.logger.debug("Register plugin", plugin);
            require(plugin)(this);
            cb();
        } else if (typeof plugin === "function") {
            plugin(this);
            cb();
        } else {
            var err = new Error("Plugin not supported. Type "+typeof plugin);
            this.logger.error(err);
            cb(err);
        }

    };

    Donna.prototype.setupLogger = function() {
        // Setup Logger
        var options = this.options.logger;
        var logger = new(winston.Logger);
        logger.add(winston.transports.Console, options);
        // Attach logger to Donna
        this.logger = logger;
        logger.debug("Logger initialized");
    };

    Donna.prototype.init = function() {
        var self = this;
        this.setupLogger();
        this.logger.info("Initializing Donna");

        var cb = function() {
            self.logger.info("Done initializing Donna");
        };

        // Initialize Event Emitters
        this.intentEmitter = new EventEmitter();

        // Register plugins
        var plugins = require('./plugins')(this, cb);

    };

    Donna.prototype.registerIntentHandler = function(intent, handler) {
        this.intentEmitter.on(intent, handler);
    };

    Donna.prototype.intent = Donna.prototype.registerIntentHandler;

    Donna.prototype.handleIntent = function(intent, context) {
        this.intentEmitter.emit(intent, context);
    };

    // Sense plugin emits events that are handled by the Brain

    // Input to Intent

    // Intent router

    // Process Intent in Brain with plugins

    // Output router

    // Output to Output plugin

    return Donna;

})();
