/**
 * Created by senthil on 08/04/17.
 */
var express = require('express')
    , router = express.Router()
    , _ = require('lodash')
    , mongoose = require('mongoose')
    , winston = require('winston')
    , resEvents = require('../../src/common/events')
    , Utils = require('../../src/util/util')
    , BaseError = require('../../src/common/BaseError')
    , constants = require('../../src/common/constants')
    , Status = require('../../src/common/domains/Status')
    , baseService = require('../../src/common/base.service');

var Component = require('../../src/model/Component');
var ComponentType = require('../../src/model/ComponentType');

/**
 * Expose component types.
 *
 * @return {Function}
 * @api public
 */
router.get('/types', function(req, res, next) {
    ComponentType.find(function (err, componentTypes) {
        if (err) {
            throw err;
        }
        console.log(componentTypes);
        res.status(constants.HTTP_OK).send({
            status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Fetched"),
            componentTypes: componentTypes});
    });
});

/**
 * Creates a component type.
 *
 * @return {Function}
 * @api public
 */
router.post('/type', function(req, res, next) {

    // create a user a new user
    var componentTypeJson = req.body;
    console.info('componentTypeJson = ', componentTypeJson);

    if (_.isEmpty(componentTypeJson)) {
        var baseError = new BaseError(Utils.buildErrorResponse(constants.COMPONENT_TYPE_OBJ_EMPTY, '', constants.COMPONENT_TYPE_DUPLICATE_MSG, err.message, 500));
        resEvents.emit('ErrorJsonResponse', req, res, {"status" : baseError});
    }

    var componentType = new ComponentType({
        name: componentTypeJson.name,
        description: componentTypeJson.description,
        order : componentTypeJson.order,
        status : componentTypeJson.status
    });

    // save component type to database
    componentType.save(function(err) {
        if (err) {
            console.info('throwing error = ', err.message);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.COMPONENT_TYPE_DUPLICATE, '', constants.COMPONENT_TYPE_DUPLICATE_MSG, err.message, 500));
            console.info('base error = ', baseError);
            resEvents.emit('ErrorJsonResponse', req, res, {"status" : baseError});
            //throw baseError;
        }
        console.info('After error');
        // fetch component type and test password verification

        res.status(constants.HTTP_OK).send({
            status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Saved"),
            componentType: componentType});
    });
});

/**
 * Modifies a component type by passing the body object.
 *
 * @return {Function}
 * @api public
 */
router.put('/type', function(req, res, next) {
    ComponentType.findById(req.body.id, function (err, componentType) {
        // Handle any possible database errors
        if (err) {
            throw err;
        } else {
            // Update each attribute with any possible attribute that may have been submitted in the body of the request
            // If that attribute isn't in the request body, default back to whatever it was before.
            componentType.name = req.body.name || componentType.name;
            componentType.description = req.body.description || componentType.description;
            componentType.order = req.body.order || componentType.price;
            componentType.status = req.body.status || componentType.status;

            // Save the updated document back to the database
            componentType.save(function (err, result) {
                if (err) throw err;

                res.status(constants.HTTP_OK).send({
                    status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Updated"),
                    componentType: result});
            });
        }
    });
});

/**
 * Deletes a component type by req.params.id.
 *
 * @return {Function}
 * @api public
 */
router.delete('/type/:id', function(req, res, next) {
    ComponentType.remove({ _id: req.params.id }, function(err) {
        if (err) throw err;

        res.status(constants.HTTP_OK).send({
            status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Deleted"),
        });
    });
});

/* GET components listing. */
router.get('/', function(req, res, next) {
    Component.find(function (error, users) {
        if (error) {
            throw err;
        }
        console.log(components);
        res.json(components);
    });
});

module.exports = router;