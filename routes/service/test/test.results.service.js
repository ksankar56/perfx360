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

var testResultServiceImpl = require('./test.results.service.impl.js');

exports.getTestResults = function(req, res, callback) {
    testResultServiceImpl.getTestResultObjects(function (err, testResults) {
        if (err) {
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.TEST_RESULT_NOT_AVAILABLE, '', constants.TEST_RESULT_NOT_AVAILABLE_MSG, err.message, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        }

        res.status(constants.HTTP_OK).send({
            status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Fetched"),
            data: testResults});
    })
};

/*exports.getTestResult = function(req, res, callback) {
    testResultServiceImpl.getTestResultObject(req.params.testResultId, function (err, testResults) {
        if (err) {
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.TEST_RESULT_NOT_AVAILABLE, '', constants.TEST_RESULT_NOT_AVAILABLE_MSG, err.message, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        }

        res.status(constants.HTTP_OK).send({
            status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Fetched"),
            testResult: testResults});
    });
};*/

exports.saveTestResults = function(req, res, next) {

    // create a test result
    var testResultJson = req.body;
    console.info('testResultJson = ', testResultJson);

    if (_.isEmpty(testResultJson)) {
        logger.debug(constants.TEST_RESULT_OBJ_EMPTY_MSG);
        var baseError = new BaseError(Utils.buildErrorResponse(constants.TEST_RESULT_OBJ_EMPTY, '', constants.TEST_RESULT_OBJ_EMPTY_MSG, err.message, 500));
        resEvents.emit('ErrorJsonResponse', req, res, baseError);
    }

    testResultServiceImpl.saveTestResultObject(testResultJson, function (err, testResult) {
        if (err) {
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.TEST_RESULT_DUPLICATE, '', constants.TEST_RESULT_DUPLICATE_MSG, err.message, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
            return;
        }

        res.status(constants.HTTP_OK).send({
            status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Saved"),
            data: testResult
        });
    });
};
