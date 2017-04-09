/**
 * Created by senthil on 08/04/17.
 */
var express = require('express')
    , router = express.Router()
    , projectService = require('../../service/project/project.service');

/**
 * Expose projects.
 *
 * @return {Function}
 * @api public
 */

router.get('/', projectService.getProjects);

/**
 * Creates a project.
 *
 * @return {Function}
 * @api public
 */
router.post('/', projectService.saveProject);

/**
 * Modifies a project by passing the body object.
 *
 * @return {Function}
 * @api public
 */
router.put('/', projectService.updateProject);

/**
 * Deletes a project by req.params.id.
 *
 * @return {Function}
 * @api public
 */
router.delete('/', projectService.deleteProject);

/**
 * Adds groups to a project.
 *
 * @return {Function}
 * @api public
 */
router.post('/group', projectService.addGroups);


/**
 * Deletes set of groups from a given project.
 *
 * @return {Function}
 * @api public
 */
router.delete('/group', projectService.removeGroups);

module.exports = router;