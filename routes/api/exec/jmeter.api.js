/**
 * Created by senthil on 03/04/17.
 */

var express = require('express');
var router = express.Router();

var maven = require('../../service/exec/jmeter.service')

/**
 * Expose maven execution using project and testId as parameters.
 *
 * @return {Function}
 * @api public
 */
router.post('/mvn/exec', maven.execute);

/**
 * Expose maven execution result output.
 *
 * @return {Function}
 * @api public
 */
router.get('/mvn/result/:testExecutionId', maven.result);

module.exports = router;
