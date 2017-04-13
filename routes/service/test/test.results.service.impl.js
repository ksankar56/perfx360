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

var TestResult = require('../../../src/model/TestResult');

function getTestResultObjects (callback) {
    TestResult.find({}, function (err, testResults) {
        callback(err, testResults);
    });
};
exports.getTestResultObjects = getTestResultObjects;

function saveTestResultObject (documents, callback) {

    if(!_.isEmpty(documents)) {
        //var testResult = ModelUtil.getTestResultModel(req, res, testResultJson);

        //console.info('testResult = ', testResult);
        // save testResult to database
        TestResult.insertMany(documents, function (err, results) {
            console.info('err = ', err);
            callback(err, results);
        });
    } else {
        logger.debug(constants.TEST_RESULT_NOT_AVAILABLE_MSG);
        var baseError = new BaseError(Utils.buildErrorResponse(constants.TEST_RESULT_NOT_AVAILABLE, '', constants.TEST_RESULT_NOT_AVAILABLE_MSG, constants.TEST_RESULT_NOT_AVAILABLE_MSG, 500));
        callback(baseError, null);
        //resEvents.emit('ErrorJsonResponse', req, res, baseError);
    }
}
exports.saveTestResultObject = saveTestResultObject;