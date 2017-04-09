var express = require('express')
    , router = express.Router()
    , ping = require('./api/ping')
    , jmeter = require('./api/exec/jmeter.api')
    , users = require('./api/user/users.api')
    , componentsApi = require('./api/component/components.api')
    , componentTypesApi = require('./api/component/component.types.api')
    , graphsApi = require('./api/dashboard/graph.api')
    , graphApi = require('./api/dashboard/graph.types.api')
    , graphInstancesApi = require('./api/dashboard/graph.instances.api')
    , graphInstanceApi = require('./api/dashboard/graph.instance.api')
    , environmentsApi = require('./api/environment/environment.api')
    , groupApi = require('./api/component/group.api')
    , groupsApi = require('./api/component/groups.api')
    , projecsApi = require('./api/project/project.api');

var restVersionV1 = '/rest/api/v1/perf';

router.use(restVersionV1 + '/ping', ping);
router.use(restVersionV1 + '/jmeter', jmeter);
router.use(restVersionV1 + '/user', users);
router.use(restVersionV1 + '/component', componentTypesApi);
router.use(restVersionV1 + '/components', componentsApi);
router.use(restVersionV1 + '/graph', graphApi);
router.use(restVersionV1 + '/graphs', graphsApi);
router.use(restVersionV1 + '/dashboard/graph/instances', graphInstancesApi);
router.use(restVersionV1 + '/dashboard/graph/instance', graphInstanceApi);
router.use(restVersionV1 + '/environment', environmentsApi);
router.use(restVersionV1 + '/group', groupApi);
router.use(restVersionV1 + '/groups', groupsApi);
router.use(restVersionV1 + '/project', projecsApi);

module.exports = router;
