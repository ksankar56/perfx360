var _ = require('lodash')
    , mongoose = require('mongoose')
    , winston = require('winston')
    , moment = require('moment')
    , resEvents = require('../../../src/common/events')
    , Utils = require('../../../src/util/util')
    , DateUtil = require('../../../src/util/date.util')
    , ModelUtil = require('../../../src/util/model.util')
    , BaseError = require('../../../src/common/BaseError')
    , constants = require('../../../src/common/constants')
    , Status = require('../../../src/common/domains/Status')
    , baseService = require('../../../src/common/base.service')
    , logger = require('../../../config/logger');

var Dashboard = require('../../../src/model/Dashboard');

exports.getDashboards = function(req, res, callback) {
    Dashboard.find({})
        .populate({path : 'project', populate: { path: 'groups' }})
        .populate({path : 'component', populate: { path: 'componentType' }})
        .populate({path : 'graphInstances', populate: { path: 'graph' }})
        .populate({path : 'dashboardType'})
        .populate({path : 'updatedBy'})
        .exec( function (err, dashboards) {
            if (err) {
                logger.debug(err);
                var baseError = new BaseError(Utils.buildErrorResponse(constants.DASHBOARD_NOT_AVAILABLE, '', constants.DASHBOARD_NOT_AVAILABLE_MSG, err.message, 500));
                resEvents.emit('ErrorJsonResponse', req, res, baseError);
            }

            res.status(constants.HTTP_OK).send({
                status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Fetched"),
                data: dashboards});
    });
};

exports.getDashboard = function(req, res, callback) {
    Dashboard.find({_id : req.params.id})
        .populate({path : 'project', populate: { path: 'groups' }})
        .populate({path : 'component', populate: { path: 'componentType' }})
        .populate({path : 'graphInstances', populate: { path: 'graph' }})
        .populate({path : 'dashboardType'})
        .populate({path : 'updatedBy'})
        .exec( function (err, dashboards) {
            if (err) {
                logger.debug(err);
                var baseError = new BaseError(Utils.buildErrorResponse(constants.DASHBOARD_NOT_AVAILABLE, '', constants.DASHBOARD_NOT_AVAILABLE_MSG, err.message, 500));
                resEvents.emit('ErrorJsonResponse', req, res, baseError);
            }

            res.status(constants.HTTP_OK).send({
                status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Fetched"),
                data: dashboards});
        });
};

exports.saveDashboard = function(req, res, next) {

    // create a dashboard
    var dashboardJson = req.body;
    console.info('dashboardJson = ', dashboardJson);

    if (_.isEmpty(dashboardJson)) {
        logger.debug(constants.DASHBOARD_OBJ_EMPTY_MSG);
        var baseError = new BaseError(Utils.buildErrorResponse(constants.DASHBOARD_OBJ_EMPTY, '', constants.DASHBOARD_OBJ_EMPTY_MSG, err.message, 500));
        resEvents.emit('ErrorJsonResponse', req, res, baseError);
    }

    Dashboard.find({name : dashboardJson.name}, function (err, dashboard) {
        if (err) {
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.DASHBOARD_NOT_AVAILABLE, '', constants.DASHBOARD_NOT_AVAILABLE_MSG, err.message, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        }

        if(_.isEmpty(dashboard)) {
            var dashboard = ModelUtil.getDashboardModel(req, res, dashboardJson)

            console.info('dashboard = ', dashboard);
            // save dashboard to database
            dashboard.save(function (err) {
                if (err) {
                    logger.debug(err);
                    var baseError = new BaseError(Utils.buildErrorResponse(constants.DASHBOARD_DUPLICATE, '', constants.DASHBOARD_DUPLICATE_MSG, err.message, 500));
                    resEvents.emit('ErrorJsonResponse', req, res, baseError);
                    return;
                }

                res.status(constants.HTTP_OK).send({
                    status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Saved"),
                    data: dashboard
                });
            });
        } else {
            logger.debug(constants.DASHBOARD_NOT_AVAILABLE_MSG);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.DASHBOARD_NOT_AVAILABLE, '', constants.DASHBOARD_NOT_AVAILABLE_MSG, constants.DASHBOARD_NOT_AVAILABLE_MSG, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        }
    });
};

exports.updateDashboard = function(req, res, next) {
    Dashboard.findById(req.body.id, function (err, dashboard) {
        // Handle any possible database errors
        if (err) {
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.DASHBOARD_NOT_AVAILABLE, '', constants.DASHBOARD_NOT_AVAILABLE_MSG, err.message, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        } else {
            // Update each attribute with any possible attribute that may have been submitted in the body of the request
            // If that attribute isn't in the request body, default back to whatever it was before.
            dashboard = ModelUtil.getDashboardUpdateModel(req, res, dashboard);

            // Save the updated document back to the database
            dashboard.save(function (err, result) {
                if (err) {
                    logger.debug(err);
                    var baseError = new BaseError(Utils.buildErrorResponse(constants.DASHBOARD_NOT_AVAILABLE, '', constants.DASHBOARD_NOT_AVAILABLE_MSG, constants.DASHBOARD_NOT_AVAILABLE_MSG, 500));
                    resEvents.emit('ErrorJsonResponse', req, res, baseError);
                }

                res.status(constants.HTTP_OK).send({
                    status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Updated"),
                    data: result});
            });
        }
    });
};


exports.deleteDashboard = function(req, res, next) {
    Dashboard.remove({ _id: req.body.id }, function(err) {
        if (err) {
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.DASHBOARD_DUPLICATE, '', constants.DASHBOARD_DUPLICATE_MSG, constants.DASHBOARD_DUPLICATE_MSG, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        }

        res.status(constants.HTTP_OK).send({
            status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Deleted"),
        });
    });
};


exports.saveDashboards = function(req, res, next) {

};

exports.updateDashboards = function(req, res, next) {

};

exports.deleteDashboards = function(req, res, next) {

};
