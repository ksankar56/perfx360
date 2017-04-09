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

var Graph = require('../../../src/model/Graph');

exports.getGraphs = function(req, res, next) {
    Graph.find({})
        .populate('graphType')
        .exec( function (err, graphs) {
            if (err) {
                logger.debug(err);
                var baseError = new BaseError(Utils.buildErrorResponse(constants.GRAPH_NOT_AVAILABLE, '', constants.GRAPH_NOT_AVAILABLE_MSG, err.message, 500));
                resEvents.emit('ErrorJsonResponse', req, res, baseError);
            }

            res.status(constants.HTTP_OK).send({
                status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Fetched"),
                data: graphs});
    });
};

exports.getGraph = function(req, res, next) {
    Graph.find({_id : req.params.id})
        .populate('graphType')
        .exec( function (err, graphs) {
            if (err) {
                logger.debug(err);
                var baseError = new BaseError(Utils.buildErrorResponse(constants.GRAPH_NOT_AVAILABLE, '', constants.GRAPH_NOT_AVAILABLE_MSG, err.message, 500));
                resEvents.emit('ErrorJsonResponse', req, res, baseError);
            }

            res.status(constants.HTTP_OK).send({
                status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Fetched"),
                data: graphs});
        });
};

exports.saveGraph = function(req, res, next) {

    // create a graph
    var graphJson = req.body;
    console.info('graphJson = ', graphJson);

    if (_.isEmpty(graphJson)) {
        logger.debug(constants.GRAPH_OBJ_EMPTY_MSG);
        var baseError = new BaseError(Utils.buildErrorResponse(constants.GRAPH_OBJ_EMPTY, '', constants.GRAPH_OBJ_EMPTY_MSG, constants.GRAPH_OBJ_EMPTY_MSG, 500));
        resEvents.emit('ErrorJsonResponse', req, res, baseError);
    }

    var graph = new Graph({
        name: graphJson.name,
        description: graphJson.description,
        order : graphJson.order,
        status : graphJson.status,
        graphType: graphJson.graphType
    });

    // save graph type to database
    graph.save(function(err) {
        if (err) {
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.FATAL_ERROR, '', constants.FATAL_ERROR_MSG, err.message, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        }

        res.status(constants.HTTP_OK).send({
            status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Saved"),
            data: graph});
    });
};

exports.updateGraph = function(req, res, next) {

};


exports.deleteGraph = function(req, res, next) {

};