var Donna = require('../../src/');

var assert = require("assert");

describe('Output Router', function() {

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

                donna.registerPlugin(function(donna) {
                        donna.registerOutput({
                                    name: 'test',
                                    description: 'this is a test',
                                    dataTypes: ["text"]
                                },
                                function(donna, output,
                                    cb) {

                                    donna.logger.debug(
                                        'Output:',
                                        output);

                                    assert(donna instanceof Donna);
                                    assert(output instanceof Donna.OutputEntity
                                    )
                                    assert(cb instanceof Function);

                                    cb();

                                })
                            // .catch(done);
                    })
                    .then(function() {
                        assert(true);
                        done();
                    })
                    .catch(done);

            });

    });

    describe("#process", function() {

        it('should register plugin and process intent',
            function(done) {

                var donna = this.donna;

                donna.registerPlugin(function(donna) {
                    donna.registerOutput({
                            name: 'test',
                            description: 'this is a test',
                            dataTypes: ["text"]
                        },
                        function(donna, output, cb) {

                            donna.logger.debug('Output:', output);

                            assert(donna instanceof Donna);
                            assert(output instanceof Donna
                                .OutputEntity)
                            assert(cb instanceof Function);

                            cb();

                            done();
                        })
                        .catch(done);
                })
                    .then(function() {
                        assert(true);

                        // Create OutputEntity instance
                        var output = donna.createOutputEntity({
                            intent: null,
                            sources: ['test'],
                            dataTypes: ['text'],
                            data: {
                                'text': 'the test worked!'
                            }
                        });

                        donna.output(output)
                            .then(function() {
                                donna.logger.debug(
                                    'output.then'
                                );
                                assert(true);
                            })
                            .catch(done);
                    })
                    .catch(done);
            });

        // it(
        //     'should register plugin and fail to process missing intent',
        //     function(done) {
        //
        //         var donna = this.donna;
        //
        //         var plugin = function(donna) {
        //             donna.registerIntent("test",
        //                 function(donna, context, cb) {
        //                     assert(true);
        //                     cb();
        //                 });
        //         };
        //
        //         // Create InputEntity instance
        //         var input = donna.createInputEntity({
        //             senseTypes: [],
        //             dataTypes: [],
        //             data: {},
        //             context: {}
        //         });
        //
        //         assert(input instanceof Donna.InputEntity);
        //
        //         // Create IntentEntity instance
        //         var intent = donna.createIntentEntity({
        //             input: input,
        //             intent: 'test2',
        //             entities: {},
        //             confidence: 1
        //         });
        //
        //         assert(intent instanceof Donna.IntentEntity);
        //
        //         donna.registerPlugin(plugin)
        //             .then(function() {
        //                 assert(true);
        //                 donna.intent(intent)
        //                     .then(function() {
        //                         assert(false);
        //                         done()
        //                     })
        //                     .catch(function(err) {
        //                         assert(true);
        //                         done();
        //                     });
        //             });
        //     });

    });
});
