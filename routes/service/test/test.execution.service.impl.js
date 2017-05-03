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

function saveTestExecutionObject (testExecutionJson, callback) {

    // create a testExecution

    if (_.isEmpty(testExecutionJson)) {
        logger.debug(constants.TEST_EXECUTION_OBJ_EMPTY_MSG);
        //var baseError = new BaseError(Utils.buildErrorResponse(constants.TEST_EXECUTION_OBJ_EMPTY, '', constants.TEST_EXECUTION_OBJ_EMPTY_MSG, err.message, 500));
        //resEvents.emit('ErrorJsonResponse', req, res, baseError);
        callback(baseError, null);
    }

    console.info('testExecutionJson.name = ', testExecutionJson.name);

    var testExecution = ModelUtil.getTestExecutionModel(testExecutionJson)

    // save testExecution to database
    testExecution.save(function (err, dbTestExecution) {
        console.info('**************** dbTestExecution = ', dbTestExecution);
        getTestExecutionObject(dbTestExecution._id, function (err, result) {
            if (err) {
                callback(err, null);
            }
            console.info('sending result = ', result.length);
            if (result && result.length > 0) {
                callback(err, result[0]);
            } else {
                callback(err, result);
            }
        });
    });
}

exports.saveTestExecutionObject = saveTestExecutionObject;


function getTestExecutionObject (testExecutionId, callback) {
    TestExecution.find({_id : testExecutionId})
        .populate({path : 'project', populate: { path: 'groups' }})
        .populate({path : 'test', populate: { path: 'environment' }})
        .populate({path : 'executedComponents', populate: { path: 'componentType' }})
        .populate({path : 'executedBy'})
        .exec( function (err, testExecutions) {
            console.info('err = ', err);
            callback(err, testExecutions);
        });
};
exports.getTestExecutionObject = getTestExecutionObject;

function updateTestExecutionObject (testExecutionJson, callback) {
    TestExecution.findById(testExecutionJson.id, function (err, testExecution) {
        // Handle any possible database errors
        if (err) {
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.TEST_EXECUTION_NOT_AVAILABLE, '', constants.TEST_EXECUTION_NOT_AVAILABLE_MSG, err.message, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        } else {
            // Update each attribute with any possible attribute that may have been submitted in the body of the request
            // If that attribute isn't in the request body, default back to whatever it was before.
            //var testExecution = ModelUtil.getTestExecutionUpdateModel(req, res, testExecution);
            testExecution.timeTaken = testExecutionJson.timeTaken;
            testExecution.resultStatus = testExecutionJson.resultStatus;
            testExecution.executed = testExecutionJson.executed;
            testExecution.updated = testExecution.updated;

            // Save the updated document back to the database
            testExecution.save(function (err, result) {
                callback(err, result);
            });
        }
    });
}
exports.updateTestExecutionObject = updateTestExecutionObject;

function updateObject(testExecutionId, testExecutionJson, callback) {
    console.info('testExecutionId = ', testExecutionId);
    TestExecution.findById(testExecutionId, function (err, testExecution) {

        console.info('testExecution = ', testExecution);
        testExecution.timeTaken = testExecutionJson.timeTaken;
        testExecution.resultStatus = testExecutionJson.resultStatus;
        testExecution.executed = testExecutionJson.executed;
        testExecution.updated = testExecutionJson.updated;
        // Update the document back to the database
        testExecution.save(function (err, result) {
            callback(err, result);
        });
    });

    /*TestExecution.update({_id: mongoose.Types.ObjectId(testExecution._id)}, testExecutionJson,
            {upsert:true}, function(err, result){
        callback(err, result);
    });*/
    /*testExecution.save(function (err, result) {
        callback(err, result);
    });*/
}
exports.updateObject = updateObject;