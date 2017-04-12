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
router.get('/:id', componentService.getComponent);

module.exports = router;