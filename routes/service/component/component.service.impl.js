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

function getComponents(callback) {
    Component.find({})
        .populate({path : 'componentType'})
        .populate({path : 'group'})
        .exec( function (err, components) {
           callback(err, components);
    });
};
exports.getComponents = getComponents;

function getComponentsByProjectId(projectId, callback) {
    Component.find({project: projectId})
        .populate({path : 'componentType'})
        .populate({path : 'group'})
        .exec( function (err, components) {
            callback(err, components);
        });
};
exports.getComponentsByProjectId = getComponentsByProjectId;

function getComponent(id, callback) {
    Component.find({_id: id})
        .populate({path : 'components', populate: { path: 'componentTypes' }})
        .populate({path : 'environment'})
        .populate({path : 'componentType'})
        .populate({path : 'group'})
        .exec( function (err, component) {
            callback(err, component);
        });
};
exports.getComponent = getComponent;

function saveComponent(componentJson, callback) {

    console.info('componentJson = ', componentJson);
    if (_.isEmpty(componentJson)) {
        logger.debug(constants.COMPONENT_OBJ_EMPTY_MSG);
        var baseError = new BaseError(Utils.buildErrorResponse(constants.COMPONENT_OBJ_EMPTY, '', constants.COMPONENT_OBJ_EMPTY_MSG, constants.COMPONENT_OBJ_EMPTY_MSG, 500));
        callback(baseError, null);
        return;
    }

    var component = ModelUtil.getCompomentModel(componentJson);

    console.info('component = ', component);
    // save component to database
    component.save(function(err) {
        if (err) {
            console.info('err = ', err);
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.COMPONENT_DUPLICATE, '', constants.COMPONENT_DUPLICATE_MSG, err.message, 500));
            callback(baseError, null);
            return;
        }

        callback(err, component);
    });
};
exports.saveComponent = saveComponent;

function updateComponentByComponent(component, callback) {
    console.info('component = ', component);

    // Save the updated document back to the database
    component.save(function (err, result) {
        callback(err, result);
    });
};
exports.updateComponentByComponent = updateComponentByComponent;

function updateComponent(id, callback) {
    console.info('id = ', id);

    Component.findById(id, function (err, component) {
        // Handle any possible database errors
        if (err) {
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.COMPONENT_OBJ_EMPTY, '', constants.COMPONENT_OBJ_EMPTY_MSG, constants.COMPONENT_OBJ_EMPTY_MSG, 500));
            callback(baseError, null);
            return;
        } else {
            // Update each attribute with any possible attribute that may have been submitted in the body of the request
            // If that attribute isn't in the request body, default back to whatever it was before.

            var component = ModelUtil.updateComponentModel(req, component);

            // Save the updated document back to the database
            component.save(function (err, result) {
                callback(err, result);
            });
        }
    });
};
exports.updateComponent = updateComponent;

exports.deleteComponent = function(req, res, next) {

};