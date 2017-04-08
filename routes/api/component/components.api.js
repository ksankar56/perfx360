/**
 * Created by senthil on 08/04/17.
 */
var express = require('express')
    , router = express.Router()
    , componentService = require('../../service/component/component.service');

/**
 * Expose components.
 *
 * @return {Function}
 * @api public
 */
router.get('/', componentService.getComponents);


/**
 * Creates a component.
 *
 * @return {Function}
 * @api public
 */
router.post('/', componentService.saveComponent);

module.exports = router;