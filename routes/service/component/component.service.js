/**
 * Created by senthil on 08/04/17.
 */
var _ = require('lodash')
    , mongoose = require('mongoose')
    , winston = require('winston')
    , resEvents = require('../../../src/common/events')
    , Utils = require('../../../src/util/util')
    , ModelUtil = require('../../../src/util/model.util')
    , BaseError = require('../../../src/common/BaseError')
    , constants = require('../../../src/common/constants')
    , Status = require('../../../src/common/domains/Status')
    , baseService = require('../../../src/common/base.service')
    , logger = require('../../../config/logger');

var Component = require('../../../src/model/Component');

exports.getComponents = function(req, res, next) {
    Component.find({})
        .populate('component')
        .exec( function (err, components) {
            if (err) {
                logger.debug(err);
                var baseError = new BaseError(Utils.buildErrorResponse(constants.COMPONENT_NOT_AVAILABLE, '', constants.COMPONENT_NOT_AVAILABLE_MSG, err.message, 500));
                resEvents.emit('ErrorJsonResponse', req, res, baseError);
            }

            res.status(constants.HTTP_OK).send({
                status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Fetched"),
                data: components});
    });
};

exports.saveComponent = function(req, res, next) {

    // create a component
    var componentJson = req.body;

    if (_.isEmpty(componentJson)) {
        logger.debug(constants.COMPONENT_OBJ_EMPTY_MSG);
        var baseError = new BaseError(Utils.buildErrorResponse(constants.COMPONENT_OBJ_EMPTY, '', constants.COMPONENT_OBJ_EMPTY_MSG, constants.COMPONENT_OBJ_EMPTY_MSG, 500));
        resEvents.emit('ErrorJsonResponse', req, res, baseError);
    }

    var component = ModelUtil.getCompomentModel(req, res, componentJson);

    // save component to database
    component.save(function(err) {
        if (err) {
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.COMPONENT_DUPLICATE, '', constants.COMPONENT_DUPLICATE_MSG, err.message, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        }

        res.status(constants.HTTP_OK).send({
            status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Saved"),
            data: component});
    });
};

exports.updateComponent = function(req, res, next) {
    Component.findById(req.body.id, function (err, component) {
        // Handle any possible database errors
        if (err) {
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.COMPONENT_OBJ_EMPTY, '', constants.COMPONENT_OBJ_EMPTY_MSG, constants.COMPONENT_OBJ_EMPTY_MSG, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        } else {
            // Update each attribute with any possible attribute that may have been submitted in the body of the request
            // If that attribute isn't in the request body, default back to whatever it was before.
            component.name = req.body.name || component.name;
            component.description = req.body.description || component.description;
            component.order = req.body.order || component.order;
            component.status = req.body.status || component.status;
            component.componentType = req.body.componentType || component.componentType;
            component.perfLog = req.body.perfLog || component.perfLog;
            component.metricLog = req.body.metricLog || component.metricLog;
            component.networkLog = req.body.networkLog || component.networkLog;

            // Save the updated document back to the database
            component.save(function (err, result) {
                if (err) {
                    logger.debug(err);
                    var baseError = new BaseError(Utils.buildErrorResponse(constants.COMPONENT_DUPLICATE, '', constants.COMPONENT_DUPLICATE_MSG, err.message, 500));
                    resEvents.emit('ErrorJsonResponse', req, res, baseError);
                }

                res.status(constants.HTTP_OK).send({
                    status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Updated"),
                    data: result});
            });
        }
    });
};


exports.deleteComponent = function(req, res, next) {

};