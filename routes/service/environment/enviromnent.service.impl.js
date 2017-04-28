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

function getEnvironment(id, callback) {
    Environment.find({_id : id}, function (err, environments) {
        if (err) {
            callback(err, null);
        }

        if (environments && environments.length > 0) {
            callback(err, environments[0]);
        }
    });
}
exports.getEnvironment = getEnvironment;

function getEnvironmentsByProjectId(projectId, callback) {
    Environment.find({project : projectId}, function (err, environments) {
        callback(err, environments);
    });
}
exports.getEnvironmentsByProjectId = getEnvironmentsByProjectId;

function saveEnvironment(environmentJson, callback) {

    // create a user a new user
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
        status : environmentJson.status,
        project : environmentJson.project
    });

    // save environment to database
    environment.save(function(err) {
        console.info('err environment = ', err);
        callback(err, environment);
    });
}
exports.saveEnvironment = saveEnvironment;

function updateEnvironment(req, callback) {
    Environment.findById(req.body.id, function (err, environment) {
        // Handle any possible database errors
        if (err) {
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.ENVIRONMENT_NOT_AVAILABLE, '', constants.ENVIRONMENT_NOT_AVAILABLE_MSG, err.message, 500));
            callback(err, null);
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
            environment.project = req.body.status || environment.project;

            // Save the updated document back to the database
            environment.save(function (err, result) {
                callback(err, result);
            });
        }
    });
};
exports.updateEnvironment = updateEnvironment;

function deleteEnvironment(id, callback) {
    Environment.remove({ _id: id }, function(err) {
       callback(err, true);
    });
};
exports.deleteEnvironment = deleteEnvironment;