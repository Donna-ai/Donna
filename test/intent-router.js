var Donna = require('../src/');

var assert = require("assert");

describe('Intent Router', function() {

    describe('#intent()', function() {

        beforeEach(function(done) {

            // Init Donna
            var donna = new Donna({
                logger: {
                    level: 'error'
                }
            });
            donna.init();
            // Store Donna
            this.donna = donna;

            done();
        })

        it('should create InputEntity', function(done) {
            var donna = this.donna;

            // senseTypes, dataTypes, data, context
            var input = donna.createInputEntity({
                senseTypes: [],
                dataTypes: [],
                data: {},
                context: {}
            });

            assert(input instanceof donna.constructor.InputEntity);

            done();
        });

        it('should create IntentEntity', function(done) {
            var donna = this.donna;

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

            done();

        });

        it('should register plugin',
            function(done) {

                var donna = this.donna;

                var plugin = function(donna) {
                    donna.registerIntent("test",
                        function(donna, intent, cb) {
                            assert(donna instanceof Donna);
                            assert(intent instanceof Donna.IntentEntity)
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

        it('should register plugin and process intent',
            function(done) {

                var donna = this.donna;

                var plugin = function(donna) {
                    donna.registerIntent("test",
                        function(donna, intent, cb) {
                            assert(donna instanceof Donna);
                            assert(intent instanceof Donna.IntentEntity)
                            assert(cb instanceof Function);

                            donna.logger.debug("Intent: "+intent);

                            cb();

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
                            donna.logger.debug('intent.then');
                            assert(true);
                            done()
                        })
                        .catch(function(err) {
                            done(err);
                        });
                });
            });

            it('should register plugin and fail to process missing intent',
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
