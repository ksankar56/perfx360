var express = require('express')
    , router = express.Router()
    , auth = require('./auth/auth')
    , home = require('./home/home')
    , project = require('./projects/project')
    , application = require('./projects/application')
    , environment = require('./projects/environment')
    , test = require('./test/test');

router.use('/auth', auth);
router.use('/', home);
router.use('/project', project);
router.use('/application', application);
router.use('/test', test);
router.use('/environment', environment);

module.exports = router;
