var express = require('express');
var router = express.Router();

var express = require('express')
    , jmeter = require('./api/jmeter');

var restVersionV1 = '/rest/api/v1/perf/';

router.use(restVersionV1 + 'jmeter', jmeter);

/* GET home page. */
router.get('/', function(req, res, next) {
    var locals = {
        title: 'Page Title',
        description: 'Page Description',
        header: 'Page Header'
    };
    res.render('index', locals);
});

/*
router.get('/info', function(req, res, next) {
    console.info('')
    res.json({test: 'value'});
});


router.get('/dashboard', function(req, res, next) {
    var locals = {
        title: 'CRM Page',
        description: 'CRM Description',
        header: 'CRM Page Header'
    };
    console.info('dashboard locals = ', locals);
    res.render('features/dashboard/crm', locals);
});*/


module.exports = router;
