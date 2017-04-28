/**
 * Created by senthil on 03/04/17.
 */

var express = require('express');
var router = express.Router();

var selenium = require('../../service/exec/selenium.service')

/**
 * Expose maven execution using project and testId as parameters.
 *
 * @return {Function}
 * @api public
 */
router.get('/exec/:testId', selenium.executeSelenium);

module.exports = router;
