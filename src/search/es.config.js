/**
 * Created by senthil on 04/04/17.
 */
var elasticsearch = require('elasticsearch');

var client = function f(options) {
    var self = this;
};

client.getMaster = new elasticsearch.Client({
    host: global.config.elasticSearch.master.host + ':' + global.config.elasticSearch.master.port,
    /*log: global.config.elasticSearch.master.log*/
});

client.getSlave = new elasticsearch.Client({
    host: global.config.elasticSearch.slave.host + ':' + global.config.elasticSearch.slave.port,
    log: global.config.elasticSearch.slave.log
});

module.exports = client;