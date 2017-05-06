/**
 * Created by senthil on 28/04/17.
 */
var express = require('express')
    , router = express.Router()
    , _ = require('lodash')
    , async = require('async')
    , logout = require('express-passport-logout')
    , logger = require('../../../config/logger')
    , BaseError = require('../../../src/common/BaseError')
    , Utils = require('../../../src/util/util')
    , constants = require('../../../src/common/constants')
    , renderConstants = require('../../../src/common/render.constants')
    , applicationServiceImpl = require('../../../routes/service/component/component.service.impl')
    , environmentServiceImpl = require('../../../routes/service/environment/enviromnent.service.impl')
    , testServiceImpl = require('../../../routes/service/test/test.service.impl')
    , jmeterServiceImpl = require('../../../routes/service/exec/jmeter.service.impl')
    , baseService = require('../../../src/common/base.service')
    , moment = require('moment');

router.get('/list/:projectId', function(req, res, next) {
    console.info('test projectId = ', req.params.projectId);

    testServiceImpl.getTestObjectsByProjectId(req.params.projectId, function(err, tests){
        console.info('save err = ', err);
        var params = baseService.getParam('tests', tests);
        params.moment = moment;
        res.render(renderConstants.TEST_PAGE, { layout: 'panel-layout', err: err, req : req, params: params});
    });
});


/**
 * Render application create page.
 *
 * @return {Function}
 * @access private
 */
router.get('/create/:projectId', function(req, res, next) {
    var project = req.session.project;

    async.waterfall([
        async.apply(_getApplications, req),
        _getEnvironments,
    ], function (err, params) {
        console.info('params = ', params);
        //var params = baseService.getParam('components', components);
        res.render(renderConstants.TEST_CREATE_PAGE, {layout: 'panel-layout', req: req, params: params});
    });
});

/**
 * Get Execute test page.
 *
 * @return {Function}
 * @access private
 */
router.get('/execute/:testId', function(req, res, next) {

    testServiceImpl.getTestObject(req.params.testId, function(err, test){
        var params = baseService.getParam('test', test);

        res.render(renderConstants.TEST_EXECUTE_PAGE, {layout: 'panel-layout', req: req, params: params});
    });
});

/**
 * Render test create page.
 *
 * @return {Function}
 * @access private
 */
router.get('/:projectId', function(req, res, next) {

    async.waterfall([
        async.apply(_getApplications, req),
        _getEnvironments,
    ], function (err, params) {
        // result now equals 'done'
        res.send(params);
    });

});


function _getApplications(req, callback) {
    var params = {}
    params.projectId = req.params.projectId;

    applicationServiceImpl.getComponentsByProjectId(req.params.projectId, function(err, applications) {
        params.applications = applications;

        callback(null, params);
    });
}

function _getEnvironments(params, callback) {

    environmentServiceImpl.getEnvironmentsByProjectId(params.projectId, function(err, environments) {
        params.environments = environments;

        callback(null, params);
    });
}

/**
 * Test Execute test page.
 *
 * @return {Function}
 * @access private
 */
router.post('/execute', function(req, res, next) {

    jmeterServiceImpl.execute(req, function(err, params) {
        //var params = baseService.getParam('params', test);

        res.render(renderConstants.PRODUCT_DETAILS_PAGE, {layout: 'panel-layout', req: req, params: params});
    });
});

/**
 * Create Test.
 *
 * @return {Function}
 * @access private
 */
router.post('/', function(req, res, next) {
    console.info('data = ', req.body);
    async.waterfall([
        async.apply(_getApplication, req),
        _getEnvironment,
        _saveTest,
    ], function (err, params) {
        // result now equals 'done'
        console.info('params');
        res.render(renderConstants.TEST_CREATE_PAGE, { layout: 'panel-layout', err: err,
            params: params, req : req, status: Utils.buildStatus(constants.HTTP_OK, constants.TEST_CREATED_MSG, true)});
    });
});

function _getApplication(req, callback) {
    var params = {}
    params.projectId = req.session.project._id;
    params.testJson = req.body;
    params.testJson.project = req.session.project;
    console.info('_getApplication');

    applicationServiceImpl.getComponent(params.testJson.application, function(err, applications) {
        if(err) {
            callback(null, params);
        }

        if (applications && applications.length > 0) {
            params.testJson.components = applications[0];
        }

        callback(null, params);
    });
}

function _getEnvironment(params, callback) {
    console.info('_getEnvironment');
    environmentServiceImpl.getEnvironment(params.testJson.environment, function(err, environments) {
        console.info('err = ', err);
        if(err) {
            callback(err, null);
        }

        console.info('environments = ', environments);

        if (environments && environments.length > 0) {
            params.testJson.environment = environments[0];
        }

        callback(null, params);
    });
}

function _saveTest(params, callback) {
    console.info('_saveTest');
    testServiceImpl.saveTest(params.testJson, function(err, test) {
        console.info('save test err = ', err);
        params.test = test;

        callback(err, params);
    })
}


module.exports = router;