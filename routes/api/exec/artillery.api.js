/**
 * Created by senthil on 04/05/17.
 */

var express = require('express');
var router = express.Router();

var artilleryService = require('../../service/exec/artillery.service')

/**
 * Expose maven execution using project and testId as parameters.
 *
 * @return {Function}
 * @api public
 */
router.post('/test/exec', artilleryService.execute);

module.exports = router;