/**
 * Created by senthil on 08/04/17.
 */
var express = require('express')
    , router = express.Router()
    , environmentService = require('../../service/environment/enviromnent.service');

/**
 * Expose component types.
 *
 * @return {Function}
 * @api public
 */

router.get('/', environmentService.getEnvironments);

/**
 * Creates a component type.
 *
 * @return {Function}
 * @api public
 */
router.post('/', environmentService.saveEnvironment);

/**
 * Modifies a component type by passing the body object.
 *
 * @return {Function}
 * @api public
 */
router.put('/', environmentService.updateEnvironment);

/**
 * Deletes a component type by req.params.id.
 *
 * @return {Function}
 * @api public
 */
router.delete('/:id', environmentService.deleteEnvironment);

module.exports = router;