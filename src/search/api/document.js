/**
 * Created by senthil on 11/04/17.
 */
var client = require('../es.config');
var _ = require('lodash');
var esCommons = require('../commons/es.constants');

var document = function f(options) {
    var self = this;
};

document.create = function(documents, callback) {
    createRestDocuments(documents, function (err, result) {
        callback(err, callback);
    });
};

function createRestDocuments(documents, callback) {

    _.forEach(documents, function(document) {
        //body.push(document);
        client.getMaster.index({
            index: global.config.elasticSearch.index.perfx360Index,
            type: esCommons.INDEX_TYPE_REST_JSON,
            body: document}, function (err, response) {
            //callback(err, response);
            console.info('err = ', err);
        });
    });

    //console.info('body = ', body);
}
exports.createRestDocuments = createRestDocuments;


document.createAccessibility = function(documents, callback) {
    createAccessibilityDocuments(documents, function (err, result) {
        callback(err, callback);
    });
};

function createAccessibilityDocuments(documents, callback) {

    _.forEach(documents, function(document) {
        //body.push(document);
        client.getMaster.index({
            index: global.config.elasticSearch.index.perfx360Index,
            type: esCommons.INDEX_TYPE_ACCESSIBILITY,
            body: document}, function (err, response) {
            //callback(err, response);
            console.info('err = ', err);
        });
    });

    //console.info('body = ', body);
}
exports.createAccessibilityDocuments = createAccessibilityDocuments;

module.exports = document;