/**
 * Created by senthil on 08/04/17.
 */
var express = require('express')
    , router = express.Router()
    , testExecutionService = require('../../service/test/test.execution.service');

/**
 * Expose test execution.
 *
 * @return {Function}
 * @api public
 */

router.get('/:id', testExecutionService.getTestExecution);

/**
 * Creates a test execution.
 *
 * @return {Function}
 * @api public
 */
router.post('/', testExecutionService.saveTestExecution);

/**
 * Modifies a test execution by passing the body object.
 *
 * @return {Function}
 * @api public
 */
router.put('/', testExecutionService.updateTestExecution);

/**
 * Deletes a test execution by req.params.id.
 *
 * @return {Function}
 * @api public
 */
router.delete('/:id', testExecutionService.deleteTestExecution);


module.exports = router;