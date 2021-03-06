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
    , environmentServiceImpl = require('./enviromnent.service.impl')
    , logger = require('../../../config/logger');

var Environment = require('../../../src/model/Environment');

exports.getEnvironments = function(req, res, callback) {
    environmentServiceImpl.getAllEnvironments(function(err, environments) {
        if (err) {
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.ENVIRONMENT_NOT_AVAILABLE, '', constants.ENVIRONMENT_NOT_AVAILABLE_MSG, err.message, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        };

        res.status(constants.HTTP_OK).send({
            status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Fetched"),
            data: environments});
    });
};

exports.saveEnvironment = function(req, res, next) {

    environmentServiceImpl.saveEnvironment(req.body, function(err, environments) {
        if (err) {
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.COMPONENT_TYPE_DUPLICATE, '', constants.COMPONENT_TYPE_DUPLICATE_MSG, err.message, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        }

        res.status(constants.HTTP_OK).send({
            status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Saved"),
            data: environment});
    });
};

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


exports.deleteEnvironment = function(req, res, next) {
    Environment.remove({ _id: req.params.id }, function(err) {
        if (err) {
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.ENVIRONMENT_NOT_AVAILABLE, '', constants.ENVIRONMENT_NOT_AVAILABLE_MSG, err.message, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        }

        res.status(constants.HTTP_OK).send({
            status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Deleted"),
        });
    });
};