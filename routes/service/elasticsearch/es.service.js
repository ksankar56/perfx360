/**
 * Created by senthil on 08/02/17.
 */

var express = require('express')
    , router = express.Router()
    , esIndex = require('../../../src/search/api/index')
    , builderutil = require('../../../src/util/es/builderutil')
    , events = require('../../../src/common/events')
    , async = require('async');

exports.executePerfx360IndexMappings = function(req, res) {
    console.info('executing perfx360 index mappings');
    async.waterfall(
        [
            perfx360IndexExists.bind(null, req),
            deletePerfx360Index.bind(),
            createPerfx360IndexMappings.bind()
        ],
        function (err,  data) {
            if(err) {
                events.emit('ErrorJsonResponse', req, res, err);
            } else {
                events.emit('JsonResponse', req, res, data);
            }
        }
    );
};

function perfx360IndexExists(req, callback) {
    var params = builderutil.constructIndex(req);
    console.info('params = ', params);

    esIndex.indexExists(params, function(err, result) {
        console.info('result = ', result);
        callback(null, req, result);
    })
};
exports.perfx360IndexExists = perfx360IndexExists;

function deletePerfx360Index(req, result, callback) {
    var params = builderutil.constructIndex(req);
    console.info('deleting');
    if(result) {
        es.delete.delete(params, function(err, data) {
            callback(null, req);
        })
    } else {
        callback(null, req);
    }
};
exports.deletePerfx360Index = deletePerfx360Index;

function createPerfx360IndexMappings(req, callback) {
    var params = builderutil.constructMappings(req);
    esIndex.createIndex(params, function(err, data) {
        console.info('data = ', data);
        callback(null, data);
    })
};
exports.createPerfx360IndexMappings = createPerfx360IndexMappings;

function indexExists(req, callback) {
    var params = builderutil.constructIndex(req);
    esIndex.indexExists(params, function(err, result) {
        callback(null, req, result);
    })
};
exports.indexExists = indexExists;