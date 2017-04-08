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
    , baseService = require('../../../src/common/base.service');

var ComponentType = require('../../../src/model/ComponentType');

exports.getComponentTypes = function(req, res, callback) {
    ComponentType.find(function (err, componentTypes) {
        if (err) throw err;

        res.status(constants.HTTP_OK).send({
            status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Fetched"),
            data: componentTypes});
    });
};

exports.saveComponentType = function(req, res, next) {

    // create a user a new user
    var componentTypeJson = req.body;
    console.info('componentTypeJson = ', componentTypeJson);

    if (_.isEmpty(componentTypeJson)) {
        var baseError = new BaseError(Utils.buildErrorResponse(constants.COMPONENT_TYPE_OBJ_EMPTY, '', constants.COMPONENT_TYPE_DUPLICATE_MSG, err.message, 500));
        resEvents.emit('ErrorJsonResponse', req, res, {"status" : baseError});
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
            var baseError = new BaseError(Utils.buildErrorResponse(constants.COMPONENT_TYPE_DUPLICATE, '', constants.COMPONENT_TYPE_DUPLICATE_MSG, err.message, 500));
            resEvents.emit('ErrorJsonResponse', req, res, {"status" : baseError});
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
            throw err;
        } else {
            // Update each attribute with any possible attribute that may have been submitted in the body of the request
            // If that attribute isn't in the request body, default back to whatever it was before.
            componentType.name = req.body.name || componentType.name;
            componentType.description = req.body.description || componentType.description;
            componentType.order = req.body.order || componentType.price;
            componentType.status = req.body.status || componentType.status;

            // Save the updated document back to the database
            componentType.save(function (err, result) {
                if (err) throw err;

                res.status(constants.HTTP_OK).send({
                    status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Updated"),
                    data: result});
            });
        }
    });
};


exports.deleteComponentType = function(req, res, next) {
    ComponentType.remove({ _id: req.params.id }, function(err) {
        if (err) throw err;

        res.status(constants.HTTP_OK).send({
            status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Deleted"),
        });
    });
};