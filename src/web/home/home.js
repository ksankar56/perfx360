/**
 * Created by senthil on 21/04/17.
 */

var express = require('express')
    , router = express.Router()
    , renderConstants = require('../../../src/common/render.constants');

router.get('/', function(req, res, next) {
    var locals = {
        title: 'Page Title',
        description: 'Page Description',
        header: 'Page Header'
    };
    console.info('home');
    res.render('index', locals);
});

module.exports = router;