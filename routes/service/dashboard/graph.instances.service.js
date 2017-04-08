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

var GraphInstance = require('../../../src/model/GraphInstance');

exports.getGraphInstances = function(req, res, callback) {
    GraphInstance.find({})
        .populate({path : 'graph', populate: { path: 'graphType' }})
        .exec( function (err, graphInstances) {
        if (err) throw err;

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
        var baseError = new BaseError(Utils.buildErrorResponse(constants.GRAPH_INSTANCE_OBJ_EMPTY, '', constants.GRAPH_INSTANCE_DUPLICATE_MSG, err.message, 500));
        resEvents.emit('ErrorJsonResponse', req, res, {"status" : baseError});
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
            console.info('err = ', err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.GRAPH_INSTANCE_DUPLICATE, '', constants.GRAPH_INSTANCE_DUPLICATE_MSG, err.message, 500));
            resEvents.emit('ErrorJsonResponse', req, res, {"status" : baseError});
            return;
        }

        res.status(constants.HTTP_OK).send({
            status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Saved"),
            data: graphInstance});
    });
};

exports.updateGraphInstance = function(req, res, next) {
    GraphInstance.findById(req.body.id, function (err, graphInstance) {
        // Handle any possible database errors
        if (err) {
            throw err;
        } else {
            // Update each attribute with any possible attribute that may have been submitted in the body of the request
            // If that attribute isn't in the request body, default back to whatever it was before.
            graphInstance.graphInstanceId = req.body.graphInstanceId || graphInstance.graphInstanceId;
            graphInstance.name = req.body.name || graphInstance.name;
            graphInstance.description = req.body.description || graphInstance.description;
            graphInstance.graph = req.body.graph || graphInstance.graph;
            graphInstance.order = req.body.order || graphInstance.order;
            graphInstance.status = req.body.status || graphInstance.status;
            graphInstance.autoRefresh = graphInstanceJson.autoRefresh || graphInstance.autoRefresh;
            graphInstance.autoRefreshDefSec = graphInstanceJson.autoRefreshDefSec || graphInstance.autoRefreshDefSec;
            graphInstance.esQuery = graphInstanceJson.esQuery || graphInstance.esQuery;
            graphInstance.xAxis = graphInstanceJson.xAxis || graphInstance.xAxis;
            graphInstance.xAxisCaption = graphInstanceJson.xAxisCaption || graphInstance.xAxisCaption;
            graphInstance.y1Axis = graphInstanceJson.y1Axis || graphInstance.y1Axis;
            graphInstance.y1AxisCaption = graphInstanceJson.y1AxisCaption || graphInstance.y1AxisCaption;
            graphInstance.y2Axis = graphInstanceJson.y2Axis || graphInstance.y2Axis;
            graphInstance.y2AxisCaption = graphInstanceJson.y2AxisCaption || graphInstance.y2AxisCaption;
            graphInstance.createdDate = graphInstanceJson.createdDate || graphInstance.createdDate;
            graphInstance.updatedDate = graphInstanceJson.updatedDate || graphInstance.updatedDate;
            graphInstance.updatedBy = graphInstanceJson.updatedBy || graphInstance.updatedBy;

            // Save the updated document back to the database
            graphInstance.save(function (err, result) {
                if (err) throw err;

                res.status(constants.HTTP_OK).send({
                    status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Updated"),
                    data: result});
            });
        }
    });
};


exports.deleteGraphInstance = function(req, res, next) {
    GraphInstance.remove({ _id: req.params.id }, function(err) {
        if (err) throw err;

        res.status(constants.HTTP_OK).send({
            status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Deleted")
        });
    });
};