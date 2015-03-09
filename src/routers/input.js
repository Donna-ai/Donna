var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var Q = require('q');

var InputRouter = module.exports = (function() {

    InputRouter.emitter = null;

    function InputRouter(donna) {
        donna.logger.info("IntentRouter constructor");

        // Initialize Event Emitter
        this.emitter = new EventEmitter();

    }

    InputRouter.prototype.register = function(intent, handler, cb) {
        this.emitter.on(intent, handler);
        cb();
    };

    InputRouter.prototype.process = function(intent, context) {
        var deferred = Q.defer();
        this.intentEmitter.emit(intent, this, context, function(err) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve();
            }
        });
        return deferred.promise;
    };

    return InputRouter;

})();
