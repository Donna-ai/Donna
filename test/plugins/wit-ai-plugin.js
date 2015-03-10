var Donna = require('../../src/');

var assert = require("assert");

describe('Wit.ai Plugin', function() {

    describe('#intent extraction()', function() {

        beforeEach(function(done) {

            // Init Donna
            var donna = new Donna({
                logger: {
                    // level: 'error'
                }
            });
            // Store Donna
            this.donna = donna;

            done();
        })

        it('should extract Intent from Input with Wit.ai',
            function(done) {

                var donna = this.donna;

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
                    donna.logger.debug("Intent received:", intent);
                    assert(intent instanceof Donna.IntentEntity);
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

            });

    });
});
