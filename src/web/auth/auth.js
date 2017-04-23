/**
 * Created by senthil on 21/04/17.
 */

var express = require('express')
    , router = express.Router()
    , _ = require('lodash')
    , logout = require('express-passport-logout')
    , logger = require('../../../config/logger')
    , BaseError = require('../../../src/common/BaseError')
    , Utils = require('../../../src/util/util')
    , constants = require('../../../src/common/constants')
    , renderConstants = require('../../../src/common/render.constants')
    , userServiceImpl = require('../../../routes/service/user/user.service.impl')
    , projectServiceImpl = require('../../../routes/service/project/project.service.impl')
    , baseService = require('../../../src/common/base.service');

/**
 * Expose all users.
 *
 * @return {Function}
 * @api public
 */
router.get('/', function(req, res, next) {
    var locals = {
        title: 'Page Title',
        description: 'Page Description',
        header: 'Page Header'
    };
    console.info('auth get');
    res.render(renderConstants.LOGIN_PAGE, { layout: 'home-layout' });
});


/**
 * Index page.
 *
 * @return {Function}
 * @api public
 */
router.get('/index', function(req, res, next) {
    var user = req.session.user;
    var locals = {};

    if (!_.isEmpty(user)) {
        projectServiceImpl.getProjects({createdBy : user._id}, function(err, projects) {
            if (err) {
                logger.debug(err);
                locals.error = err;
                //var baseError = new BaseError(Utils.buildErrorResponse(constants.FATAL_ERROR, '', constants.FATAL_ERROR_MSG, err.message, 500));
            }

            locals.projects = projects;
            res.render('index', locals);
        });
    } else {
        res.render(renderConstants.LOGIN_PAGE, { layout: 'home-layout' });
    }
});

/**
 * Creates an user.
 *
 * @return {Function}
 * @api public
 */
router.post('/index', function(req, res, next) {
    var userJson = req.body;
    var locals = {
        title: 'Page Title',
        description: 'Page Description',
        header: 'Page Header',
        req : req,
        username: userJson.username
    };

    userServiceImpl.authenticate(userJson, function(err, isMatch, user) {
        if (err) {
            logger.debug(err);
            locals.error = err;
            res.render(renderConstants.LOGIN_PAGE, { layout: 'home-layout', locals: locals });
            return;
        }

        if (isMatch) {
            locals.user = user;
            req.session.user = user;

            /*projectServiceImpl.getProjects({createdBy : user._id}, function(err, projects) {
                if (err) {
                    logger.debug(err);
                    locals.error = err;
                    //var baseError = new BaseError(Utils.buildErrorResponse(constants.FATAL_ERROR, '', constants.FATAL_ERROR_MSG, err.message, 500));
                }

                console.info('projects = ', projects);
                locals.projects = projects;
                res.render('index', locals);
            });*/
            res.redirect('/auth/index');
        } else {
            logger.debug(constants.USER_PASSWORD_NOT_MATCH_MSG);
            locals.error = baseError;
            var baseError = new BaseError(Utils.buildErrorResponse(constants.USER_PASSWORD_NOT_MATCH, '', constants.USER_PASSWORD_NOT_MATCH_MSG, '', 500));
            res.render(renderConstants.LOGIN_PAGE, { layout: 'home-layout', locals: locals});
            return;
        }
    });

});

/**
 * Authentication for an user.
 *
 * @return {Function}
 * @api public
 */
router.post('/auth', function(req, res, next) {
    //userServiceImpl.authenticate()

});

/**
 * Logout an user.
 *
 * @return {Function}
 * @api public
 */
router.get('/logout', function(req, res, next) {
    //userServiceImpl.authenticate()
    logout();
    var status = {
        code: 200,
        message: 'Successfully logged out'
    }

    req.session.destroy();
    res.render(renderConstants.LOGIN_PAGE, { layout: 'home-layout', status : status });
});


router.get('/test', function(req ,res, next) {
    var myjson = {
        username : "sample",
        password : "sample2",
        id : 3
    }

    res.render('test', {data : myjson });

});

module.exports = router;