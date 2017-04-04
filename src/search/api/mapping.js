/**
 * Created by senthil on 04/04/17.
 */
'use strict';

var client = require('../es.config');

var mapping = function f(options) {
    var self = this;
};

mapping.initMapping = function(params, callback) {
    client.getMaster.indices.putMapping(params, function(error, response){
        callback(error, response);
    });
};

module.exports = mapping;