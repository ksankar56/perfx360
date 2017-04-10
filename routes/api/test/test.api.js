/**
 * Created by senthil on 08/04/17.
 */
var express = require('express')
    , router = express.Router()
    , testService = require('../../service/test/test.service');

/**
 * Expose tests.
 *
 * @return {Function}
 * @api public
 */

router.get('/:testId', testService.getTest);

/**
 * Creates a test.
 *
 * @return {Function}
 * @api public
 */
router.post('/', testService.saveTest);

/**
 * Modifies a test by passing the body object.
 *
 * @return {Function}
 * @api public
 */
router.put('/', testService.updateTest);

/**
 * Deletes a test by req.params.id.
 *
 * @return {Function}
 * @api public
 */
router.delete('/:id', testService.deleteTest);

module.exports = router;