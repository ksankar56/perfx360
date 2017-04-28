/**
 * Created by senthil on 22/04/17.
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
    , environmentServiceImpl = require('../../../routes/service/environment/enviromnent.service.impl')
    , baseService = require('../../../src/common/base.service')
    , moment = require('moment');


/**
 * Render environment list page.
 *
 * @return {Function}
 * @access private
 */
router.get('/list/:projectId', function(req, res, next) {
    environmentServiceImpl.getEnvironmentsByProjectId(req.params.projectId, function(err, environments) {
        console.info('err = ', err);
        var params = baseService.getParam('environments', environments);
        params.moment = moment;
        res.render(renderConstants.ENVIRONMENT_PAGE, {layout: 'panel-layout', req: req, params: params});
    });
});


/**
 * Render environment create page.
 *
 * @return {Function}
 * @access private
 */
router.get('/create', function(req, res, next) {
    res.render(renderConstants.ENVIRONMENT_CREATE_PAGE, {layout: 'panel-layout', req: req});
});


/**
 * Create project.
 *
 * @return {Function}
 * @access private
 */
router.post('/', function(req, res, next) {
    var envJson = req.body;
    envJson.project = req.session.project;

    console.info('data = ', envJson);

    environmentServiceImpl.saveEnvironment(envJson, function(err, environment) {
        console.info('save err = ', err);
        var params = baseService.getParam('environment', environment);
        res.render(renderConstants.ENVIRONMENT_CREATE_PAGE, { layout: 'panel-layout', err: err,
            params: params, req : req, status: Utils.buildStatus(constants.HTTP_OK, constants.ENVIRONMENT_CREATED_MSG, true)});
    })
});

/**
 * Render project edit page with project.
 *
 * @return {Function}
 * @access private
 */
router.get('/edit/:id', function(req, res, next) {
    environmentServiceImpl.getEnvironment(req.params.id, function(err, environment) {
        console.info('err = ', err);
        console.info('environment = ', environment);
        var params = baseService.getParam('environment', environment);

        res.render(renderConstants.ENVIRONMENT_EDIT_PAGE, { layout: 'panel-layout', err: err, params: params, req : req });
    });
});

/**
 * Create project.
 *
 * @return {Function}
 * @access private
 */
router.put('/', function(req, res, next) {
    console.info('data = ', req.body);

    environmentServiceImpl.updateEnvironment(req, function(err, environment) {
        console.info('err = ', err);
        console.info('environment = ', environment);
        var params = baseService.getParam('environment', environment);

        res.render(renderConstants.ENVIRONMENT_EDIT_PAGE, { layout: 'panel-layout', err: err,
            params: params, req : req, status: Utils.buildStatus(constants.HTTP_OK, constants.ENVIRONMENT_UPDATED_MSG, true)});
    })
});

module.exports = router;