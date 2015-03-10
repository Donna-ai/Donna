var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var Q = require('q');

var InputRouter = module.exports = (function() {

    InputRouter.prototype.donna = null;
    InputRouter.prototype.dataTypesEmitter = null;
    InputRouter.prototype.InputEntity = null;

    function InputRouter(donna) {
        this.donna = donna;
        donna.logger.info("InputRouter constructor");

        // Initialize Event Emitters
        this.dataTypesEmitter = new EventEmitter();

        this.InputEntity = donna.constructor.InputEntity;

    }

    InputRouter.prototype.register = function(meta, handler) {
        var deferred = Q.defer();

        this.donna.logger.debug('InputRouter::register', meta);

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

    InputRouter.prototype.process = function(input, context) {
        var deferred = Q.defer();
        var donna = this.donna;

        try {
            donna.logger.verbose("InputRouter::process :",
                input);

            // Check if input is instance of InputEntity
            if (input instanceof this.InputEntity) {

                donna.logger.debug(
                    "Is instance of InputEntity");

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
                    "Must be instance of InputEntity.");
                donna.logger.error(err);
                deferred.reject(err);
            }
        } catch (error) {
            deferred.reject(error);
        }
        return deferred.promise;

    };

    // InputRouter.prototype.

    return InputRouter;

})();
