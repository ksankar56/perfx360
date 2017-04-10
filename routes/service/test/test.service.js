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

var testServiceImpl = require('./test.service.impl');

exports.getTests = function(req, res, callback) {
    testServiceImpl.getTestObjects(function (err, tests) {
        if (err) {
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.TEST_NOT_AVAILABLE, '', constants.TEST_NOT_AVAILABLE_MSG, err.message, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        }

        res.status(constants.HTTP_OK).send({
            status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Fetched"),
            data: tests});
    })
};

exports.getTest = function(req, res, callback) {
    testServiceImpl.getTestObject(req.params.testId, function (err, tests) {
        if (err) {
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.TEST_NOT_AVAILABLE, '', constants.TEST_NOT_AVAILABLE_MSG, err.message, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        }

        res.status(constants.HTTP_OK).send({
            status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Fetched"),
            test: tests});
    });
};

exports.saveTest = function(req, res, next) {

    // create a test
    var testJson = req.body;
    console.info('testJson = ', testJson);

    if (_.isEmpty(testJson)) {
        logger.debug(constants.TEST_OBJ_EMPTY_MSG);
        var baseError = new BaseError(Utils.buildErrorResponse(constants.TEST_OBJ_EMPTY, '', constants.TEST_OBJ_EMPTY_MSG, err.message, 500));
        resEvents.emit('ErrorJsonResponse', req, res, baseError);
    }

    Test.find({name : testJson.name}, function (err, test) {
        if (err) {
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.TEST_NOT_AVAILABLE, '', constants.TEST_NOT_AVAILABLE_MSG, err.message, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        }

        if(_.isEmpty(test)) {
            var test = ModelUtil.getTestModel(req, res, testJson)

            console.info('test = ', test);
            // save test to database
            test.save(function (err) {
                if (err) {
                    logger.debug(err);
                    var baseError = new BaseError(Utils.buildErrorResponse(constants.TEST_DUPLICATE, '', constants.TEST_DUPLICATE_MSG, err.message, 500));
                    resEvents.emit('ErrorJsonResponse', req, res, baseError);
                    return;
                }

                res.status(constants.HTTP_OK).send({
                    status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Saved"),
                    data: test
                });
            });
        } else {
            logger.debug(constants.TEST_NOT_AVAILABLE_MSG);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.TEST_NOT_AVAILABLE, '', constants.TEST_NOT_AVAILABLE_MSG, constants.TEST_NOT_AVAILABLE_MSG, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        }
    });
};

exports.updateTest = function(req, res, next) {
    Test.findById(req.body.id, function (err, test) {
        // Handle any possible database errors
        if (err) {
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.TEST_NOT_AVAILABLE, '', constants.TEST_NOT_AVAILABLE_MSG, err.message, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        } else {
            // Update each attribute with any possible attribute that may have been submitted in the body of the request
            // If that attribute isn't in the request body, default back to whatever it was before.
            test = ModelUtil.getTestUpdateModel(req, res, test);

            // Save the updated document back to the database
            test.save(function (err, result) {
                if (err) {
                    logger.debug(err);
                    var baseError = new BaseError(Utils.buildErrorResponse(constants.TEST_DUPLICATE, '', constants.TEST_DUPLICATE_MSG, err.message, 500));
                    resEvents.emit('ErrorJsonResponse', req, res, baseError);
                }

                res.status(constants.HTTP_OK).send({
                    status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Updated"),
                    data: result});
            });
        }
    });
};


exports.deleteTest = function(req, res, next) {
    Test.remove({ _id: req.params.id }, function(err) {
        if (err) {
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.TEST_DUPLICATE, '', constants.TEST_DUPLICATE_MSG, constants.TEST_DUPLICATE_MSG, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        }

        res.status(constants.HTTP_OK).send({
            status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Deleted")
        });
    });
};


exports.saveTests = function(req, res, next) {

};

exports.updateTests = function(req, res, next) {

};

exports.deleteTests = function(req, res, next) {

};
