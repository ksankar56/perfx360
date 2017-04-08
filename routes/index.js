var express = require('express')
    , router = express.Router()
    , ping = require('./api/ping')
    , jmeter = require('./api/exec/jmeter.api')
    , users = require('./api/users')
    , componentsApi = require('./api/component/components.api')
    , componentTypesApi = require('./api/component/component.types.api');

var restVersionV1 = '/rest/api/v1/perf';

router.use(restVersionV1 + '/ping', ping);
router.use(restVersionV1 + '/jmeter', jmeter);
router.use(restVersionV1 + '/user', users);
router.use(restVersionV1 + '/component', componentTypesApi);
router.use(restVersionV1 + '/components', componentsApi);

module.exports = router;
