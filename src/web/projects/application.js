/**
 * Created by senthil on 22/04/17.
 */
var express = require('express')
    , router = express.Router()
    , fs = require('fs')
    , _ = require('lodash')
    , async = require('async')
    , multer = require('multer')
    , util = require('util')
    , uuidV1 = require('uuid/v1')
    , mkdirp = require('mkdirp')
    , mv = require('mv')
    , ncp = require('ncp').ncp
    , loadtest = require('loadtest')
    , resEvents = require('../../../src/common/events')
    , formidable = require('formidable')
    , logout = require('express-passport-logout')
    , logger = require('../../../config/logger')
    , BaseError = require('../../../src/common/BaseError')
    , Utils = require('../../../src/util/util')
    , ModelUtil = require('../../../src/util/model.util')
    , constants = require('../../../src/common/constants')
    , renderConstants = require('../../../src/common/render.constants')
    , applicationServiceImpl = require('../../../routes/service/component/component.service.impl')
    , applicationTypeServiceImpl = require('../../../routes/service/component/component.types.service.impl')
    , projectServiceImpl = require('../../../routes/service/project/project.service.impl')
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
        console.info('components = ', components);

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
    applicationTypeServiceImpl.getComponentTypes(function(err, applicationTypes){
        var params = baseService.getParam('applicationTypes', applicationTypes);
        res.render(renderConstants.APPLICATION_CREATE_PAGE, {layout: 'panel-layout', req: req, params: params});
    });
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


router.get('/test/execute', function(req, res, next) {
    var options = {
        url: 'https://www.luxepick.com',
        maxRequests: 20,
        concurrency: 2
    };
    console.info('options = ', options);

    loadtest.loadTest(options, function(err, result)  {
        if (err)  {
            return console.error('Got an error: %s', err);
        }

        console.log('Tests run successfully');
        res.send(result);

    });
});

/**
 * Create application.
 *
 * @return {Function}
 * @access public
 */

router.post('/artillery/upload', function(req, res, next) {
    console.info('inside artillery upload');
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    var fields = {};

    form.on('field', function(name, value) {
        form.uploadDir = __dirname;
        fields[name] = value;
        console.info('name = ', name);
        console.info('value = ', value);
    });

    var files = [];
    form.on('file', function(name, file){
        //console.info('fields = ', fields);
        //console.info('scenarioItems = ', fields['scenarioItems']);
        console.info('file = ', file);
        console.info('file name = ', file.name);
        files.push(file.name);
    });

    form.on('error', function(err) {
        console.info('err');
    });

    form.on('aborted', function() {
        console.info('aborted');
    });

    form.on('end', function() {
        console.info('end');
        console.info('************** files = ', files);
        fields.files = files;

        var artilleryInputJson = {};
        var basicInfo = baseService.getArtilleryBasicInfo(fields);
        var config = baseService.getArtilleryConfigurations(fields);
        var scenarios = baseService.getArtilleryScenarios(fields);

        artilleryInputJson.config = config;
        artilleryInputJson.scenarios = scenarios
        console.info('config = ', config);
        console.info('scenarios = ', scenarios);
        //console.info()
        res.send(artilleryInputJson);
    });

    form.parse(req);


});

/**
 * Create application.
 *
 * @return {Function}
 * @access public
 */

router.post('/upload', function(req, res, next) {
    console.info('inside upload');
    /*async.waterfall([
        _makeTmpDirectory,
        async.apply(_setFormFields, req, res),
        _setProject,
        _saveApplication,
        _createDirectory,
        _copyPluginFiles,
        _moveFiles,
    ], function (err, result) {
        if (err) {
            logger.debug(err);
            //var baseError = new BaseError(Utils.buildErrorResponse(constants.COMPONENT_CREATION_FAILED, '', constants.COMPONENT_CREATION_FAILED_MSG, err.message, 500));
            res.status(constants.HTTP_FAILED).send({
                status: baseService.getStatus(req, res, constants.HTTP_FAILED, err.message)});
        }
        // result now equals 'done'
        //console.info('done = ', result);
        res.status(constants.HTTP_OK).send({
            status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Created"),
            data: result.application});
        //return result;
        //callback(err, result);
        //res.render(renderConstants.APPLICATIONS_PAGE, {layout: 'panel-layout', req: req, result: result});
    });*/

});

function _makeTmpDirectory(callback) {
    var params = {};
    params.tmpFolder = uuidV1();
    var tempPath = process.env.PWD + "/dist/uploads/tmp/" + params.tmpFolder;
    params.tmpPath = tempPath;
    var pluginsPath = process.env.PWD + "/dist/plugins/maven-jmeter";
    params.pluginsPath = pluginsPath;

    _makeDirectory(tempPath, function(err) {
        callback(null, params);
    });
}

function _setFormFields(req, res, params, callback) {
    params.req = req;
    params.res = res;

    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = params.tmpPath;

    //console.info('req = ', req.params);
    form.parse(req, function (err, fields, files) {
        params.fields = fields;
        params.files = files;
        params.form = form;
        //applicationServiceImpl.saveComponent(fields, function(err, component) {
            callback(null, params);
        //})
    });
}

