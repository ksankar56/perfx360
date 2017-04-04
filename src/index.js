/**
 * Created by senthil on 23/03/17.
 */
var express = require('express')
    , router = express.Router();

var index = require('../routes/index');

router.use('/', index);
//router.use('/users', users);
//router.use('/about', about);


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