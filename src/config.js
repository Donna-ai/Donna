module.exports = function() {

    var pluginPathPrefix = "./plugins/";

    return {
        logger: {
            level: 'error'
        },
        plugins: [
            pluginPathPrefix + "wit-ai",
            pluginPathPrefix + "sms"
        ],
        wit: {
            accessToken: "FPFNOE3PV5XZ3ZKRKEQXOWCNS2XD6U73"
        }
    };

};
