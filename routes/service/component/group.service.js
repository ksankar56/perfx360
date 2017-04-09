var _ = require('lodash')
    , mongoose = require('mongoose')
    , winston = require('winston')
    , resEvents = require('../../../src/common/events')
    , Utils = require('../../../src/util/util')
    , ModelUtil = require('../../../src/util/model.util')
    , BaseError = require('../../../src/common/BaseError')
    , constants = require('../../../src/common/constants')
    , Status = require('../../../src/common/domains/Status')
    , baseService = require('../../../src/common/base.service');

var Group = require('../../../src/model/Group');

exports.getGroups = function(req, res, callback) {
    Group.find({})
        .populate({path : 'components', populate: { path: 'componentType' }})
        .exec( function (err, groups) {
            if (err) throw err;

            res.status(constants.HTTP_OK).send({
                status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Fetched"),
                data: groups});
    });
};


exports.getGroup = function(req, res, callback) {
    Group.find({ _id: req.params.id })
        .populate({path : 'components', populate: { path: 'componentType' }})
        .exec( function (err, groups) {
            if (err) throw err;

            res.status(constants.HTTP_OK).send({
                status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Fetched"),
                data: groups});
        });
};

exports.saveGroup = function(req, res, next) {

    // create a user a new user
    var groupJson = req.body;
    console.info('groupJson = ', groupJson);

    if (_.isEmpty(groupJson)) {
        var baseError = new BaseError(Utils.buildErrorResponse(constants.GROUP_OBJ_EMPTY, '', constants.GROUP_OBJ_EMPTY_MSG, err.message, 500));
        resEvents.emit('ErrorJsonResponse', req, res, baseError);
    }

    Group.find({name : groupJson.name}, function (err, groups) {
        if (err) {
            throw err;
            return;
        }

        console.info('groups = ', groups);
        if (_.isEmpty(groups)) {
            var group = ModelUtil.getGroupModel(req, res, groupJson)

            // save component type to database
            group.save(function (err) {
                if (err) {
                    var baseError = new BaseError(Utils.buildErrorResponse(constants.GROUP_DUPLICATE, '', constants.GROUP_DUPLICATE_MSG, err.message, 500));
                    resEvents.emit('ErrorJsonResponse', req, res, {"status": baseError});
                }

                res.status(constants.HTTP_OK).send({
                    status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Saved"),
                    data: group
                });
            });
        } else {
            var baseError = new BaseError(Utils.buildErrorResponse(constants.GROUP_DUPLICATE, '', constants.GROUP_DUPLICATE_MSG, constants.GROUP_DUPLICATE_MSG, 500));
            resEvents.emit('ErrorJsonResponse', req, res, {"status": baseError});
            return;
        }
    });
};

exports.updateGroup = function(req, res, next) {
    Group.findById(req.body.id, function (err, group) {
        // Handle any possible database errors
        if (err) {
            throw err;
        } else {
            // Update each attribute with any possible attribute that may have been submitted in the body of the request
            // If that attribute isn't in the request body, default back to whatever it was before.
            group.name = req.body.name || group.name;
            group.description = req.body.description || group.description;
            group.order = req.body.order || group.order;
            group.status = req.body.status || group.status;
            group.components = req.body.components || group.components;

            // Save the updated document back to the database
            group.save(function (err, result) {
                if (err) throw err;

                res.status(constants.HTTP_OK).send({
                    status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Updated"),
                    data: result});
            });
        }
    });
};


exports.deleteGroup = function(req, res, next) {
    Group.remove({ _id: req.params.id }, function(err) {
        if (err) throw err;

        res.status(constants.HTTP_OK).send({
            status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Deleted"),
        });
    });
};