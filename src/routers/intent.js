var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var Q = require('q');

var IntentRouter = module.exports = (function() {

    IntentRouter.prototype.donna = null;
    IntentRouter.prototype.emitter = null;
    IntentRouter.prototype.IntentEntity = null;

    function IntentRouter(donna) {
        this.donna = donna;
        donna.logger.verbose("IntentRouter constructor");

        // Initialize Event Emitter
        this.emitter = new EventEmitter();

        this.IntentEntity = donna.constructor.IntentEntity;

    }

    IntentRouter.prototype.register = function(intent, handler, cb) {
        this.emitter.on(intent, handler);
        cb();
    };

    IntentRouter.prototype.process = function(intentEntity) {
        var deferred = Q.defer();

        try {
            this.donna.logger.verbose("IntentRouter::process :",
                intentEntity);

            // Check if intentEntity is instance of IntentEntity
            if (intentEntity instanceof this.IntentEntity) {

                this.donna.logger.debug(
                    "Is instance of IntentEntity");

                // Is instance of IntentEntity
                var intent = intentEntity.getIntent();

                this.donna.logger.debug("Intent:", intent);

                var handlers = this.emitter.listeners(intent);
                if (handlers.length > 0) {
                    this.emitter.emit(intent, this.donna, intentEntity,
                        function(err) {
                            if (err) {
                                deferred.reject(err);
                            } else {
                                deferred.resolve();
                            }
                        });
                } else {
                    var err = new Error("No intent handler for '" +
                        intent + "'");
                    deferred.reject(err);
                }
            } else {
                var err = new Error(
                    "Must be instance of IntentEnity.");
                this.donna.logger.error(err);
                deferred.reject(err);
            }
        } catch (error) {
            deferred.reject(error);
        }
        return deferred.promise;
    };

    return IntentRouter;

})();
