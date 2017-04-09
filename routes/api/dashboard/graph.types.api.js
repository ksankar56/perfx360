/**
 * Created by senthil on 08/04/17.
 */
var express = require('express')
    , router = express.Router()
    , graphService = require('../../service/dashboard/graph.service')
    , graphTypeService = require('../../service/dashboard/graph.types.service');

/**
 * Expose graph types.
 *
 * @return {Function}
 * @api public
 */

router.get('/types', graphTypeService.getGraphTypes);

/**
 * Expose graph by id.
 *
 * @return {Function}
 * @api public
 */
router.get('/:id', graphService.getGraph);


/**
 * Expose graph type by id.
 *
 * @return {Function}
 * @api public
 */

router.get('/type/:id', graphTypeService.getGraphType);

/**
 * Creates a graph type.
 *
 * @return {Function}
 * @api public
 */
router.post('/type', graphTypeService.saveGraphType);

/**
 * Modifies a graph type by passing the body object.
 *
 * @return {Function}
 * @api public
 */
router.put('/type', graphTypeService.updateGraphType);

/**
 * Deletes a graph type by req.params.id.
 *
 * @return {Function}
 * @api public
 */
router.delete('/type/:id', graphTypeService.deleteGraphType);

module.exports = router;