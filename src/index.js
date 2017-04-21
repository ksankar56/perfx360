/**
 * Created by senthil on 23/03/17.
 */
var express = require('express')
    , router = express.Router();

var index = require('../routes/index');
var webIndex = require('../src/web/controller');

// API Index
router.use('/', index);

//router.use('/users', users);
//router.use('/about', about);

//Web UI Index

/* GET home page. */
router.use('/', webIndex);

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