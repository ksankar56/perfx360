/**
 * Created by senthil on 08/04/17.
 */
var express = require('express')
    , router = express.Router()
    , dashboardService = require('../../service/dashboard/dashboard.service');

/**
 * Expose set of dashboards.
 *
 * @return {Function}
 * @api public
 */

router.get('/', dashboardService.getDashboards);

/**
 * Creates set of dashboards.
 *
 * @return {Function}
 * @api public
 */
router.post('/', dashboardService.saveDashboards);

/**
 * Modifies dashboards by passing the body objects.
 *
 * @return {Function}
 * @api public
 */
router.put('/', dashboardService.updateDashboards);

/**
 * Deletes dashboards.
 *
 * @return {Function}
 * @api public
 */
router.delete('/:id', dashboardService.deleteDashboards);

module.exports = router;