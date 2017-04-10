/**
 * Created by senthil on 08/04/17.
 */
var express = require('express')
    , router = express.Router()
    , testExecutionService = require('../../service/test/test.execution.service');

/**
 * Expose set of test executions.
 *
 * @return {Function}
 * @api public
 */

router.get('/', testExecutionService.getTestExecutions);

/**
 * Creates set of test executions.
 *
 * @return {Function}
 * @api public
 */
router.post('/', testExecutionService.saveTestExecutions);

/**
 * Modifies test executions by passing the body objects.
 *
 * @return {Function}
 * @api public
 */
router.put('/', testExecutionService.updateTestExecutions);

/**
 * Deletes test executions.
 *
 * @return {Function}
 * @api public
 */
router.delete('/:id', testExecutionService.deleteTestExecutions);

module.exports = router;