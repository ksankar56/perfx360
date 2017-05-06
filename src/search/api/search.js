/**
 * Created by senthil on 04/04/17.
 */
var client = require('../es.config');
var jmeterEsUtil = require('../../util/es/jmeter.perf.util');

var search = function f(options) {
    var self = this;
};

search.searchUsers = function(searchParams, callback) {
    client.getSlave.search(searchParams, function (error, response, status) {
        callback(error, response, status);
    });
};

search.getJMeterAggregateReport = function(params, callback) {
    var searchParams = jmeterEsUtil.getTestExecutionQuery(params);
    client.getSlave.search(searchParams, function (error, response, status) {
        callback(error, response, status);
    });
};

module.exports = search;