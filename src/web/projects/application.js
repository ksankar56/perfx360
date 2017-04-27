/**
 * Created by senthil on 22/04/17.
 */
var express = require('express')
    , router = express.Router()
    , _ = require('lodash')
    , multer = require('multer')
    , util = require('util')
    , mkdirp = require('mkdirp')
    , formidable = require('formidable')
    , logout = require('express-passport-logout')
    , logger = require('../../../config/logger')
    , BaseError = require('../../../src/common/BaseError')
    , Utils = require('../../../src/util/util')
    , constants = require('../../../src/common/constants')
    , renderConstants = require('../../../src/common/render.constants')
    , applicationServiceImpl = require('../../../routes/service/component/component.service.impl')
    , baseService = require('../../../src/common/base.service')
    , modelUtil = require('../../../src/util/model.util');

/**
 * Render applications view page.
 *
 * @return {Function}
 * @access private
 */
router.get('/list/:projectId', function(req, res, next) {

    applicationServiceImpl.getComponentsByProjectId(req.params.projectId, function(err, components) {
        res.render(renderConstants.APPLICATIONS_PAGE, {layout: 'panel-layout', req: req, components: components});
    });
});

/**
 * Render application create page.
 *
 * @return {Function}
 * @access private
 */
router.get('/create', function(req, res, next) {
    res.render(renderConstants.APPLICATION_CREATE_PAGE, {layout: 'panel-layout', req: req});
});

/**
 * Render application view page.
 *
 * @return {Function}
 * @access public
 */
router.get('/:id', function(req, res, next) {

    applicationServiceImpl.getComponent(req.params.id, function(err, components) {
        res.render(renderConstants.APPLICATIONS_PAGE, {layout: 'panel-layout', req: req, components: components});
    });
});


/**
 * Create application.
 *
 * @return {Function}
 * @access public
 */

router.post('/upload/:projectId/:applicationId', function(req, res, next) {
    console.log('**** body = ', req.body); // form fields
    console.log('**** file = ', req.file);
    var path = process.env.PWD + "/dist/uploads/" + req.params.projectId + '/' + req.params.applicationId;

    console.info('__dirname = ', process.env.PWD);

    mkdirp(path, function (err) {
        var form = new formidable.IncomingForm();
        form.encoding = 'utf-8';
        form.uploadDir = "dist/uploads/" + req.params.projectId + '/' + req.params.applicationId;
        form.maxFieldsSize = 2 * 1024 * 1024;

        form.on('fileBegin', function(name, file) {
            file.path = "dist/uploads/" + req.params.projectId + '/' + req.params.applicationId +'/' + file.name;
        });
        form.on('file', function (name, file) {
            console.info('started', file);
            //...per file event handling

        });

        form.on('end', function () {
            console.info('end');
            // do stuff after file upload
        });

        form.parse(req, function (err, fields, files) {

            console.info('fields = ', fields);

            //var applicationModel = modelUtil.getCompomentModel(fields);

            /*applicationServiceImpl.saveComponent(componentJson, function(err, result) {
                console.info('craeted')
            });*/
            res.send({status: "success"});

        });
        /*var storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'dist/uploads/' + req.params.projectId + '/' + req.params.applicationId)
            },
            filename: function (req, file, cb) {
                //console.info('body = ', req.body);
                cb(null, file.originalname)
            }
        });
        var upload = multer({ storage: storage }).any();
        upload(req, res, function (err) {
            if (err) {
                // An error occurred when uploading'
                console.info('err = ', err);
                return
            }

            console.info('success');

            res.send({status: "success"});

            // Everything went fine
        });*/
    });

    //res.send({status: "success"});
    /*upload(req, res, function (err) {
        if (err) {
            // An error occurred when uploading'
            console.info('err = ', err);
            return
        }

        console.info('success');

        res.send({status: "success"});

        // Everything went fine
    });*/
});

/**
 * Render application edit page.
 *
 * @return {Function}
 * @access private
 */
router.get('/edit/:id', function(req, res, next) {
    applicationServiceImpl.getComponent(req.params.id, function(err, component) {
        console.info('err = ', err);
        console.info('project = ', component);

        res.render(renderConstants.APPLICATION_EDIT_PAGE, { layout: 'panel-layout', err: err, component: component, req : req });
    });
});

/**
 * Create application.
 *
 * @return {Function}
 * @access private
 */
router.put('/', function(req, res, next) {
    console.info('data = ', req.body);

    applicationServiceImpl.updateComponent(req, function(err, project) {
        console.info('save err = ', err);
        res.render(renderConstants.PRODUCT_EDIT_PAGE, { layout: 'panel-layout', err: err,
            project: project, req : req, status: Utils.buildStatus(constants.HTTP_OK, constants.PROJECT_UPDATED_MSG, true)});
    })
});


module.exports = router;