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
        .populate({path : 'components', populate: { path: 'componentType' }})
        .populate({path : 'graphInstances', populate: { path: 'graph' }})
        .populate({path : 'test', pupulate: {path: 'environment'}})
        .populate({path : 'environment'})
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
        .populate({path : 'components', populate: { path: 'componentType' }})
        .populate({path : 'graphInstances', populate: { path: 'graph' }})
        .populate({path : 'test', pupulate: {path: 'environment'}})
        .populate({path : 'environment'})
        .populate({path : 'updatedBy'})
        .exec( function (err, tests) {
            callback(err, tests);
        });
}
exports.getTestObjects = getTestObjects;

function getTestObjectsByProjectId(projectId, callback) {
    Test.find({project: projectId})
        .populate({path : 'project', populate: { path: 'groups' }})
        .populate({path : 'components', populate: { path: 'componentType' }})
        .populate({path : 'graphInstances', populate: { path: 'graph' }})
        .populate({path : 'test', pupulate: {path: 'environment'}})
        .populate({path : 'environment'})
        .populate({path : 'updatedBy'})
        .exec( function (err, tests) {
            callback(err, tests);
        });
}
exports.getTestObjectsByProjectId = getTestObjectsByProjectId;

function saveTest(testJson, callback) {

    // create a test
    console.info('testJson = ', testJson);

    if (_.isEmpty(testJson)) {
        logger.debug(constants.TEST_OBJ_EMPTY_MSG);
        var baseError = new BaseError(Utils.buildErrorResponse(constants.TEST_OBJ_EMPTY, '', constants.TEST_OBJ_EMPTY_MSG, err.message, 500));
        callback(baseError, null);
    }

    Test.find({name : testJson.name}, function (err, test) {
        if (err) {
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.TEST_NOT_AVAILABLE, '', constants.TEST_NOT_AVAILABLE_MSG, err.message, 500));
            callback(baseError, null);
        }

        if(_.isEmpty(test)) {
            var test = ModelUtil.getTestModel(testJson)

            console.info('test = ', test);
            // save test to database
            test.save(function (err) {
                callback(err, test);
            });
        } else {
            logger.debug(constants.TEST_NOT_AVAILABLE_MSG);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.TEST_NOT_AVAILABLE, '', constants.TEST_NOT_AVAILABLE_MSG, constants.TEST_NOT_AVAILABLE_MSG, 500));
            callback(baseError, null);
        }
    });
}
exports.saveTest = saveTest;

function updateObject(testJson, callback) {
    console.info('testJson.testId = ', testJson.testId);
    Test.findById(testJson.testId, function (err, test) {

        console.info('test = ', test);
        console.info('testJson.virtualUsers = ', testJson.virtualUsers);
        console.info('testJson.rampUpPeriod = ', testJson.rampUpPeriod);
        console.info('testJson.iterations = ', testJson.iterations);
        console.info('testJson.duration = ', testJson.duration);

        test.virtualUsers = testJson.virtualUsers;
        test.rampUpPeriod = testJson.rampUpPeriod;
        test.iterations = testJson.iterations;
        test.duration = testJson.duration;
        test.updated = new Date();

        // Update the document back to the database
        test.save(function (err, result) {
            console.info('err = ', err);
            console.info('result = ', result);
            callback(err, result);
        });
    });
}
exports.updateObject = updateObject;