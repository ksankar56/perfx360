var express = require('express')
    , router = express.Router()
    , ping = require('./api/ping')
    , jmeter = require('./api/jmeter')
    , users = require('./api/users')
    , components = require('./api/components');

var restVersionV1 = '/rest/api/v1/perf';

router.use(restVersionV1 + '/ping', ping);
router.use(restVersionV1 + '/jmeter', jmeter);
router.use(restVersionV1 + '/user', users);
router.use(restVersionV1 + '/component', components);

module.exports = router;
