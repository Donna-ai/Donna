var InputEntity = module.exports = (function() {

    // Source meta data
    InputEntity.prototype.senseTypes = null;
    InputEntity.prototype.dataTypes = null;

    // Data
    InputEntity.prototype.data = null;

    // Context
    InputEntity.prototype.context = null;

    function InputEntity(params) {
        // senseTypes, dataTypes, data, context
        this.senseTypes = params.senseTypes || [];
        this.dataTypes = params.dataTypes || [];
        this.data = params.data || {};
        this.context = params.context || {};
    }

    InputEntity.prototype.getSenseTypes = function() {
        return this.senseTypes;
    };
    InputEntity.prototype.getDataTypes = function() {
        return this.dataTypes;
    };
    InputEntity.prototype.getData = function() {
        return this.data;
    };

    /*
    {
        "state":[
              "yes_or_no",
              "cancel"
        ],
        "reference_time":"2013-05-01T19:05:00",
        "timezone":"America/Los_Angeles",
        "entities":[
             {
                "id":"room",
                "values":[
                      {
                          "value":"bedroom",
                          "expressions":[
                            "bedroom",
                              "bedchamber",
                              "guest room"
                          ]
                      },
                      {
                          "value":"living room",
                          "expressions":[
                              "living room",
                              "salon",
                              "sitting room"
                          ]
                      }
                ]
              }
        ]
    }
    */
    InputEntity.prototype.getContext = function() {
        return this.context;
    };

    return InputEntity;

})();
