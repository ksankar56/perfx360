/**
 * Created by senthil on 04/04/17.
 */
var client = require('../es.config')

var update = function f(options) {
    var self = this;
};

update.updateQuery = function(params, callback) {
    client.getMaster.index(params, function (error, response) {
        callback(error, response);
    });
};

module.exports = update;