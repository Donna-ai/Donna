var OutputEntity = module.exports = (function() {

    OutputEntity.prototype.intent = null;
    OutputEntity.prototype.sources = null;
    OutputEntity.prototype.dataTypes = null;
    OutputEntity.prototype.data = null;

    function OutputEntity(params) {
        this.setIntent(params.intent || null);
        this.setSources(params.sources || []);
        this.setDataTypes(params.dataTypes || []);
        this.setData(params.data || {});
    }

    OutputEntity.prototype.setIntent = function(newIntent) {
        return this.intent = newIntent;
    };
    OutputEntity.prototype.getIntent = function() {
        return this.intent;
    };

    OutputEntity.prototype.setSources = function(newSources) {
        return this.sources = newSources;
    };
    OutputEntity.prototype.getSources = function() {
        return this.sources;
    };

    OutputEntity.prototype.setDataTypes = function(newDataTypes) {
        return this.dataTypes = newDataTypes;
    };
    OutputEntity.prototype.getDataTypes = function() {
        return this.dataTypes;
    };

    OutputEntity.prototype.setData = function(newData) {
        return this.data = newData;
    };
    OutputEntity.prototype.getData = function() {
        return this.data;
    };

    return OutputEntity;

})();
