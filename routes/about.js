var express = require('express');
var router = express.Router();
var path = __dirname + '/views/';

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('about', { title: 'About' });
});

module.exports = router;
