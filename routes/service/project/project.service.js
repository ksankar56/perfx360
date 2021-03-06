var _ = require('lodash')
    , mongoose = require('mongoose')
    , winston = require('winston')
    , moment = require('moment')
    , path = require('path')
    , ncp = require('ncp').ncp
    , resEvents = require('../../../src/common/events')
    , Utils = require('../../../src/util/util')
    , DateUtil = require('../../../src/util/date.util')
    , ModelUtil = require('../../../src/util/model.util')
    , FileUtil = require('../../../src/util/file.util')
    , BaseError = require('../../../src/common/BaseError')
    , constants = require('../../../src/common/constants')
    , Status = require('../../../src/common/domains/Status')
    , baseService = require('../../../src/common/base.service')
    , projectServiceImpl = require('./project.service.impl')
    , logger = require('../../../config/logger');

var Project = require('../../../src/model/Project');

exports.getAllProjects = function(req, res, callback) {

    projectServiceImpl.getAllProjects(function(err, projects) {
        if (err) {
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.PROJECT_NOT_AVAILABLE, '', constants.PROJECT_NOT_AVAILABLE_MSG, err.message, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        }

        res.status(constants.HTTP_OK).send({
            status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Fetched"),
            data: projects
        });
    });
};

exports.getProjects = function(req, res, callback) {
    var projectJson = req.body;

    projectServiceImpl.getProjects(projectJson, function(err, projects) {
        if (err) {
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.PROJECT_NOT_AVAILABLE, '', constants.PROJECT_NOT_AVAILABLE_MSG, err.message, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        }

        res.status(constants.HTTP_OK).send({
            status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Fetched"),
            data: projects
        });
    });
};

exports.saveProject = function(req, res, next) {

    // create a project
    var projectJson = req.body;

    if (_.isEmpty(projectJson)) {
        logger.debug(constants.PROJECT_OBJ_EMPTY_MSG);
        var baseError = new BaseError(Utils.buildErrorResponse(constants.PROJECT_OBJ_EMPTY, '', constants.PROJECT_OBJ_EMPTY_MSG, constants.PROJECT_OBJ_EMPTY_MSG, 500));
        resEvents.emit('ErrorJsonResponse', req, res, baseError);
    }

    projectServiceImpl.saveProject(projectJson, function(err, project) {
        if (err) {
            //return console.error(err);
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.FATAL_ERROR, '', constants.FATAL_ERROR_MSG, err.message, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        }

        console.log('done!');
        res.status(constants.HTTP_OK).send({
            status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Saved"),
            data: project
        });
    });
};

exports.updateProject = function(req, res, next) {
    Project.findById(req.body.id, function (err, project) {
        // Handle any possible database errors
        if (err) {
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.PROJECT_NOT_AVAILABLE, '', constants.PROJECT_NOT_AVAILABLE_MSG, err.message, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        } else {
            // Update each attribute with any possible attribute that may have been submitted in the body of the request
            // If that attribute isn't in the request body, default back to whatever it was before.
            project.name = req.body.name || project.name;
            project.description = req.body.description || project.description;
            project.status  = req.body.status || project.status;
            project.groups = req.body.groups || project.groups;
            project.components = req.body.components || project.components;
            project.createdDate = req.body.createdDate || project.createdDate;
            project.updatedDate = req.body.updatedDate || project.updatedDate;
            project.createdBy = req.body.createdBy || project.createdBy;

            // Save the updated document back to the database
            project.save(function (err, result) {
                if (err) {
                    logger.debug(err);
                    var baseError = new BaseError(Utils.buildErrorResponse(constants.PROJECT_NOT_AVAILABLE, '', constants.PROJECT_NOT_AVAILABLE_MSG, constants.PROJECT_NOT_AVAILABLE_MSG, 500));
                    resEvents.emit('ErrorJsonResponse', req, res, baseError);
                }

                res.status(constants.HTTP_OK).send({
                    status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Updated"),
                    data: result});
            });
        }
    });
};


