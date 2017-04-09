/**
 * Created by senthil on 08/04/17.
 */
var express = require('express')
    , router = express.Router()
    , groupService = require('../../service/component/group.service');

/**
 * Expose group types.
 *
 * @return {Function}
 * @api public
 */

router.get('/', groupService.getGroups);

/**
 * Expose group by id.
 *
 * @return {Function}
 * @api public
 */

router.get('/:id', groupService.getGroup);

/**
 * Creates a group.
 *
 * @return {Function}
 * @api public
 */
router.post('/', groupService.saveGroup);

/**
 * Modifies a group by passing the body object.
 *
 * @return {Function}
 * @api public
 */
router.put('/', groupService.updateGroup);

/**
 * Deletes a group by req.params.id.
 *
 * @return {Function}
 * @api public
 */
router.delete('/:id', groupService.deleteGroup);

module.exports = router;