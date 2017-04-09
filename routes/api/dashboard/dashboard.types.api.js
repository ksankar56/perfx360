/**
 * Created by senthil on 08/04/17.
 */
var express = require('express')
    , router = express.Router()
    , dashboardService = require('../../service/dashboard/dashboard.service')
    , dashboardTypeService = require('../../service/dashboard/dashboard.types.service');

/**
 * Expose dashboard types.
 *
 * @return {Function}
 * @api public
 */

router.get('/types', dashboardTypeService.getDashboardTypes);

/**
 * Expose dashboard by id.
 *
 * @return {Function}
 * @api public
 */
router.get('/:id', dashboardService.getDashboard);


/**
 * Expose dashboard type by id.
 *
 * @return {Function}
 * @api public
 */

router.get('/type/:id', dashboardTypeService.getDashboardType);

/**
 * Creates a dashboard type.
 *
 * @return {Function}
 * @api public
 */
router.post('/type', dashboardTypeService.saveDashboardType);

/**
 * Modifies a dashboard type by passing the body object.
 *
 * @return {Function}
 * @api public
 */
router.put('/type', dashboardTypeService.updateDashboardType);

/**
 * Deletes a dashboard type by req.params.id.
 *
 * @return {Function}
 * @api public
 */
router.delete('/type/:id', dashboardTypeService.deleteDashboardType);

module.exports = router;