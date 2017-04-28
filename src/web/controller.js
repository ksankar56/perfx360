var express = require('express')
    , router = express.Router()
    , auth = require('./auth/auth')
    , home = require('./home/home')
    , project = require('./projects/project')
    , application = require('./projects/application')
    , test = require('./test/test');

router.use('/auth', auth);
router.use('/', home);
router.use('/project', project);
router.use('/application', application);
router.use('/test', test);

module.exports = router;
