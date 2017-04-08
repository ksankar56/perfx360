/**
 * Created by senthil on 08/04/17.
 */
var express = require('express')
    , router = express.Router()
    , componentTypeService = require('../../service/component/component.types.service');

/**
 * Expose component types.
 *
 * @return {Function}
 * @api public
 */

router.get('/types', componentTypeService.getComponentTypes);

/**
 * Creates a component type.
 *
 * @return {Function}
 * @api public
 */
router.post('/type', componentTypeService.saveComponentType);

/**
 * Modifies a component type by passing the body object.
 *
 * @return {Function}
 * @api public
 */
router.put('/type', componentTypeService.updateComponentType);

/**
 * Deletes a component type by req.params.id.
 *
 * @return {Function}
 * @api public
 */
router.delete('/type/:id', componentTypeService.deleteComponentType);

module.exports = router;