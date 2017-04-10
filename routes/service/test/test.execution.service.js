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
    , logger = require('../../../config/logger')
    , testExecutionServiceImpl = require('../../service/test/test.execution.service.impl');

var TestExecution = require('../../../src/model/TestExecution');

exports.getTestExecutions = function(req, res, next) {
    TestExecution.find({})
        .populate({path : 'project', populate: { path: 'groups' }})
        .populate({path : 'test', populate: { path: 'environment' }})
        .populate({path : 'executedComponents', populate: { path: 'componentType' }})
        .populate({path : 'executedBy'})
        .exec( function (err, testExecutions) {
            if (err) {
                logger.debug(err);
                var baseError = new BaseError(Utils.buildErrorResponse(constants.TEST_EXECUTION_NOT_AVAILABLE, '', constants.TEST_EXECUTION_NOT_AVAILABLE_MSG, err.message, 500));
                resEvents.emit('ErrorJsonResponse', req, res, baseError);
            }

            res.status(constants.HTTP_OK).send({
                status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Fetched"),
                data: testExecutions});
    });
};

exports.getTestExecution = function(req, res, next) {
    var testExecutionId = req.params.id;
    console.info('testExecutionId = ', testExecutionId);
    testExecutionServiceImpl.getTestExecutionObject(testExecutionId, function (err, testExecution) {
        if (err) {
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.TEST_EXECUTION_NOT_AVAILABLE, '', constants.TEST_EXECUTION_NOT_AVAILABLE_MSG, err.message, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        }

        res.status(constants.HTTP_OK).send({
            status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Fetched"),
            data: testExecution});
    });
};

exports.saveTestExecution = function(req, res, next) {
    var testExecutionJson = req.body;
    testExecutionServiceImpl.saveTestExecutionObject(testExecutionJson, req, function(err, testExecition) {
        if (err) {
            logger.debug(err);
            resEvents.emit('ErrorJsonResponse', req, res, err);
            return;
        }

        res.status(constants.HTTP_OK).send({
            status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Saved"),
            data: testExecution
        });
    });
};

exports.updateTestExecution = function(req, res, next) {
    testExecutionServiceImpl.updateTestExecutionObject(testExecution, function(err, result){
        if (err) {
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.TEST_EXECUTION_NOT_AVAILABLE, '', constants.TEST_EXECUTION_NOT_AVAILABLE_MSG, constants.TEST_EXECUTION_NOT_AVAILABLE_MSG, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        }

        res.status(constants.HTTP_OK).send({
            status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Updated"),
            data: result});
    });
};

exports.deleteTestExecution = function(req, res, next) {
    TestExecution.remove({ _id: req.params.id }, function(err) {
        if (err) {
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.TEST_EXECUTION_DUPLICATE, '', constants.TEST_EXECUTION_DUPLICATE_MSG, constants.TEST_EXECUTION_DUPLICATE_MSG, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        }

        res.status(constants.HTTP_OK).send({
            status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Deleted")
        });
    });
};


exports.saveTestExecutions = function(req, res, next) {

};

exports.updateTestExecutions = function(req, res, next) {

};

exports.deleteTestExecutions = function(req, res, next) {

};
