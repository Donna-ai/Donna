var Donna = require('../../src/');

var assert = require("assert");

describe('Input Router', function() {

    beforeEach(function(done) {

        // Init Donna
        var donna = new Donna({
            logger: {
                // level: 'warn'
            },
            plugins: null // Force internal plugins to disable
        });
        // Store Donna
        this.donna = donna;

        done();
    });

    describe('#register()', function() {

        it('should register IntentExtractor', function(done) {
            var donna = this.donna;

            // Text to Intent extractor
            donna.registerIntentExtractor({
                    name: "test",
                    description: "This is a Test Intent Extractor",
                    dataTypes: ["text"] // supported input data types
                }, function(donna, input, cb) {

                    var data = input.getData();
                    // Data Types are unique and each have their own
                    // specific object format.
                    // In this case, a 'text' data type is a simple
                    // object with the field 'text'.
                    var text = data.text; // Extract text format from data

                    var intent = donna.createIntentEntity({
                        input: input,
                        intent: 'test',
                        entities: {},
                        confidence: 1.0
                    });

                    // Send intent
                    donna.intent(intent);
                    // Return
                    return cb(null, [intent]);

                })
                .then(function() {
                    assert(true);
                    done();
                })
                .catch(function(err) {
                    done(err);
                });

        });

    });

    describe('#process', function() {

        it('should extract Intent from Input',
            function(done) {

                var donna = this.donna;

                // Text to Intent extractor
                donna.registerIntentExtractor({
                        name: "test",
                        description: "This is a Test Intent Extractor",
                        dataTypes: ["text"] // supported input data types
                    }, function(donna, input, cb) {

                        /*
                        var data = input.getData();
                        // Data Types are unique and each have their own
                        // specific object format.
                        // In this case, a 'text' data type is a simple
                        // object with the field 'text'.
                        var text = data.text; // Extract text format from data
                        */

                        var intent = donna.createIntentEntity({
                            input: input,
                            intent: 'test',
                            entities: {},
                            confidence: 1.0
                        });

                        // Send intent
                        donna.intent(intent);
                        // Return
                        return cb(null, [intent]);

                    })
                    .then(function() {
                        assert(true);

                        // Create InputEntity instance
                        var input = donna.createInputEntity({
                            senseTypes: [],
                            dataTypes: ['text'],
                            data: {
                                'text': 'Hello!'
                            },
                            context: {}
                        });

                        assert(input instanceof Donna.InputEntity);

                        // Mock the .intent API
                        donna.intent = function(intent) {
                            donna.logger.debug(
                                "Intent received:",
                                intent);
                            assert(intent instanceof Donna
                                .IntentEntity);
                            done();

                        };

                        // Process the InputEntity
                        donna.input(input)
                            .then(function() {
                                assert(true);
                            })
                            .catch(function(error) {
                                done(error);
                            });


                    })
                    .catch(function(err) {
                        done(err);
                    });

            });

    });

});
