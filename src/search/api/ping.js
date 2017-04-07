/**
 * Created by senthil on 04/04/17.
 */

var client = require('../es.config');

var ping = function f(options) {
    var self = this;
};

ping.checkSlave = function(searchParams, callback) {
    client.getSlave.ping(searchParams, function (error, response, status) {
        callback(error, response, status);
    });
};

module.exports = ping;