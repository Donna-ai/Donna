var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var Q = require('q');

var OutputRouter = module.exports = (function() {

    OutputRouter.prototype.donna = null;
    OutputRouter.prototype.dataTypesEmitter = null;
    OutputRouter.prototype.OutputEntity = null;

    function OutputRouter(donna) {
        this.donna = donna;
        donna.logger.info("OutputRouter constructor");

        // Initialize Event Emitters
        this.dataTypesEmitter = new EventEmitter();

        this.OutputEntity = donna.constructor.OutputEntity;

    }

    OutputRouter.prototype.register = function(meta, handler) {
        var deferred = Q.defer();

        this.donna.logger.debug('OutputRouter::register', meta);

        // Check for required fields
        if (meta.name && meta.description && meta.dataTypes) {
            this.donna.logger.debug('Intent Extractor passes validation');
        } else {
            deferred.reject(new Error("Missing required field"));
            return;
        }

        // Bind to all data types
        var dataTypes = meta.dataTypes || [];
        var len = dataTypes.length;
        if (len > 0) {
            for (var d = 0; d < len; d++) {
                var dt = dataTypes[d];
                this.dataTypesEmitter.on(dt, handler);
            }
            deferred.resolve();
        } else {
            var err = new Error("No data types provided for Intent Extractor.");
            deferred.reject(err);
        }

        return deferred.promise;
    };

    OutputRouter.prototype.process = function(input, context) {
        var deferred = Q.defer();
        var donna = this.donna;

        try {
            donna.logger.verbose("OutputRouter::process :",
                input);

            // Check if input is instance of OutputEntity
            if (input instanceof this.OutputEntity) {

                donna.logger.debug(
                    "Is instance of OutputEntity");

                // Bind to all data types
                var dataTypes = input.getDataTypes() || [];
                var len = dataTypes.length;
                if (len > 0) {
                    for (var d = 0; d < len; d++) {
                        var dt = dataTypes[d];
                        this.dataTypesEmitter.emit(dt, this.donna, input,
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
