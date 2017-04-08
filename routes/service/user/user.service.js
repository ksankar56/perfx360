/**
 * Created by senthil on 08/04/17.
 */
var mongoose = require('mongoose')
    , resEvents = require('../../../src/common/events')
    , Utils = require('../../../src/util/util')
    , BaseError = require('../../../src/common/BaseError')
    , _ = require('lodash')
    , constants = require('../../../src/common/constants')
    , winston = require('winston')
    , baseService = require('../../../src/common/base.service');

var User = require('../../../src/model/user');

exports.getUsers = function(req, res, next) {

    User.find(function (error, users) {
        if (error) {
            response.status(500).send(error);
            return;
        }

        console.log(users);
        res.status(constants.HTTP_OK).send({
            status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Fetched"),
            data: users});
    });
};

exports.saveUser = function(req, res, next) {

    // create a new user
    var userJson = req.body;
    console.info('userJson = ', userJson);

    if (_.isEmpty(userJson)) {
        var baseError = new BaseError(Utils.buildErrorResponse(constants.USER_OBJ_EMPTY, '', constants.USER_DUPLICATE_MSG, err.message, 500));
        resEvents.emit('ErrorJsonResponse', req, res, {"status" : baseError});
    }

    var user = new User({
        username: userJson.username,
        password: userJson.password,
        firstName : userJson.firstName,
        lastName : userJson.lastName,
        emailAddress: userJson.emailAddress
    });

    // save user to database
    user.save(function(err) {
        if (err) {
            var baseError = new BaseError(Utils.buildErrorResponse(constants.USER_DUPLICATE, '', constants.USER_DUPLICATE_MSG, err.message, 500));
            resEvents.emit('ErrorJsonResponse', req, res, {"status" : baseError});
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
        var baseError = new BaseError(Utils.buildErrorResponse(constants.USER_OBJ_EMPTY, '', constants.USER_OBJ_EMPTY_MSG, err.message, 500));
        resEvents.emit('ErrorJsonResponse', req, res, {"status" : baseError});
    }
    winston.info('Hello again distributed logs');

        User.findOne({ username: userJson.username }, function(err, user) {
        if (err) throw err;

        user.comparePassword(userJson.password, function(err, isMatch) {
            if (err) throw err;

            if (isMatch) {
                resEvents.emit('JsonResponse', req, res, user);
            } else {
                var baseError = new BaseError(Utils.buildErrorResponse(constants.USER_PASSWORD_NOT_MATCH, '', constants.USER_PASSWORD_NOT_MATCH_MSG, '', 500));
                resEvents.emit('ErrorJsonResponse', req, res, {"status" : baseError});
            }
        });
    });
};