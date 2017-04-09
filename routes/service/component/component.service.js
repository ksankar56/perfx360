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

var Component = require('../../../src/model/Component');

exports.getComponents = function(req, res, next) {
    Component.find({})
        .populate('componentType')
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

    var component = new Component({
        name: componentJson.name,
        description: componentJson.description,
        order : componentJson.order,
        status : componentJson.status,
        componentType: componentJson.componentType
    });

    // save component type to database
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

};


exports.deleteComponent = function(req, res, next) {

};