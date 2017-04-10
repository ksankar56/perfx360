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

var TestExecution = require('../../../src/model/TestExecution');

exports.getTestExecutions = function(req, res, callback) {
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

exports.getTestExecution = function(req, res, callback) {
    TestExecution.find({_id : req.params.id})
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

exports.saveTestExecution = function(req, res, next) {

    // create a testExecution
    var testExecutionJson = req.body;
    console.info('testExecutionJson = ', testExecutionJson);

    if (_.isEmpty(testExecutionJson)) {
        logger.debug(constants.TEST_EXECUTION_OBJ_EMPTY_MSG);
        var baseError = new BaseError(Utils.buildErrorResponse(constants.TEST_EXECUTION_OBJ_EMPTY, '', constants.TEST_EXECUTION_OBJ_EMPTY_MSG, err.message, 500));
        resEvents.emit('ErrorJsonResponse', req, res, baseError);
    }

    TestExecution.find({name : testExecutionJson.name}, function (err, testExecution) {
        if (err) {
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.TEST_EXECUTION_NOT_AVAILABLE, '', constants.TEST_EXECUTION_NOT_AVAILABLE_MSG, err.message, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        }

        if(_.isEmpty(testExecution)) {
            var testExecution = ModelUtil.getTestExecutionModel(req, res, testExecutionJson)

            console.info('testExecution = ', testExecution);
            // save testExecution to database
            testExecution.save(function (err) {
                if (err) {
                    logger.debug(err);
                    var baseError = new BaseError(Utils.buildErrorResponse(constants.TEST_EXECUTION_DUPLICATE, '', constants.TEST_EXECUTION_DUPLICATE_MSG, err.message, 500));
                    resEvents.emit('ErrorJsonResponse', req, res, baseError);
                    return;
                }

                res.status(constants.HTTP_OK).send({
                    status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Saved"),
                    data: testExecution
                });
            });
        } else {
            logger.debug(constants.TEST_EXECUTION_NOT_AVAILABLE_MSG);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.TEST_EXECUTION_NOT_AVAILABLE, '', constants.TEST_EXECUTION_NOT_AVAILABLE_MSG, constants.TEST_EXECUTION_NOT_AVAILABLE_MSG, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        }
    });
};

exports.updateTestExecution = function(req, res, next) {
    TestExecution.findById(req.body.id, function (err, testExecution) {
        // Handle any possible database errors
        if (err) {
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.TEST_EXECUTION_NOT_AVAILABLE, '', constants.TEST_EXECUTION_NOT_AVAILABLE_MSG, err.message, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        } else {
            // Update each attribute with any possible attribute that may have been submitted in the body of the request
            // If that attribute isn't in the request body, default back to whatever it was before.
            testExecution = ModelUtil.getTestExecutionUpdateModel(req, res, testExecution);

            // Save the updated document back to the database
            testExecution.save(function (err, result) {
                if (err) {
                    logger.debug(err);
                    var baseError = new BaseError(Utils.buildErrorResponse(constants.TEST_EXECUTION_NOT_AVAILABLE, '', constants.TEST_EXECUTION_NOT_AVAILABLE_MSG, constants.TEST_EXECUTION_NOT_AVAILABLE_MSG, 500));
                    resEvents.emit('ErrorJsonResponse', req, res, baseError);
                }

                res.status(constants.HTTP_OK).send({
                    status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Updated"),
                    data: result});
            });
        }
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
