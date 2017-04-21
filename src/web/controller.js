var express = require('express')
    , router = express.Router()
    , auth = require('./auth/auth')
    , home = require('./home/home');

router.use('/auth', auth);
router.use('/', home);

module.exports = router;
