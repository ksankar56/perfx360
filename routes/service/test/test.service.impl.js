var _ = require('lodash')
    , mongoose = require('mongoose')
    , winston = require('winston')
    , moment = require('moment')
    , resEvents = require('../../../src/common/events')
    , Utils = require('../../../src/util/util')
    , DateUtil = require('../../../src/util/date.util')
    , ModelUtil = require('../../../src/util/model.util')
    , BaseError = require('../../../src/common/BaseError')
    , constants = require('../../../src/common/constants')
    , Status = require('../../../src/common/domains/Status')
    , baseService = require('../../../src/common/base.service')
    , logger = require('../../../config/logger');

var Test = require('../../../src/model/Test');

function getTestObject(testId, callback) {
    Test.find({_id : testId})
        .populate({path : 'project', populate: { path: 'groups' }})
        .populate({path : 'component', populate: { path: 'componentType' }})
        .populate({path : 'graphInstances', populate: { path: 'graph' }})
        .populate({path : 'test', pupulate: {path: 'environment'}})
        .populate({path : 'updatedBy'})
        .exec( function (err, tests) {
            console.info('impl = ', tests);
            callback(err, tests);
        });
}
exports.getTestObject = getTestObject;

function getTestObjects(callback) {
    Test.find({})
        .populate({path : 'project', populate: { path: 'groups' }})
        .populate({path : 'component', populate: { path: 'componentType' }})
        .populate({path : 'graphInstances', populate: { path: 'graph' }})
        .populate({path : 'test', pupulate: {path: 'environment'}})
        .populate({path : 'updatedBy'})
        .exec( function (err, tests) {
            callback(err, tests);
        });
}
exports.getTestObjects = getTestObjects;
