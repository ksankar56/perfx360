/**
 * Created by senthil on 08/04/17.
 */
var express = require('express')
    , router = express.Router()
    , dashbardService = require('../../service/dashboard/dashboard.service');

/**
 * Expose dashbard.
 *
 * @return {Function}
 * @api public
 */

router.get('/:id', dashbardService.getDashboard);

/**
 * Creates a dashbard.
 *
 * @return {Function}
 * @api public
 */
router.post('/', dashbardService.saveDashboard);

/**
 * Modifies a dashbard by passing the body object.
 *
 * @return {Function}
 * @api public
 */
router.put('/', dashbardService.updateDashboard);

/**
 * Deletes a dashbard by req.params.id.
 *
 * @return {Function}
 * @api public
 */
router.delete('/:id', dashbardService.deleteDashboard);


module.exports = router;