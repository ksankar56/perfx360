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

var GraphInstance = require('../../../src/model/GraphInstance');

exports.getGraphInstances = function(req, res, callback) {
    GraphInstance.find({})
        .populate({path : 'graph', populate: { path: 'graphType' }})
        .exec( function (err, graphInstances) {
        if (err) {
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.GRAPH_INSTANCE_OBJ_EMPTY, '', constants.GRAPH_INSTANCE_OBJ_EMPTY_MSG, err.message, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        }

        res.status(constants.HTTP_OK).send({
            status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Fetched"),
            data: graphInstances});
    });
};

exports.getGraphInstance = function(req, res, callback) {
    GraphInstance.find({_id : req.params.id})
        .populate({path : 'graph', populate: { path: 'graphType' }})
        .exec( function (err, graphInstances) {
            if (err) {
                logger.debug(err);
                var baseError = new BaseError(Utils.buildErrorResponse(constants.GRAPH_INSTANCE_OBJ_EMPTY, '', constants.GRAPH_INSTANCE_OBJ_EMPTY_MSG, err.message, 500));
                resEvents.emit('ErrorJsonResponse', req, res, baseError);
            }

            res.status(constants.HTTP_OK).send({
                status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Fetched"),
                data: graphInstances});
        });
};

exports.saveGraphInstance = function(req, res, next) {

    // create an graph instance
    var graphInstanceJson = req.body;
    console.info('graphInstanceJson = ', graphInstanceJson);

    if (_.isEmpty(graphInstanceJson)) {
        logger.debug(constants.GRAPH_INSTANCE_DUPLICATE_MSG);
        var baseError = new BaseError(Utils.buildErrorResponse(constants.GRAPH_INSTANCE_OBJ_EMPTY, '', constants.GRAPH_INSTANCE_DUPLICATE_MSG, constants.GRAPH_INSTANCE_DUPLICATE_MSG, 500));
        resEvents.emit('ErrorJsonResponse', req, res, baseError);
    }

    var graphInstance = new GraphInstance({
        graphInstanceId: graphInstanceJson.graphInstanceId,
        name: graphInstanceJson.name,
        description: graphInstanceJson.description,
        graph: graphInstanceJson.graph,
        order : graphInstanceJson.order,
        status : graphInstanceJson.status,
        autoRefresh : graphInstanceJson.autoRefresh,
        autoRefreshDefSec : graphInstanceJson.autoRefreshDefSec,
        esQuery : graphInstanceJson.esQuery,
        xAxis : graphInstanceJson.xAxis,
        xAxisCaption : graphInstanceJson.xAxisCaption,
        y1Axis : graphInstanceJson.y1Axis,
        y1AxisCaption : graphInstanceJson.y1AxisCaption,
        y2Axis : graphInstanceJson.y2Axis,
        y2AxisCaption : graphInstanceJson.y2AxisCaption,
        createdDate : graphInstanceJson.createdDate,
        updatedDate : graphInstanceJson.updatedDate,
        updatedBy : graphInstanceJson.updatedBy,
    });

    // save graph instanceto database
    graphInstance.save(function(err) {
        if (err) {
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.GRAPH_INSTANCE_DUPLICATE, '', constants.GRAPH_INSTANCE_DUPLICATE_MSG, err.message, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        }

        res.status(constants.HTTP_OK).send({
            status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Saved"),
            data: graphInstance});
    });
};

exports.updateGraphInstance = function(req, res, next) {
    console.info('graph instance update');
    GraphInstance.findById(req.body.id, function (err, graphInstance) {
        // Handle any possible database errors
        if (err) {
            logger.debug(constants.GRAPH_INSTANCE_NOT_AVAILABLE_MSG);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.GRAPH_INSTANCE_NOT_AVAILABLE, '', constants.GRAPH_INSTANCE_NOT_AVAILABLE_MSG, constants.GRAPH_INSTANCE_NOT_AVAILABLE_MSG, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        } else {
            // Update each attribute with any possible attribute that may have been submitted in the body of the request
            // If that attribute isn't in the request body, default back to whatever it was before.
            graphInstance.graphInstanceId = req.body.graphInstanceId || graphInstance.graphInstanceId;
            graphInstance.name = req.body.name || graphInstance.name;
            graphInstance.description = req.body.description || graphInstance.description;
            graphInstance.graph = req.body.graph || graphInstance.graph;
            graphInstance.order = req.body.order || graphInstance.order;
            graphInstance.status = req.body.status || graphInstance.status;
            graphInstance.autoRefresh = req.body.autoRefresh || graphInstance.autoRefresh;
            graphInstance.autoRefreshDefSec = req.body.autoRefreshDefSec || graphInstance.autoRefreshDefSec;
            graphInstance.esQuery = req.body.esQuery || graphInstance.esQuery;
            graphInstance.xAxis = req.body.xAxis || graphInstance.xAxis;
            graphInstance.xAxisCaption = req.body.xAxisCaption || graphInstance.xAxisCaption;
            graphInstance.y1Axis = req.body.y1Axis || graphInstance.y1Axis;
            graphInstance.y1AxisCaption = req.body.y1AxisCaption || graphInstance.y1AxisCaption;
            graphInstance.y2Axis = req.body.y2Axis || graphInstance.y2Axis;
            graphInstance.y2AxisCaption = req.body.y2AxisCaption || graphInstance.y2AxisCaption;
            graphInstance.createdDate = req.body.createdDate || graphInstance.createdDate;
            graphInstance.updatedDate = req.body.updatedDate || graphInstance.updatedDate;
            graphInstance.updatedBy = req.body.updatedBy || graphInstance.updatedBy;

            // Save the updated document back to the database
            graphInstance.save(function (err, result) {
                if (err) {
                    logger.debug(err);
                    var baseError = new BaseError(Utils.buildErrorResponse(constants.GRAPH_INSTANCE_NOT_AVAILABLE, '', constants.GRAPH_INSTANCE_NOT_AVAILABLE_MSG, err.message, 500));
                    resEvents.emit('ErrorJsonResponse', req, res, baseError);
                }

                res.status(constants.HTTP_OK).send({
                    status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Updated"),
                    data: result});
            });
        }
    });
};


exports.deleteGraphInstance = function(req, res, next) {
    GraphInstance.remove({ _id: req.params.id }, function(err) {
        if (err) {
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.GRAPH_INSTANCE_NOT_AVAILABLE, '', constants.GRAPH_INSTANCE_NOT_AVAILABLE_MSG, err.message, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        }

        res.status(constants.HTTP_OK).send({
            status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Deleted")
        });
    });
};

exports.saveGraphInstances = function(req, res, callback) {

};

exports.updateGraphInstances = function(req, res, callback) {

};

exports.deleteGraphInstances = function(req, res, callback) {

};