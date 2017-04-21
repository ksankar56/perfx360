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
    res.render(renderConstants.PRODUCT_CREATE_PAGE, { layout: 'panel-layout', data : 'value' });
});


/**
 * Create project.
 *
 * @return {Function}
 * @access private
 */
router.post('/', function(req, res, next) {
    res.render(renderConstants.PRODUCT_CREATE_PAGE, { layout: 'panel-layout' });

});

module.exports = router;