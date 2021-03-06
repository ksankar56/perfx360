/**
 * Created by senthil on 08/04/17.
 */
var mongoose = require('mongoose')
    , resEvents = require('../../../src/common/events')
    , Utils = require('../../../src/util/util')
    , BaseError = require('../../../src/common/BaseError')
    , _ = require('lodash')
    , constants = require('../../../src/common/constants')
    , logger = require('../../../config/logger')
    , baseService = require('../../../src/common/base.service')
    , userServiceImpl = require('./user.service.impl');

var User = require('../../../src/model/user');

exports.getUsers = function(req, res, next) {

    userServiceImpl.getAllUsers(function(err, users) {
        if (err) {
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.USER_NOT_AVAILABLE, '', constants.USER_NOT_AVAILABLE_MSG, err.message, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        }

        res.status(constants.HTTP_OK).send({
            status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Fetched"),
            data: users});
    })
};

exports.saveUser = function(req, res, next) {

    // create a new user
    var userJson = req.body;
    console.info('userJson = ', userJson);

    if (_.isEmpty(userJson)) {
        logger.debug(constants.USER_OBJ_EMPTY_MSG);
        var baseError = new BaseError(Utils.buildErrorResponse(constants.USER_OBJ_EMPTY, '', constants.USER_OBJ_EMPTY_MSG, err.message, 500));
        resEvents.emit('ErrorJsonResponse', req, res, baseError);
    }

    userServiceImpl.saveUser(userJson, function (err, user) {
        if (err) {
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.USER_DUPLICATE, '', constants.USER_DUPLICATE_MSG, err.message, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        }

        res.status(constants.HTTP_OK).send({
            status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Saved"),
            data: user});
    });
};

exports.authenticate = function(req, res, next) {

    // create a user a new user
    var userJson = req.body;

    if (_.isEmpty(userJson)) {
        logger.debug(constants.USER_OBJ_EMPTY_MSG);
        var baseError = new BaseError(Utils.buildErrorResponse(constants.USER_OBJ_EMPTY, '', constants.USER_OBJ_EMPTY_MSG, err.message, 500));
        resEvents.emit('ErrorJsonResponse', req, res, baseError);
    }

    userServiceImpl.authenticate(userJson, function(err, isMatch, user) {
        if (err) {
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.USER_PASSWORD_NOT_MATCH, '', constants.USER_PASSWORD_NOT_MATCH_MSG, err.message, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        }

        if (isMatch) {
            resEvents.emit('JsonResponse', req, res, user);
        } else {
            logger.debug(constants.USER_PASSWORD_NOT_MATCH_MSG);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.USER_PASSWORD_NOT_MATCH, '', constants.USER_PASSWORD_NOT_MATCH_MSG, '', 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        }
    })
};