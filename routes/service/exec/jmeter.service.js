/**
 * Created by senthil on 08/04/17.
 */
var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var parseString = require('xml2js').parseString;
var mvn = require('maven');
var async = require('async');
var microtime = require('microtime');
var ncp = require('ncp').ncp;
var events = require('../../../src/common/events');
var promise = require('bluebird');
var parser = require('xml2json');
var constants = require('../../../src/common/constants');
var baseService = require('../../../src/common/base.service');
var logger = require('../../../config/logger');
var ModelUtil = require('../../../src/util/model.util');

var Test = require('../../../src/model/Test');
var TestExecution = require('../../../src/model/TestExecution');

var testServiceImpl = require('../test/test.service.impl');
var testExecutionServiceImpl = require('../test/test.execution.service.impl');

exports.execute = function(req, res, next) {

    //var projectDir = 'dist/projects/' + req.params.projectId;

    try {
        //console.info('microtime.now() = ',  microtime.now());

        var testId = req.params.testId;
        var startTime = microtime.now();

        testServiceImpl.getTestObject(testId, function (err, tests) {
            if (!_.isEmpty(tests)) {
                //console.info('ProjectId = ', tests[0].project._id);

                //testService.getTest
                var project = tests[0].project;

                var testExecutionJson = {};
                testExecutionJson.name = project.name;
                testExecutionJson.description = project.description;
                testExecutionJson.test = testId;
                testExecutionJson.project = project;
                testExecutionJson.executedComponents = project.components;

                testExecutionServiceImpl.saveTestExecutionObject(testExecutionJson, req, function(err, testExecution) {
                    //console.info('testExecution callback = ', testExecution[0]._id);
                    var textExecutionId = testExecution[0]._id;

                    //callback(null, projectId, projectDir, maven, req, testExecution, startTime);
                    var source = path.join(process.env.PWD, "/dist/plugins/maven-jmeter");
                    var projectPath = path.join(process.env.PWD, "/dist/projects/" + textExecutionId);

                    //FileUtil.copySync(pluginsPath, projectPath);
                    ncp.limit = 16;

                    ncp(source, projectPath, function (err) {
                        var projectId = textExecutionId;
                        var projectDir = 'dist/projects/' + textExecutionId;
                        //console.info("projectDir = ", projectDir);
                        const maven = mvn.create({
                            cwd: projectDir
                        });

                        testSetup(projectId, projectDir, maven, req, testExecution, startTime, function (err, result) {
                            console.info('done done');
                        });
                    });
                    res.json(testExecution);
                });
            }
        });

        //mvn.install();
    }  catch (err) {
        logger.debug(err);
    }

    //var promise = mvn.effectivePom();

};

function testSetup(projectId, projectDir, maven, req, testExecution, startTime, cb) {
    async.waterfall([
        function(callback) {
            callback(null, projectId, projectDir, maven, req, testExecution, startTime);
        },
        executeTest,
        testExecutionUpdate,
        testResultUpdate,
    ], function (err, result) {
        // result now equals 'done'
        console.info('done done');
        //res.json(result);
        cb(err, result);
    });
}

function executeTest(projectId, projectDir, maven, req, testExecution, startTime, callback) {
    // arg1 now equals 'one' and arg2 now equals 'two'
    //console.info('testExecution = ', testExecution);
    maven.execute(['clean', 'install'], {'skipTests': true}).then(function (result) {
        // As mvn.execute(..) returns a promise, you can use this block to continue
        // your stuff, once the execution of the command has been finished successfully.
        //console.info('result = ', result);
        callback(null, projectId, projectDir, maven, req, testExecution, startTime);
    });

}

function testExecutionUpdate(projectId, projectDir, maven, req, testExecution, startTime, callback) {
    // arg1 now equals 'three'
    //console.info('last arg1 = ', testExecution);
    var endTime = microtime.now();
    var timeTaken = parseInt(endTime - startTime);

    //console.info('testExecution._id = ', testExecution[0]._id);

    var testExecutionJson = {};
    testExecutionJson.id = testExecution[0]._id;
    testExecutionJson.timeTaken = timeTaken;
    testExecutionJson.resultStatus = true;
    testExecutionJson.executed = true;
    testExecutionJson.updated = new Date();

    testExecutionServiceImpl.updateTestExecutionObject(testExecutionJson, function (err, result) {
        callback(null, projectId, projectDir, maven, req, testExecution, startTime);
    });
}

function testResultUpdate(projectId, projectDir, maven, req, testExecutions, startTime, callback) {
    getResultJson(testExecutions[0]._id, function(err, data) {
        console.info('result = ', data.results);
        var results = data.results;

        //for (i = 0; i < results.length; i++) {
        for(var key in results){
            console.info(' filename = ', results[key]);
        }

        //callback(null, projectId, projectDir, maven, req, testExecutions, startTime)
    });
};

exports.result = function(req, res) {
    getResultJson(req.params.testExecutionId, function (err, result) {
        events.emit("JsonResponse", req, res, result);
    });
}

function getTestResultObject (paramObj, testResultObject, testExecution) {
    ModelUtil.getTestResultModel(paramObj, testResultObject, testExecution);
}
exports.getTestResultObject = getTestResultObject;

function getResultJson(testExecutionId, callback) {
    var project = path.join(process.env.PWD, "/dist/projects/" + testExecutionId);
    var resultsPath = project + constants.JMETER_TARGET_RESULT_PATH;

    async.waterfall(
        [
            function(callback) {
                fs.readdir(resultsPath, function(err, items) {
                    var files = [];

                    if(!items) {
                        var baseError = new BaseError(Utils.buildErrorResponse(constants.FATAL_ERROR, '', constants.FATAL_ERROR_MSG, constants.FATAL_ERROR_MSG, 500));
                        callback(baseError, null);
                    }
                    for(var i = 0; i < items.length; i++) {
                        if(_.endsWith(items[i], 'jtl')) {
                            files.push(items[i]);
                        }
                    }
                    callback(null, items, resultsPath);
                });
            },
            function(items, resultPath, callback) {
                var jtlFiles = [];

                for(var i = 0; i < items.length; i++) {
                    var filePath = resultsPath + '/' + items[i];
                    jtlFiles[i] = filePath
                }
                callback(null, jtlFiles, items);
            },
            function(jtlFiles, items, callback) {
                var resultJson = {};
                resultJson.results = [];
                for(var i = 0; i < items.length; i++) {
                    var resultXML = fs.readFileSync(jtlFiles[i], 'utf8');

                    var json = parser.toJson(resultXML);
                    //convertXMLToJSON(resultXML, function(err, result) {
                    var test = {}
                    test[items[i]] = JSON.parse(json);

                    resultJson.results.push(test);
                    //});
                }

                callback(null, resultJson);
            }
        ],
        function (err, resultJson) {
            if (err) {
                logger.debug(err);
            }
            //events.emit("JsonResponse", req, res, resultJson);
            callback(err, resultJson);
        }
    );
}
exports.getResultJson = getResultJson;

function convertXMLToJSON(resultXML, callback) {
    parseString(resultXML, function (err, result) {
        callback(err, result);
    });
}