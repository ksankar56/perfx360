/**
 * Created by senthil on 21/04/17.
 */

var express = require('express')
    , router = express.Router()
    , _ = require('lodash')
    , renderConstants = require('../../../src/common/render.constants');

router.get('/', function(req, res, next) {

    if (!_.isEmpty(req.session.user)) {
        var locals = {
            title: 'Page Title',
            description: 'Page Description',
            header: 'Page Header'
        };
        console.info('home');
        res.redirect('/auth/index');
    } else {
        res.render(renderConstants.LOGIN_PAGE, { layout: 'home-layout' });
    }
});

router.get('/perf/test/auth', function(req, res, next) {
    console.info({id: "123456"});
    res.send({id: "123456"});
});

router.get('/perf/test/auth/:id', function(req, res, next) {
    console.info("param id = ", req.params.id);
    res.send({status: req.params.id});
});

router.post('/perf/test/auth', function(req, res, next) {
    console.info('username = ', req.body.username + " password = ", req.body.password);
    res.send({id: "123456"});
});

router.post('/perf/test/search', function(req, res, next) {
    console.info('Search Keyword = ', req.body.kw);
    var val = Math.random() * 1000;
    var results = [{id: Math.ceil(val)}];

    res.send({results: results});
});

router.get('/perf/test/details/:id', function(req, res, next) {
    console.info("Product Details Id = ", req.params.id);
    res.send({status: req.params.id});
});

router.post('/perf/test/cart', function(req, res, next) {
    console.info('Cart productId = ', req.body.productId);

    res.send({status: true, productId: req.body.productId});
});

module.exports = router;