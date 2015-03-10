var Donna = require('../../src/');

var assert = require("assert");

describe('Input Entity', function() {

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

    });
});
