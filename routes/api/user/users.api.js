var express = require('express')
    , router = express.Router();

var userService = require('../../service/user/user.service')

/**
 * Expose all users.
 *
 * @return {Function}
 * @api public
 */
router.get('/', userService.getUsers);

/**
 * Creates an user.
 *
 * @return {Function}
 * @api public
 */
router.post('/', userService.saveUser);

/**
 * Authentication for an user.
 *
 * @return {Function}
 * @api public
 */
router.post('/auth', userService.authenticate);

module.exports = router;
