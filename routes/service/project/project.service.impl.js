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
    , logger = require('../../../config/logger');

var Project = require('../../../src/model/Project');

function getProject(id, callback) {
    console.info('id = ', id);

    Project.findById(id, function (err, project) {
        callback(err, project);
    });
};
exports.getProject = getProject;

function getProjectDependencies(id, callback) {
    console.info('id = ', id);

    Project.find({_id : id})
        .populate({path : 'group', populate: { path: 'component' }})
        .populate({path : 'component', populate: { path: 'componentType' }})
        .populate({path : 'createdBy'})
        .exec( function (err, projects) {
            callback(err, projects);
        });
};
exports.getProjectDependencies = getProjectDependencies;

function getAllProjects(req, res, callback) {
    Project.find({})
        .populate({path : 'group', populate: { path: 'component' }})
        .populate({path : 'component', populate: { path: 'componentType' }})
        .populate({path : 'createdBy'})
        .exec( function (err, projects) {
            callback(err, projects);
        });
};
exports.getAllProjects = getAllProjects;

function getProjects(projectJson, callback) {
    Project.find({createdBy : projectJson.createdBy})
        .populate({path : 'group', populate: { path: 'component' }})
        .populate({path : 'component', populate: { path: 'componentType' }})
        .populate({path : 'createdBy'})
        .exec( function (err, projects) {
            callback(err, projects);
    });
};
exports.getProjects = getProjects;

function saveProject(projectJson, callback) {

    // create a project
    console.info('projectJson = ', projectJson);

    Project.find({name : projectJson.name}, function (err, projects) {
        if (err) {
            callback(err, null);
            return;
        }

        if(_.isEmpty(projects)) {
            var project = ModelUtil.getProjectModel(projectJson);

            console.info('project = ', project);
            // save project to database
            project.save(function (err, dbProject) {
                callback(err, dbProject);
            });
        } else {
            logger.debug(constants.PROJECT_DUPLICATE);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.PROJECT_DUPLICATE, '', constants.PROJECT_DUPLICATE_MSG, constants.PROJECT_DUPLICATE_MSG, 500));
            callback(baseError, null);
        }
    });
};
exports.saveProject = saveProject;

function updateProject(req, callback) {
    console.info('req.body.id = ', req.body.id);

    Project.findById(req.body.id, function (err, project) {
        // Handle any possible database errors
        if (err) {
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.PROJECT_NOT_AVAILABLE, '', constants.PROJECT_NOT_AVAILABLE_MSG, err.message, 500));
            callback(baseError, null);
            return;
        } else {
            // Update each attribute with any possible attribute that may have been submitted in the body of the request
            // If that attribute isn't in the request body, default back to whatever it was before.

            var project = ModelUtil.updateProjectModel(req, project);

            // Save the updated document back to the database
            project.save(function (err, result) {
                callback(err, result);
            });
        }
    });
};
exports.updateProject = updateProject;

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
