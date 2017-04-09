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

router.get('/', testService.getTests);

/**
 * Creates tests.
 *
 * @return {Function}
 * @api public
 */
router.post('/', testService.saveTests);

/**
 * Modifies all tests by passing the body objects.
 *
 * @return {Function}
 * @api public
 */
router.put('/', testService.updateTests);

/**
 * Deletes all tests by parameter ids.
 *
 * @return {Function}
 * @api public
 */
router.delete('/', testService.deleteTests);

module.exports = router;