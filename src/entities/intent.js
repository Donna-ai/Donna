var IntentEntity = module.exports = (function() {

    IntentEntity.prototype.intent = null;
    IntentEntity.prototype.input = null;
    IntentEntity.prototype.confidence = null;
    IntentEntity.prototype.entities = null;

    function IntentEntity(params) {
        this.setInput(params.input || null);
        this.setIntent(params.intent || null);
        this.setEntities(params.entities || {});
        this.setConfidence(params.confidence || 0.0);
    }

    IntentEntity.prototype.setIntent = function(newIntent) {
        return this.intent = newIntent;
    };
    IntentEntity.prototype.getIntent = function() {
        return this.intent;
    };

    IntentEntity.prototype.setInput = function(newInput) {
        return this.input = newInput;
    };
    IntentEntity.prototype.getInput = function() {
        return this.input;
    };

    IntentEntity.prototype.setConfidence = function(newConfidence) {
        return this.confidence = newConfidence;
    };
    IntentEntity.prototype.getConfidence = function() {
        return this.confidence;
    };

    IntentEntity.prototype.setEntities = function(entities) {
        return this.entities = entities;
    };
    IntentEntity.prototype.getEntities = function() {
        return this.entities;
    };

    IntentEntity.prototype.getContext = function() {
        return this.input.getContext();
    };

    return IntentEntity;

})();
