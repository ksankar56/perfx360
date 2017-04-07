/**
 * Created by senthil on 05/04/17.
 */
var client = require('../es.config');

var index = function f(options) {
    var self = this;
};

index.createIndex = function(params, callback) {
    client.getMaster.indices.create(params, function(error, response){
        callback(error, response);
    });
};

index.indexExists = function(params, callback) {
    client.getMaster.indices.exists(params, function(error, response){
        callback(error, response);
    });
};

module.exports = index;