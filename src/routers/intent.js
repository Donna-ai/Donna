var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var Q = require('q');

var IntentRouter = module.exports = (function() {

    IntentRouter.emitter = null;

    function IntentRouter(donna) {
        donna.logger.info("IntentRouter constructor");

        // Initialize Event Emitter
        this.emitter = new EventEmitter();

    }

    IntentRouter.prototype.register = function(intent, handler, cb) {
        this.emitter.on(intent, handler);
        cb();
    };

    IntentRouter.prototype.process = function(intent, context) {
        var deferred = Q.defer();
        var handlers = this.emitter.listeners(intent);
        if (handlers.length > 0) {
            this.emitter.emit(intent, this, context, function(err) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve();
                }
            });
        } else {
            var err = new Error("No intent handler for '"+intent+"'");
            deferred.reject(err);
        }
        return deferred.promise;
    };

    return IntentRouter;

})();
