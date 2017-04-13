/**
 * Created by senthil on 03/04/17.
 */

var express = require('express');
var router = express.Router();

var accessibilityService = require('../../service/exec/accessibility.service')

/**
 * Expose maven execution using project and testId as parameters.
 *
 * @return {Function}
 * @api public
 */
router.post('/test/exec', accessibilityService.executeAccessibility);

module.exports = router;