function _setProject(params, callback) {
    // arg1 now equals 'one' and arg2 now equals 'two'
    var applicationJson = params.fields;
    //console.info('applicationJson = ', applicationJson);

    projectServiceImpl.getProject(params.fields.projectId, function(err, project) {
        if (err === 'ok') {
            console.info('err = ', err);
            return;
        }

        console.info("project = ", project);

        params.fields.project = project;
        applicationTypeServiceImpl.getComponentType(params.fields.componentType, function(err, applicationType){
            console.info('application type = ', applicationType);

            params.applicationType = applicationType;

            callback(null, params);
        });
    })
}

function _saveApplication(params, callback) {

    console.info('******************** params.fields.id = ', params.fields.id);

    if (params.fields.id != '' && params.fields.id != undefined) {
        applicationServiceImpl.getComponent(params.fields.id, function (err, application) {
            var component = ModelUtil.updateComponentModelFromFields(params.fields, application);

            _saveComponent(params, function(err, application) {
                console.info('application = ', application);
                params.application = application;

                var project = params.project;
                var components = project.components;
                components.push(application);
                project.components = components;

                projectServiceImpl.updateProjectByProject(project, function (err, project) {
                    callback(null, params);
                })
            });
        });

    } else {
        _saveComponent(params, function(err, application) {
            console.info('application = ', application);
            params.application = application;

            var project = params.fields.project;
            var components = project.components;
            components.push(application);
            project.components = components;

            projectServiceImpl.updateProjectByProject(project, function (err, project) {
                callback(null, params);
            })
        });
    }
}

function _saveComponent (params, callback) {
    applicationServiceImpl.saveComponent(params.fields, function (err, application) {
        callback(err, application);
    });
}

function _createDirectory(params, callback) {
    console.info('params.fields.project = ', params.fields.project);
    console.info('params.fields.project._id = ', params.fields.project._id);
    console.info('params.application._id = ', params.application._id);
    var projectName = params.fields.project.name;
    var applicationName = params.application.name;
    var projectFolder = projectName.replace(/\s/g, "-").toLowerCase();
    var applicationFolder = applicationName.replace(/\s/g, "-").toLowerCase();

    console.info('projectFolder = ', projectFolder);
    console.info('applicationFolder = ', applicationFolder);

    var path = process.env.PWD + "/dist/uploads/" + projectFolder + '-' + params.fields.project._id + '/' + applicationFolder + '-' + params.application._id;
    mkdirp(path, function (err) {
        params.path = path;

        callback(null, params);
    });
}

function _makeDirectory(path, callback) {
    mkdirp(path, function (err) {
       callback(err);
    });
}

function _moveFiles(params, callback) {


    _.forEach(params.files, function(file, key) {
        console.info('key = ', key);
        console.info('value = ', file.path);

        _copyFile(file, params, function(err) {
            console.info('moved = ', err);

            try {
                fs.rmdirSync(params.tmpPath);
            } catch(err) {}
            //deleteDirectory(params, function(err) {
                //console.info('deleted = ', err);
            //});
        });
    });

    callback(null, params);
}

function _copyPluginFiles(params, callback) {
    var pluginsSrcPath = params.path + "/src/test/jmeter";
    params.pluginsSrcPath = pluginsSrcPath;

    console.info('_copyPluginFiles file = ', params.path);
    _makeDirectory(params.pluginsSrcPath, function(err) {
        //mv(params.pluginsPath, params.path, function (err) {
        ncp.limit = 16;
        ncp(params.pluginsPath, params.path, function (err) {
            callback(null, params);
        });
    });
}

function _copyFile(file, params, callback) {
    console.info('copying file = ', params.pluginsSrcPath);
    mv(file.path, params.pluginsSrcPath + '/' + file.name, function(err) {
        callback(err);
    });
}

function uploadFiles(req, res, params, callback) {

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            console.info('params.path = ', params.path);
            cb(null, params.path)
        },
        filename: function (req, file, cb) {
            console.info('body = ', file.originalname);
            cb(null, file.originalname)
        }
    });
    var upload = multer({ storage: storage }).any();
    upload(req, res, function (err) {
        if (err) {
            // An error occurred when uploading'
            console.info('err = ', err);
            return;
        }

        console.info('success');

        //res.send({status: "success"});
        params.uploaded = true;
        callback(null, params);

        // Everything went fine
    });
}

/**
 * Render application edit page.
 *
 * @return {Function}
 * @access private
 */
router.get('/edit/:id', function(req, res, next) {
    applicationServiceImpl.getComponent(req.params.id, function(err, component) {
        console.info('err = ', err);
        console.info('project = ', req.session.project);

        var params = {};
        params.req = req;
        params.component = component;
        params.project = req.session.project;

        applicationTypeServiceImpl.getComponentTypes(function(err, applicationTypes) {
            params.applicationTypes = applicationTypes

            res.render(renderConstants.APPLICATION_EDIT_PAGE, {layout: 'panel-layout', err: err, req: req, params: params});
        });
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