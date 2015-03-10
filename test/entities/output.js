var Donna = require('../../src/');

var assert = require("assert");

describe('Output Entity', function() {

    describe('#create()', function() {

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
        });

        it('should create OutputEntity', function(done) {
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

            // Create OutputEntity instance
            var output = donna.createOutputEntity({
                intent: intent,
                sources: ['test'],
                dataTypes: [],
                data: {}
            });

            done();

        });

    });
});
