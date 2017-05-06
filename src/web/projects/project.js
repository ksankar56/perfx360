/**
 * Created by senthil on 22/04/17.
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
    , projectServiceImpl = require('../../../routes/service/project/project.service.impl')
    , testServiceImpl = require('../../../routes/service/test/test.service.impl')
    , testExecutionServiceImpl = require('../../../routes/service/test/test.execution.service.impl')
    , baseService = require('../../../src/common/base.service')
    , searchService = require('../../../src/search/api/search');


/**
 * Render project create page.
 *
 * @return {Function}
 * @access private
 */
router.get('/', function(req, res, next) {
    res.render(renderConstants.PRODUCT_CREATE_PAGE, { layout: 'panel-layout', req : req });
});


/**
 * Create project.
 *
 * @return {Function}
 * @access private
 */
router.post('/', function(req, res, next) {
    console.info('data = ', req.body);
    projectServiceImpl.saveProject(req.body, function(err, project) {
        console.info('save err = ', err);
        res.render(renderConstants.PRODUCT_CREATE_PAGE, { layout: 'panel-layout', err: err,
            project: project, req : req, status: Utils.buildStatus(constants.HTTP_OK, constants.PROJECT_CREATED_MSG, true)});
    })
});

/**
 * Render project edit page with project.
 *
 * @return {Function}
 * @access private
 */
router.get('/edit/:id', function(req, res, next) {
    projectServiceImpl.getProject(req.params.id, function(err, project) {
        console.info('err = ', err);
        console.info('project = ', project);

        res.render(renderConstants.PRODUCT_EDIT_PAGE, { layout: 'panel-layout', err: err, project: project, req : req });
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

    projectServiceImpl.updateProject(req, function(err, project) {
        console.info('save err = ', err);
        res.render(renderConstants.PRODUCT_EDIT_PAGE, { layout: 'panel-layout', err: err,
            project: project, req : req, status: Utils.buildStatus(constants.HTTP_OK, constants.PROJECT_UPDATED_MSG, true)});
    })
});

/**
 * Render project edit page with project.
 *
 * @return {Function}
 * @access private
 */
router.get('/details/:id', function(req, res, next) {
    if (!_.isEmpty(req.session.user)) {
        console.info('req.params.id = ', req.params.id);

        async.waterfall([
            async.apply(_getProjectDependencies, req),
            _getTestObjects,
            _getTestExecutionObject,
            _getJMeterAggregateReport
        ], function (err, params) {
            //cb(err, params);
            res.render(renderConstants.PRODUCT_DETAILS_PAGE, {err: err, params: params, req: req});
        });

        /*projectServiceImpl.getProjectDependencies(req.params.id, function (err, projects) {
            console.info('err = ', err);
            var project = {};
            if (projects.length > 0) {
                project = projects[0];
            }
            req.session.project = project;
            var params = {};
            params.project = project;

            testServiceImpl.getTestObjectsByProjectId(project._id, function (err, tests) {
                if (err) {
                    console.info('err = ', err);
                }
                params.tests = tests;

                var test = req.session.test;

                //if(test) {
                    var testExecution = testExecutionServiceImpl.getTestExecutionObjectByProjectId(project._id, function (err, testExecution) {
                        params.testExecution = testExecution;

                        var searchResult = searchService.getJMeterAggregateReport(params, function(err, response, status) {
                            params.searchResult = response;
                            params.summary = baseService.getSummaryInformation(testExecution, params.searchResult);
                            res.render(renderConstants.PRODUCT_DETAILS_PAGE, {err: err, params: params, req: req});
                        });
                    });
                //}

            })
        });*/
    } else {
        res.render(renderConstants.LOGIN_PAGE, { layout: 'home-layout' });
    }
});

function _getProjectDependencies(req, callback) {
    projectServiceImpl.getProjectDependencies(req.params.id, function (err, projects) {
        console.info('err = ', err);
        var project = {};
        if (projects.length > 0) {
            project = projects[0];
        }
        req.session.project = project;
        var params = {};
        params.project = project;

        callback(null, params);
    });
}

function _getTestObjects(params, callback) {
    testServiceImpl.getTestObjectsByProjectId(params.project._id, function (err, tests) {
        if (err) {
            console.info('err = ', err);
            callback(err, params);
        }
        params.tests = tests;
        //var test = req.session.test;
        callback(null, params);
    });
}

function _getTestExecutionObject(params, callback) {
    var testExecution = testExecutionServiceImpl.getTestExecutionObjectByProjectId(params.project._id, function (err, testExecution) {
        params.testExecution = testExecution;

        callback(null, params);
    });
}

function _getJMeterAggregateReport(params, callback) {
    searchService.getJMeterAggregateReport(params, function(err, response, status) {
        params.searchResult = response;
        params.summary = baseService.getSummaryInformation(params.testExecution, params.searchResult);

        callback(null, params);
    });
}
module.exports = router;