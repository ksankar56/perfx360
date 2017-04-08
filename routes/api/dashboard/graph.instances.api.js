/**
 * Created by senthil on 08/04/17.
 */
var express = require('express')
    , router = express.Router()
    , graphInstanceService = require('../../service/dashboard/graph.instances.service');

/**
 * Expose component types.
 *
 * @return {Function}
 * @api public
 */

router.get('/', graphInstanceService.getGraphInstances);

/**
 * Creates a component type.
 *
 * @return {Function}
 * @api public
 */
router.post('/', graphInstanceService.saveGraphInstance);

/**
 * Modifies a component type by passing the body object.
 *
 * @return {Function}
 * @api public
 */
router.put('/', graphInstanceService.updateGraphInstance);

/**
 * Deletes a component type by req.params.id.
 *
 * @return {Function}
 * @api public
 */
router.delete('/:id', graphInstanceService.deleteGraphInstance);

module.exports = router;