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
    , baseService = require('../../../src/common/base.service');

var User = require('../../../src/model/user');


function getAllUsers (callback) {
    User.find(function (err, users) {
        callback(err, users);
    });
}
exports.getAllUsers = getAllUsers;


function saveUser (userJson, callback) {
    var user = new User({
        username: userJson.username,
        password: userJson.password,
        firstName : userJson.firstName,
        lastName : userJson.lastName,
        emailAddress: userJson.emailAddress
    });

    // save user to database
    user.save(function(err) {
       callback(err, user);
    });
}
exports.saveUser = saveUser;


function authenticate (userJson, callback) {
    User.findOne({ username: userJson.username }, function(err, user) {
        if (err) {
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.USER_OBJ_EMPTY, '', constants.USER_OBJ_EMPTY_MSG, err.message, 500));
            callback(baseError, false, user);
        }

        console.info('******** user ', user);
        console.info('******** userJson.password ', userJson.password);

        if (_.isEmpty(user)) {
            var baseError = new BaseError(Utils.buildErrorResponse(constants.USER_NAME_NOT_FOUND, '', constants.USER_NAME_NOT_FOUND_MSG, constants.USER_NAME_NOT_FOUND_MSG, 500));
            callback(baseError, false, user);
        } else {
            user.comparePassword(userJson.password, function (err, isMatch) {
                callback(err, isMatch, user);
            });
        }
    });
}
exports.authenticate = authenticate;