exports.deleteProject = function(req, res, next) {
    Project.remove({ _id: req.body.id }, function(err) {
        if (err) {
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.PROJECT_DUPLICATE, '', constants.PROJECT_DUPLICATE_MSG, constants.PROJECT_DUPLICATE_MSG, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        }

        res.status(constants.HTTP_OK).send({
            status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Deleted"),
        });
    });
};

exports.addGroups = function (req, res, next) {
    var groupIdsJsonArray = req.body.groups;

    if (_.isEmpty(groupIdsJsonArray)) {
        var baseError = new BaseError(Utils.buildErrorResponse(constants.PROJECT_OBJ_EMPTY, '', constants.PROJECT_OBJ_EMPTY_MSG, err.message, 500));
        resEvents.emit('ErrorJsonResponse', req, res, baseError);
    }
    Project.findById(req.body.id, function (err, project) {
        // Handle any possible database errors
        if (err) {
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.PROJECT_NOT_AVAILABLE, '', constants.PROJECT_NOT_AVAILABLE_MSG, err.message, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        } else {
            // Update each attribute with any possible attribute that may have been submitted in the body of the request
            // If that attribute isn't in the request body, default back to whatever it was before.
            var existingGroups = project.groups;
            var newGroups = existingGroups.concat(groupIdsJsonArray);
            project.groups = newGroups;
            // Save the updated document back to the database
            project.save(function (err, result) {
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

exports.removeGroups = function(req, res, next) {
    var groupIdsJsonArray = req.body.groups;

    if (_.isEmpty(groupIdsJsonArray)) {
        logger.debug(err);
        var baseError = new BaseError(Utils.buildErrorResponse(constants.PROJECT_OBJ_EMPTY, '', constants.PROJECT_OBJ_EMPTY_MSG, constants.PROJECT_OBJ_EMPTY_MSG, 500));
        resEvents.emit('ErrorJsonResponse', req, res, baseError);
    }
    Project.findById(req.body.id, function (err, project) {
        // Handle any possible database errors
        if (err) {
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.PROJECT_NOT_AVAILABLE, '', constants.PROJECT_NOT_AVAILABLE_MSG, err.message, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        } else {
            // Update each attribute with any possible attribute that may have been submitted in the body of the request
            // If that attribute isn't in the request body, default back to whatever it was before.
            var existingGroups = project.groups;
            //var newGroups = existingGroups.concat(groupIdsJsonArray);
            var unionGroups = _.uniq(_.flatten([existingGroups, groupIdsJsonArray]));

            project.groups = unionGroups;
            // Save the updated document back to the database
            project.save(function (err, result) {
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

exports.addComponents = function (req, res, next) {
    var componentIdsJsonArray = req.body.components;

    if (_.isEmpty(componentIdsJsonArray)) {
        var baseError = new BaseError(Utils.buildErrorResponse(constants.PROJECT_OBJ_EMPTY, '', constants.PROJECT_OBJ_EMPTY_MSG, err.message, 500));
        resEvents.emit('ErrorJsonResponse', req, res, baseError);
    }
    Project.findById(req.body.id, function (err, project) {
        // Handle any possible database errors
        if (err) {
            console.info('find project err = ', err);
            throw err;
            return;
        } else {
            // Update each attribute with any possible attribute that may have been submitted in the body of the request
            // If that attribute isn't in the request body, default back to whatever it was before.
            var existingComponents = project.components;
            var newComponents = existingComponents.concat(componentIdsJsonArray);
            project.components = newComponents;
            // Save the updated document back to the database
            project.save(function (err, result) {
                if (err) {
                    console.info('add component err = ', err);
                    throw err;
                    return;
                }

                res.status(constants.HTTP_OK).send({
                    status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Updated"),
                    data: result});
            });
        }
    });
};

exports.removeComponents = function(req, res, next) {

};
