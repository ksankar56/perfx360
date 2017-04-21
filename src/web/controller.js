var express = require('express')
    , router = express.Router()
    , auth = require('./auth/auth')
    , home = require('./home/home')
    , project = require('./projects/project');

router.use('/auth', auth);
router.use('/', home);
router.use('/project', project);

module.exports = router;
