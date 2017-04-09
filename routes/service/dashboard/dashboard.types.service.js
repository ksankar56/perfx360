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

var DashboardType = require('../../../src/model/DashboardType');

exports.getDashboardTypes = function(req, res, callback) {
    DashboardType.find(function (err, dashboardTypes) {
        if (err) {
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.DASHBOARD_TYPE_NOT_AVAILABLE, '', constants.DASHBOARD_TYPE_NOT_AVAILABLE_MSG, err.message, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        }

        res.status(constants.HTTP_OK).send({
            status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Fetched"),
            data: dashboardTypes});
    });
};

exports.getDashboardType = function(req, res, callback) {
    DashboardType.find({ _id: req.params.id }, function (err, dashboardTypes) {
        if (err) {
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.DASHBOARD_TYPE_NOT_AVAILABLE, '', constants.DASHBOARD_TYPE_NOT_AVAILABLE_MSG, err.message, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        }

        res.status(constants.HTTP_OK).send({
            status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Fetched"),
            data: dashboardTypes});
    });
};

exports.saveDashboardType = function(req, res, next) {

    // create a user a new user
    var dashboardTypeJson = req.body;
    console.info('dashboardTypeJson = ', dashboardTypeJson);

    if (_.isEmpty(dashboardTypeJson)) {
        logger.debug(constants.DASHBOARD_TYPE_DUPLICATE_MSG);
        var baseError = new BaseError(Utils.buildErrorResponse(constants.DASHBOARD_TYPE_OBJ_EMPTY, '', constants.DASHBOARD_TYPE_OBJ_EMPTY_MSG, constants.DASHBOARD_TYPE_OBJ_EMPTY_MSG, 500));
        resEvents.emit('ErrorJsonResponse', req, res, baseError);
    }

    var dashboardType = new DashboardType({
        typeId: dashboardTypeJson.typeId,
        name: dashboardTypeJson.name,
        description: dashboardTypeJson.description,
        order : dashboardTypeJson.order,
        status : dashboardTypeJson.status
    });

    // save component type to database
    dashboardType.save(function(err) {
        if (err) {
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.DASHBOARD_TYPE_DUPLICATE, '', constants.DASHBOARD_TYPE_DUPLICATE_MSG, err.message, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        }

        res.status(constants.HTTP_OK).send({
            status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Saved"),
            data: dashboardType});
    });
};

exports.updateDashboardType = function(req, res, next) {
    DashboardType.findById(req.body.id, function (err, dashboardType) {
        // Handle any possible database errors
        if (err) {
            logger.debug(constants.DASHBOARD_TYPE_NOT_AVAILABLE_MSG);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.DASHBOARD_TYPE_NOT_AVAILABLE, '', constants.DASHBOARD_TYPE_NOT_AVAILABLE_MSG, constants.DASHBOARD_TYPE_OBJ_EMPTY_MSG, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        } else {
            // Update each attribute with any possible attribute that may have been submitted in the body of the request
            // If that attribute isn't in the request body, default back to whatever it was before.
            dashboardType.typeId = req.body.typeId || dashboardType.typeId;
            dashboardType.name = req.body.name || dashboardType.name;
            dashboardType.description = req.body.description || dashboardType.description;
            dashboardType.order = req.body.order || dashboardType.order;
            dashboardType.status = req.body.status || dashboardType.status;

            // Save the updated document back to the database
            dashboardType.save(function (err, result) {
                if (err) {
                    logger.debug(err);
                    var baseError = new BaseError(Utils.buildErrorResponse(constants.FATAL_ERROR, '', constants.FATAL_ERROR_MSG, err.message, 500));
                    resEvents.emit('ErrorJsonResponse', req, res, baseError);
                }

                res.status(constants.HTTP_OK).send({
                    status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Updated"),
                    data: result});
            });
        }
    });
};


exports.deleteDashboardType = function(req, res, next) {
    DashboardType.remove({ _id: req.params.id }, function(err) {
        if (err) {
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.DASHBOARD_TYPE_NOT_AVAILABLE, '', constants.DASHBOARD_TYPE_NOT_AVAILABLE_MSG, err.message, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        }

        res.status(constants.HTTP_OK).send({
            status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Deleted"),
        });
    });
};