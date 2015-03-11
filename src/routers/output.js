var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var Q = require('q');

var OutputRouter = module.exports = (function() {

    OutputRouter.prototype.donna = null;
    OutputRouter.prototype.emitter = null;
    OutputRouter.prototype.OutputEntity = null;

    function OutputRouter(donna) {
        this.donna = donna;
        donna.logger.info("OutputRouter constructor");

        // Initialize Event Emitters
        this.emitter = new EventEmitter();

        this.OutputEntity = donna.constructor.OutputEntity;

    }

    OutputRouter.prototype.register = function(meta, handler) {
        var deferred = Q.defer();
        var donna = this.donna;

        donna.logger.debug('OutputRouter::register', meta);

        // Check for required fields
        if (meta.name && meta.description && meta.dataTypes) {
            donna.logger.debug('Intent Extractor passes validation');
        } else {
            var err = new Error("Missing required field");
            donna.logger.error(err);
            deferred.reject(err);
            return deferred.promise;
        }

        // Bind to all data types
        var dataTypes = meta.dataTypes || [];
        var len = dataTypes.length;
        if (len > 0) {
            for (var d = 0; d < len; d++) {
                var dt = dataTypes[d];
                var eventName = "data-type::"+dt;
                donna.logger.debug('Output handler bind to event name:', eventName);
                this.emitter.on(eventName, handler);
            }
            deferred.resolve();
        } else {
            var err = new Error("No data types provided for Intent Extractor.");
            deferred.reject(err);
        }

        return deferred.promise;
    };

    OutputRouter.prototype.process = function(outputEntity, context) {
        var deferred = Q.defer();
        var donna = this.donna;

        try {
            donna.logger.verbose("OutputRouter::process :",
                outputEntity);

            // Check if outputEntity is instance of OutputEntity
            if (outputEntity instanceof this.OutputEntity) {

                donna.logger.debug(
                    "Is instance of OutputEntity");

                // Send to all data types
                var dataTypes = outputEntity.getDataTypes() || [];
                var len = dataTypes.length;
                if (len > 0) {
                    for (var d = 0; d < len; d++) {
                        var dt = dataTypes[d];
                        var eventName = "data-type::"+dt;
                        donna.logger.debug('Output to event name:', eventName);
                        donna.logger.debug('# of Listeners:', this.emitter.listeners().length);

                        this.emitter.emit(eventName, this.donna, outputEntity,
                            function() {
                            // TODO: handle this callback
                            donna.logger.debug(arguments);
                        });
                    }
                    deferred.resolve();
                } else {
                    var err = new Error("No data types provided for Intent Extractor.");
                    deferred.reject(err);
                }

            } else {
                var err = new Error(
                    "Must be instance of OutputEntity.");
                donna.logger.error(err);
                deferred.reject(err);
            }
        } catch (error) {
            deferred.reject(error);
        }
        return deferred.promise;

    };

    // OutputRouter.prototype.

    return OutputRouter;

})();
