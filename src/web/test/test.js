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
    , baseService = require('../../../src/common/base.service');

router.get('/list/:projectId', function(req, res, next) {
    console.info('test projectId = ', req.params.projectId);

    testServiceImpl.getTestObjectsByProjectId(req.params.projectId, function(err, tests){
        console.info('save err = ', err);
        var params = baseService.getParam('tests', tests);
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

module.exports = router;