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

    _.forEach(documents, function(document) {
        createDocuments(document, function (err, result) {
            callback(err, callback);
        });
    });
};

function createDocuments(document, callback) {
    client.getMaster.create({
        index: global.config.elasticSearch.index.perfx360Index,
        type: esCommons.INDEX_TYPE_REST_JSON,
        body: {
            project_id: document.projectId,
            tags: ['y', 'z'],
            published: true,
            published_at: '2013-01-01',
            counter: 1
            /*project_id: { type: "string"},
            component_id: { type: "string" },
            group_id: { type: "string" },
            project_name: { type: "string" },
            project_description: { type: "string" },
            environment: { type: "string" },
            test_id: { type: "string" },
            test_execution_id : { type: "string" },
            test_type: { type: "string" },
            execution_time : {type: "date", format: "yyyyMMdd'T'HHmmssZ"},
            version : { type: "float" },
            group: { type: "boolean" },
            file_name: { type: "string" },
            t: { type: "long" },
            lt: { type: "string" },
            ts : {type:   "date", format: "epoch_millis"},
            s: { type: "boolean"},
            lb: { type: "string" },
            rc: { type: "long" },
            rm: { type: "string" },
            tn: { type: "string" },
            dt: { type: "string" },
            by: {type : "long"},
            start_time: {type: "date", format: "YYYY-MM-DD'T'HH:mm:ssZ"},
            end_time: {type: "date", format: "YYYY-MM-DD'T'HH:mm:ssZ"},
            property : {
                type : "object",
                properties : {
                    xs : {type : "string", index : "not_analyzed"},
                    name : {type : "string", index : "not_analyzed"}
                }
            },
            assertion_result : {
                type : "object",
                properties : {
                    fm : {type : "string", index : "not_analyzed"},
                    error : {type : "boolean", index : "not_analyzed"},
                    failure : {type : "boolean", index : "not_analyzed"}
                }
            },
            status: { type: "boolean", index : "not_analyzed" }*/
        }
    }, function (err, response) {
        callback(err, response);
    });
}
exports.createDocuments = createDocuments;

module.exports = document;