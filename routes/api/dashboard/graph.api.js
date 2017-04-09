/**
 * Created by senthil on 08/04/17.
 */
var express = require('express')
    , router = express.Router()
    , graphService = require('../../service/dashboard/graph.service');

/**
 * Expose graphs.
 *
 * @return {Function}
 * @api public
 */
router.get('/', graphService.getGraphs);

/**
 * Creates a graph.
 *
 * @return {Function}
 * @api public
 */
router.post('/', graphService.saveGraph);

module.exports = router;