/**
 * Created by senthil on 21/04/17.
 */

var express = require('express')
    , router = express.Router();


/**
 * Expose all users.
 *
 * @return {Function}
 * @api public
 */
router.get('/', function(req, res, next) {

});

/**
 * Creates an user.
 *
 * @return {Function}
 * @api public
 */
router.post('/', function(req, res, next) {

});

/**
 * Authentication for an user.
 *
 * @return {Function}
 * @api public
 */
router.post('/auth', function(req, res, next) {

});

module.exports = router;
