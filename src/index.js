/**
 * Created by senthil on 23/03/17.
 */
var express = require('express')
    , router = express.Router();

var index = require('../routes/index');
var users = require('../routes/users');
var about = require('../routes/about');

router.use('/', index);
router.use('/users', users);
router.use('/about', about);

module.exports = router;