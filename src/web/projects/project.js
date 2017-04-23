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
    , projectServiceImpl = require('../../../routes/service/project/project.service.impl')
    , baseService = require('../../../src/common/base.service');


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

module.exports = router;