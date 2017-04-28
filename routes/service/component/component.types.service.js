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
    , componentTypeServiceImpl = require('./component.types.service.impl')
    , logger = require('../../../config/logger');

var ComponentType = require('../../../src/model/ComponentType');

exports.getComponentTypes = function(req, res, callback) {
    componentTypeServiceImpl.getComponentTypes(function(err, componentTypes) {
        if (err) {
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.COMPONENT_TYPE_NOT_AVAILABLE, '', constants.COMPONENT_TYPE_NOT_AVAILABLE_MSG, err.message, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        }

        res.status(constants.HTTP_OK).send({
            status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Fetched"),
            data: componentTypes});
    });
};

exports.saveComponentType = function(req, res, next) {

    // create a component type
    var componentTypeJson = req.body;

    if (_.isEmpty(componentTypeJson)) {
        logger.debug(constants.COMPONENT_TYPE_DUPLICATE_MSG);
        var baseError = new BaseError(Utils.buildErrorResponse(constants.COMPONENT_TYPE_OBJ_EMPTY, '', constants.COMPONENT_TYPE_OBJ_EMPTY_MSG, constants.COMPONENT_TYPE_OBJ_EMPTY_MSG, 500));
        resEvents.emit('ErrorJsonResponse', req, res, baseError);
    }

    var componentType = new ComponentType({
        name: componentTypeJson.name,
        description: componentTypeJson.description,
        order : componentTypeJson.order,
        status : componentTypeJson.status
    });

    // save component type to database
    componentType.save(function(err) {
        if (err) {
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.COMPONENT_TYPE_DUPLICATE, '', constants.COMPONENT_TYPE_DUPLICATE_MSG, err.message, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        }

        res.status(constants.HTTP_OK).send({
            status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Saved"),
            data: componentType});
    });
};

exports.updateComponentType = function(req, res, next) {
    ComponentType.findById(req.body.id, function (err, componentType) {
        // Handle any possible database errors
        if (err) {
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.COMPONENT_TYPE_OBJ_EMPTY, '', constants.COMPONENT_TYPE_OBJ_EMPTY_MSG, constants.COMPONENT_TYPE_OBJ_EMPTY_MSG, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        } else {
            // Update each attribute with any possible attribute that may have been submitted in the body of the request
            // If that attribute isn't in the request body, default back to whatever it was before.
            componentType.name = req.body.name || componentType.name;
            componentType.description = req.body.description || componentType.description;
            componentType.order = req.body.order || componentType.order;
            componentType.status = req.body.status || componentType.status;

            // Save the updated document back to the database
            componentType.save(function (err, result) {
                if (err) {
                    logger.debug(err);
                    var baseError = new BaseError(Utils.buildErrorResponse(constants.COMPONENT_TYPE_DUPLICATE, '', constants.COMPONENT_TYPE_DUPLICATE_MSG, err.message, 500));
                    resEvents.emit('ErrorJsonResponse', req, res, baseError);
                }

                res.status(constants.HTTP_OK).send({
                    status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Updated"),
                    data: result});
            });
        }
    });
};


exports.deleteComponentType = function(req, res, next) {
    ComponentType.remove({ _id: req.params.id }, function(err) {
        if (err) {
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.COMPONENT_TYPE_NOT_AVAILABLE, '', constants.COMPONENT_TYPE_NOT_AVAILABLE_MSG, err.message, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        }

        res.status(constants.HTTP_OK).send({
            status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Deleted"),
        });
    });
};