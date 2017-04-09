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

var GraphType = require('../../../src/model/GraphType');

exports.getGraphTypes = function(req, res, callback) {
    GraphType.find(function (err, graphTypes) {
        if (err) {
            var baseError = new BaseError(Utils.buildErrorResponse(constants.GRAPH_TYPE_NOT_AVAILABLE, '', constants.GRAPH_TYPE_NOT_AVAILABLE_MSG, err.message, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        }

        res.status(constants.HTTP_OK).send({
            status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Fetched"),
            data: graphTypes});
    });
};

exports.getGraphType = function(req, res, callback) {
    GraphType.find({ _id: req.params.id }, function (err, graphTypes) {
        if (err) {
            var baseError = new BaseError(Utils.buildErrorResponse(constants.GRAPH_TYPE_NOT_AVAILABLE, '', constants.GRAPH_TYPE_NOT_AVAILABLE_MSG, err.message, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        }

        res.status(constants.HTTP_OK).send({
            status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Fetched"),
            data: graphTypes});
    });
};

exports.saveGraphType = function(req, res, next) {

    // create a user a new user
    var graphTypeJson = req.body;
    console.info('graphTypeJson = ', graphTypeJson);

    if (_.isEmpty(graphTypeJson)) {
        var baseError = new BaseError(Utils.buildErrorResponse(constants.GRAPH_TYPE_OBJ_EMPTY, '', constants.GRAPH_TYPE_DUPLICATE_MSG, err.message, 500));
        resEvents.emit('ErrorJsonResponse', req, res, baseError);
    }

    var graphType = new GraphType({
        typeId: graphTypeJson.typeId,
        name: graphTypeJson.name,
        description: graphTypeJson.description,
        order : graphTypeJson.order,
        status : graphTypeJson.status
    });

    // save component type to database
    graphType.save(function(err) {
        if (err) {
            var baseError = new BaseError(Utils.buildErrorResponse(constants.GRAPH_TYPE_DUPLICATE, '', constants.GRAPH_TYPE_DUPLICATE_MSG, err.message, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        }

        res.status(constants.HTTP_OK).send({
            status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Saved"),
            data: graphType});
    });
};

exports.updateGraphType = function(req, res, next) {
    GraphType.findById(req.body.id, function (err, graphType) {
        // Handle any possible database errors
        if (err) {
            var baseError = new BaseError(Utils.buildErrorResponse(constants.GRAPH_TYPE_NOT_AVAILABLE, '', constants.GRAPH_TYPE_NOT_AVAILABLE_MSG, err.message, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        } else {
            // Update each attribute with any possible attribute that may have been submitted in the body of the request
            // If that attribute isn't in the request body, default back to whatever it was before.
            graphType.typeId = req.body.typeId || graphType.typeId;
            graphType.name = req.body.name || graphType.name;
            graphType.description = req.body.description || graphType.description;
            graphType.order = req.body.order || graphType.order;
            graphType.status = req.body.status || graphType.status;

            // Save the updated document back to the database
            graphType.save(function (err, result) {
                if (err) throw err;

                res.status(constants.HTTP_OK).send({
                    status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Updated"),
                    data: result});
            });
        }
    });
};


exports.deleteGraphType = function(req, res, next) {
    GraphType.remove({ _id: req.params.id }, function(err) {
        if (err) {
            var baseError = new BaseError(Utils.buildErrorResponse(constants.GRAPH_TYPE_NOT_AVAILABLE, '', constants.GRAPH_TYPE_NOT_AVAILABLE_MSG, err.message, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        }

        res.status(constants.HTTP_OK).send({
            status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Deleted"),
        });
    });
};