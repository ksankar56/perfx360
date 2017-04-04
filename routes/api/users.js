var express = require('express')
    , router = express.Router()
    , mongoose = require('mongoose')
    , resEvents = require('../../src/common/events')
    , Utils = require('../../src/util/util')
    , BaseError = require('../../src/common/BaseError')
    , _ = require('lodash')
    , constants = require('../../src/common/constants')
    , winston = require('winston');

var User = require('../../src/model/user');

/* GET users listing. */
router.get('/', function(req, res, next) {

    User.find(function (error, users) {
        if (error) {
            response.status(500).send(error);
            return;
        }

        console.log(users);
        res.json(users);
    });
});

router.post('/', function(req, res, next) {

    // create a user a new user
    var userJson = req.body;

    if (_.isEmpty(userJson)) {
        var baseError = new BaseError(Utils.buildErrorResponse(constants.USER_OBJ_EMPTY, '', constants.USER_OBJ_EMPTY_MSG, err.message, 500));
        resEvents.emit('ErrorJsonResponse', req, res, {"status" : baseError});
    }

    var newUser = new User({
        username: userJson.userName,
        password: userJson.password,
        firstName : userJson.firstName,
        lastName : userJson.lastName,
        emailAddress : userJson.emailAddress
    });

    // save user to database
    newUser.save(function(err) {
        if (err) {
            console.info('throwing error = ', err.message);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.USER_DUPLICATE, '', constants.USER_DUPLICATE_MSG, err.message, 500));
            console.info('base error = ', baseError);
            resEvents.emit('ErrorJsonResponse', req, res, {"status" : baseError});
            //throw baseError;
        }
        console.info('After error');
        // fetch user and test password verification

        User.findOne({ username: newUser.username }, function(err, user) {
            if (err) throw err;

            resEvents.emit('JsonResponse', req, res, user);
            // test a matching password
            /*user.comparePassword(newUser.password, function(err, isMatch) {
                if (err) throw err;
                //console.log('Password123:', isMatch); // -> Password123: true
                //resEvents.emit('JsonResponse', user);
                resEvents.emit('JsonResponse', req, res, user);
            });

            // test a failing password
            user.comparePassword(newUser.password, function(err, isMatch) {
                if (err) throw err;
                console.log('123Password:', isMatch); // -> 123Password: false
            });*/
        });
    });
});

/* GET users listing. */
router.post('/auth', function(req, res, next) {

    // create a user a new user
    var userJson = req.body;

    if (_.isEmpty(userJson)) {
        var baseError = new BaseError(Utils.buildErrorResponse(constants.USER_OBJ_EMPTY, '', constants.USER_OBJ_EMPTY_MSG, err.message, 500));
        resEvents.emit('ErrorJsonResponse', req, res, {"status" : baseError});
    }
    winston.info('Hello again distributed logs');

    User.findOne({ username: userJson.userName }, function(err, user) {
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
});


module.exports = router;
