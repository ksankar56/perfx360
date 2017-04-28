/**
 * Created by senthil on 08/04/17.
 */
var _ = require('lodash')
    , mongoose = require('mongoose')
    , winston = require('winston')
    , resEvents = require('../../../src/common/events')
    , Utils = require('../../../src/util/util')
    , BaseError = require('../../../src/common/BaseError')
    , constants = require('../../../src/common/constants')
    , Status = require('../../../src/common/domains/Status')
    , baseService = require('../../../src/common/base.service')
    , logger = require('../../../config/logger');

var Environment = require('../../../src/model/Environment');

function getAllEnvironments(callback) {
    Environment.find(function (err, environments) {
       callback(err, environments);
    });
}
exports.getAllEnvironments = getAllEnvironments;

function getEnvironmentsByProjectId(projectId, callback) {
    Environment.find({project : projectId}, function (err, environments) {
        callback(err, environments);
    });
}
exports.getEnvironmentsByProjectId = getEnvironmentsByProjectId;

function saveEnvironment(environmentJson, next) {

    // create a user a new user
    var environmentJson = req.body;
    console.info('environmentJson = ', environmentJson);

    if (_.isEmpty(environmentJson)) {
        logger.debug(constants.COMPONENT_TYPE_DUPLICATE_MSG);
        var baseError = new BaseError(Utils.buildErrorResponse(constants.ENVIRONMENT_OBJ_EMPTY, '', constants.ENVIRONMENT_OBJ_EMPTY_MSG, constants.ENVIRONMENT_OBJ_EMPTY_MSG, 500));
        callback(baseError, null);
    }

    var environment = new Environment({
        name: environmentJson.name,
        description: environmentJson.description,
        protocol: environmentJson.protocol,
        host: environmentJson.host,
        port: environmentJson.port,
        context: environmentJson.context,
        order : environmentJson.order,
        status : environmentJson.status
    });

    // save environment to database
    environment.save(function(err) {
       callback(err, environment);
    });
}
exports.saveEnvironment = saveEnvironment;

exports.updateEnvironment = function(req, res, next) {
    Environment.findById(req.body.id, function (err, environment) {
        // Handle any possible database errors
        if (err) {
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.ENVIRONMENT_NOT_AVAILABLE, '', constants.ENVIRONMENT_NOT_AVAILABLE_MSG, err.message, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        } else {
            // Update each attribute with any possible attribute that may have been submitted in the body of the request
            // If that attribute isn't in the request body, default back to whatever it was before.
            environment.name = req.body.name || environment.name;
            environment.description = req.body.description || environment.description;
            environment.protocol = req.body.protocol || environment.protocol;
            environment.host = req.body.host || environment.host;
            environment.port = req.body.port || environment.port;
            environment.context = req.body.context || environment.context;
            environment.order = req.body.order || environment.order;
            environment.status = req.body.status || environment.status;

            // Save the updated document back to the database
            environment.save(function (err, result) {
                if (err) {
                    logger.debug(err);
                    var baseError = new BaseError(Utils.buildErrorResponse(constants.FATAL_ERROR, '', constants.FATAL_ERROR_MSG, err.message, 500));
                    resEvents.emit('ErrorJsonResponse', req, res, baseError);
                }

                res.status(constants.HTTP_OK).send({
                    status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Updated"),
                    data: result});
            });
        }
    });
};


exports.deleteEnvironment = function(id, callback) {
    Environment.remove({ _id: id }, function(err) {
       callback(err, true);
    });
};