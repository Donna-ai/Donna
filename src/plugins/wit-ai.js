var wit = require('node-wit');
var fs = require('fs');

module.exports = function(donna, cb) {

    // Speech to Input (Speech recognition)
    // donna.registerSense(function(donna) {
    //
    // });

    var inputEntityFromWit = function(donna, resp) {
        // Create InputEntity instance
        var input = donna.createInputEntity({
            senseTypes: [],
            dataTypes: [],
            data: {},
            context: {}
        });

        return input;
    };

    var intentEntityFromWit = function(donna, input, outcome) {
        /*
        outcome = {
            "_text": "what's the weather in New York",
           "intent": "weather",
           "entities": {
            "location": [
             {
              "suggested": true,
              "value": "New York"
             }
            ]
           },
           "confidence": 1
       }
        */
        var intent = donna.createIntentEntity({
            input: input,
            intent: outcome.intent,
            entities: outcome.entities,
            confidence: outcome.confidence
        });
        return intent;
    };

    // Text to Intent extractor
    donna.registerIntentExtractor({
            name: "Wit.ai",
            description: "Wit.ai text to intent extractor",
            dataTypes: ["text"] // supported input data types
        }, function(donna, input, cb) {

        var accessToken = donna.config.wit.accessToken;

        if (!accessToken) {
            var err = new Error('Wit.ai is not setup.'+
                              'Could not find access token.');
            donna.logger.warn(err);
            return cb(err);
        }

        // Get textual form of input
        var data = input.getData();

        // Data Types are unique and each have their own
        // specific object format.
        // In this case, a 'text' data type is a simple
        // object with the field 'text'.
        var text = data.text; // Extract text format from data

        wit.captureTextIntent(accessToken, text, function (err, res) {
            // console.log("Response from Wit for text input: ", res);
            if (err) {
                cb(err)
            } else {
                var outcomes = res.outcomes;
                // Iterate thru all intents in response
                var intents = [];
                for (var i = 0, len=outcomes.length; i<len; i++) {
                    var outcome = outcomes[i];
                    // Normalize to Intent entity
                    var intent = intentEntityFromWit(donna, input, outcome);
                    // Save intent
                    intents.push(intent);
                    // Send intent
                    donna.intent(intent);
                }
                // Return
                return cb(null, intents);
            }
        });

    });

    // Speech to Intent extractor

};
