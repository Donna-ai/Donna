var winston = require('winston');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var Q = require('q');

// Routers
var InputRouter = require('./routers/input');
var IntentRouter = require('./routers/intent');
var OutputRouter = require('./routers/output');

var Donna = module.exports = (function() {

    Donna.logger = null;

    Donna.outputEmitter = null;

    Donna.options = null;

    Donna.inputRouter = null;
    Donna.intentRouter = null;
    Donna.outputRouter = null;

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


    Donna.prototype.registerPlugin = function(plugin) {
        var deferred = Q.defer();

        if (typeof plugin === "string") {
            this.logger.debug("Register plugin", plugin);
            require(plugin)(this);
            deferred.resolve();
        } else if (typeof plugin === "function") {
            plugin(this);
            deferred.resolve();
        } else {
            var err = new Error("Plugin not supported. Type "+typeof plugin);
            this.logger.error(err);
            deferred.resolve();
        }
        return deferred.promise;

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
        var deferred = Q.defer();

        this.setupLogger();
        this.logger.info("Initializing Donna");

        var cb = function(err) {
            self.logger.info("Done initializing Donna");
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve();
            }
        };

        // Routers
        this.inputRouter = new InputRouter(this);
        this.intentRouter = new IntentRouter(this);
        this.outputRouter = new OutputRouter(this);

        // Register plugins
        var plugins = require('./plugins')(this, cb);

        return deferred.promise;
    };

    Donna.prototype.registerIntent = function(intent, handler) {
        var deferred = Q.defer();
        this.intentRouter.register(intent, handler, function(err) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve();
            }
        });
        return deferred.promise;
    };

    // Sense plugin emits events that are handled by the Brain
    Donna.prototype.registerSense = function(sense) {
        var senseInst = sense(this);
        this.senses.push(senseInst);

        return this;
    }

    // Input to Intent
    Donna.prototype.inputToIntent = function(input) {
        var deferred = Q.defer();

        return deferred.promise;
    };

    // Intent router
    Donna.prototype.intent = function(intent, context) {
        return this.intentRouter.process(intent, context);
    };

    // Process Intent in Brain with plugins

    // Output router

    // Output to Output plugin

    return Donna;

})();
