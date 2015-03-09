var InputEntity = module.exports = (function() {

    // Source meta data
    InputEntity.prototype.senseTypes = null;
    InputEntity.prototype.dataTypes = null;

    // Data
    InputEntity.prototype.data = null;

    // Context
    /*
    InputEntity.prototype.state = null;
    InputEntity.prototype.referenceTime = null;
    InputEntity.prototype.timezone = null;
    InputEntity.prototype.entities = null;
    */
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
    // InputEntity.prototype.setContext = function(context) {
    //     // state = context.state || this.state;
    //     // referenceTime = context.referenceTime || this.referenceTime;
    //     // timezone = context.timezone || this.timezone;
    //     // entities = context.entities || this.entities;
    //     // return this.getContext();
    //     return this.context = context;
    // };
    InputEntity.prototype.getContext = function() {
        // return {
        //     state: this.state,
        //     referenceTime: this.referenceTime,
        //     timezone: this.timezone,
        //     entities: this.entities
        // };
        return context;
    };

    return InputEntity;

})();
