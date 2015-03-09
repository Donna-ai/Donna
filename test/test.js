var Donna = require('../src/');

var assert = require("assert")
describe('Intent Router', function() {
    describe('#intent()', function() {
        it('should register plugin',
            function(done) {

                var donna = new Donna({
                    logger: {
                        level: 'error'
                    }
                });
                donna.init();

                var plugin = function(donna) {
                    donna.intent("test", function(context) {
                        assert(true);
                        done();
                    });
                };

                donna.registerPlugin(plugin, function() {
                    assert(true);
                    donna.handleIntent('test', {
                        'test': 'ing'
                    });
                });

            });
    });
});
