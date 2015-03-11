var Donna = require('../../src/');

var assert = require("assert");

describe('Intent Router', function() {

    beforeEach(function(done) {

        // Init Donna
        var donna = new Donna({
            logger: {
                // level: 'debug'
            }
        });
        // Store Donna
        this.donna = donna;

        done();
    });

    describe('#register()', function() {

        it('should register plugin',
            function(done) {

                var donna = this.donna;

                var plugin = function(donna) {
                    donna.registerIntent("test",
                        function(donna, intent, cb) {
                            assert(donna instanceof Donna);
                            assert(intent instanceof Donna
                                .IntentEntity)
                            assert(cb instanceof Function);

                            cb();
                        });
                };

                donna.registerPlugin(plugin)
                    .then(function() {
                        assert(true);
                        done();
                    });

            });

    });

    describe("#process", function() {

        it('should register plugin and process intent',
            function(done) {

                var donna = this.donna;

                var plugin = function(donna) {
                    donna.registerIntent("test",
                        function(donna, intent, cb) {
                            assert(donna instanceof Donna);
                            assert(intent instanceof Donna
                                .IntentEntity)
                            assert(cb instanceof Function);

                            donna.logger.debug(
                                "Intent: " +
                                intent);

                            cb();

                            done();
                        });
                };

                donna.registerPlugin(plugin)
                    .then(function() {
                        assert(true);

                        // Create InputEntity instance
                        var input = donna.createInputEntity({
                            senseTypes: [],
                            dataTypes: [],
                            data: {},
                            context: {}
                        });

                        assert(input instanceof Donna.InputEntity);

                        // Create IntentEntity instance
                        var intent = donna.createIntentEntity({
                            input: input,
                            intent: 'test',
                            entities: {},
                            confidence: 1
                        });

                        assert(intent instanceof Donna.IntentEntity);

                        donna.intent(intent)
                            .then(function() {
                                donna.logger.debug(
                                    'intent.then'
                                );
                                assert(true);
                            })
                            .catch(function(err) {
                                done(err);
                            });
                    });
            });

        it(
            'should register plugin and fail to process missing intent',
            function(done) {

                var donna = this.donna;

                var plugin = function(donna) {
                    donna.registerIntent("test",
                        function(donna, context, cb) {
                            assert(true);
                            cb();
                        });
                };

                // Create InputEntity instance
                var input = donna.createInputEntity({
                    senseTypes: [],
                    dataTypes: [],
                    data: {},
                    context: {}
                });

                assert(input instanceof Donna.InputEntity);

                // Create IntentEntity instance
                var intent = donna.createIntentEntity({
                    input: input,
                    intent: 'test2',
                    entities: {},
                    confidence: 1
                });

                assert(intent instanceof Donna.IntentEntity);

                donna.registerPlugin(plugin)
                    .then(function() {
                        assert(true);
                        donna.intent(intent)
                            .then(function() {
                                assert(false);
                                done()
                            })
                            .catch(function(err) {
                                assert(true);
                                done();
                            });
                    });
            });

    });
});
