/**
 * Created by senthil on 08/02/17.
 */

var express = require('express')
    , router = express.Router()
    , esDocuments = require('../../../src/search/api/document')
    , builderutil = require('../../../src/util/es/builderutil')
    , events = require('../../../src/common/events')
    , async = require('async');

function bulkInsert(documents, callback) {
    esDocuments.create(documents, function(err, result) {
        callback(err, result);
    })
};
exports.bulkInsert = bulkInsert;

function bulkInsertAccessibility(documents, callback) {
    esDocuments.createAccessibility(documents, function(err, result) {
        callback(err, result);
    })
};
exports.bulkInsertAccessibility = bulkInsertAccessibility;