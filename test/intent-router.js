var Donna = require('../src/');

var assert = require("assert");

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
                    donna.registerIntent("test",
                        function(donna, context, cb) {
                            assert(true);
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

                var donna = new Donna({
                    logger: {
                        level: 'error'
                    }
                });
                donna.init();

                var plugin = function(donna) {
                    donna.registerIntent("test",
                        function(donna, context, cb) {
                            assert(true);
                            cb();
                        });
                };

                donna.registerPlugin(plugin)
                .then(function() {
                    assert(true);
                    donna.intent('test', {
                            'test': 'ing'
                        })
                        .then(function() {
                            assert(true);
                            done()
                        })
                        .catch(function() {
                            assert(false);
                            done();
                        });
                });
            });

            it('should register plugin and fail to process missing intent',
                function(done) {

                    var donna = new Donna({
                        logger: {
                            level: 'error'
                        }
                    });
                    donna.init();

                    var plugin = function(donna) {
                        donna.registerIntent("test",
                            function(donna, context, cb) {
                                assert(true);
                                cb();
                            });
                    };

                    donna.registerPlugin(plugin)
                    .then(function() {
                        assert(true);
                        donna.intent('test2', {
                                'test': 'ing'
                            })
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
