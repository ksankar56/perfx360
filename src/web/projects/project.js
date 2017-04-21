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
 * Expose all users.
 *
 * @return {Function}
 * @api public
 */
router.get('/', function(req, res, next) {
    var locals = {
        title: 'Create Page',
        description: 'Page Description',
        header: 'Page Header'
    };
    console.info('auth get');
    //res.render(renderConstants.PRODUCT_CREATE_PAGE);
    res.render(renderConstants.PRODUCT_CREATE_PAGE, { layout: 'panel-layout', data : 'value' });
});


router.post('/', function(req, res, next) {
    var locals = {
        title: 'Page Title',
        description: 'Page Description',
        header: 'Page Header'
    };
    console.info('auth get');
    //res.render(renderConstants.PRODUCT_CREATE_PAGE);
    res.render(renderConstants.PRODUCT_CREATE_PAGE, { layout: 'panel-layout' });

});

module.exports = router;