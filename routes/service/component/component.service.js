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

var Component = require('../../../src/model/Component');

exports.getComponents = function(req, res, next) {
    Component.find({})
        .populate('componentType')
        .exec( function (err, components) {
            if (err) throw err;

            res.status(constants.HTTP_OK).send({
                status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Updated"),
                data: components});
    });
};

exports.saveComponent = function(req, res, next) {

    // create a component
    var componentJson = req.body;
    console.info('componentJson = ', componentJson);

    if (_.isEmpty(componentJson)) {
        var baseError = new BaseError(Utils.buildErrorResponse(constants.COMPONENT_OBJ_EMPTY, '', constants.COMPONENT_DUPLICATE_MSG, err.message, 500));
        resEvents.emit('ErrorJsonResponse', req, res, {"status" : baseError});
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
            var baseError = new BaseError(Utils.buildErrorResponse(constants.COMPONENT_DUPLICATE, '', constants.COMPONENT_DUPLICATE_MSG, err.message, 500));
            resEvents.emit('ErrorJsonResponse', req, res, {"status" : baseError});
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