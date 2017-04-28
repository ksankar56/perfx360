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
    , baseService = require('../../../src/common/base.service');




router.get('/list', function(req, res, next) {

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
    ], function (err, result) {
        // result now equals 'done'
        res.send(result);
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