/**
 * Created by senthil on 08/04/17.
 */
var express = require('express')
    , router = express.Router()
    , graphInstanceService = require('../../service/dashboard/graph.instances.service');

/**
 * Expose graph instances.
 *
 * @return {Function}
 * @api public
 */

router.get('/:id', graphInstanceService.getGraphInstance);

/**
 * Creates a graph instance.
 *
 * @return {Function}
 * @api public
 */
router.post('/', graphInstanceService.saveGraphInstance);

/**
 * Modifies a graph instance by passing the body object.
 *
 * @return {Function}
 * @api public
 */
router.put('/', graphInstanceService.updateGraphInstance);

/**
 * Deletes a graph instance by req.params.id.
 *
 * @return {Function}
 * @api public
 */
router.delete('/:id', graphInstanceService.deleteGraphInstance);

module.exports = router;