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
var BaseError = require('../../../src/common/BaseError');
var Utils = require('../../../src/util/util');

var Test = require('../../../src/model/Test');
var TestExecution = require('../../../src/model/TestExecution');

var testServiceImpl = require('../test/test.service.impl');
var testExecutionServiceImpl = require('../test/test.execution.service.impl');
var testResultServiceImpl = require('../test/test.results.service.impl');
var esServiceImpl = require('../elasticsearch/es.service.impl');

exports.execute = function(req, res, next) {
    async.waterfall([
        async.apply(_saveTestObject, req),
        _saveTestExecutionObject,
        _executeTest,
        _testResultUpdate,
        _getConvertedResult,
        _publishToDB,
        _publishToElasticSearch
    ], function (err, params) {
        // result now equals 'done'
        res.send(params);
    });
}

function _saveTestObject(req, callback) {
    var params = {};
    params.testId = req.params.testId;
    params.startTime = microtime.now();
    console.info('testId = ', params.testId);

    testServiceImpl.getTestObject(params.testId, function (err, tests) {
        if (!_.isEmpty(tests)) {
            params.project = tests[0].project;
            params.application = tests[0].components[0];
            params.test = tests[0];

            console.info('project = ', params.project);

            callback(null, params);
        }
    });
}

function _saveTestExecutionObject(params, callback) {
    var testExecutionJson = {};
    testExecutionJson.name = params.project.name;
    testExecutionJson.description = params.project.description;
    testExecutionJson.test = params.testId;
    testExecutionJson.project = params.project;
    testExecutionJson.executedComponents = params.project.components;

    testExecutionServiceImpl.saveTestExecutionObject(testExecutionJson,
            function(err, testExecution) {
        console.info('result = ', testExecution);
        //testExecutionServiceImpl.getTestExecutionObject(result._id, function(err, testExecution) {
            console.info('**************** get testExecution = ', testExecution);
            params.testExecution = testExecution;
            callback(null, params);
        //})
    });
}

function _executeTest(params, callback) {
    var projectName = params.project.name;
    var applicationName = params.application.name;
    var projectFolder = projectName.replace(/\s/g, "-").toLowerCase();
    var applicationFolder = applicationName.replace(/\s/g, "-").toLowerCase();
    var path = process.env.PWD + "/dist/uploads/" + projectFolder + '-' + params.project._id + '/' + applicationFolder + '-' + params.application._id;
    params.path = path;

    const maven = mvn.create({
        cwd: path
    });

    maven.execute(['clean', 'install'], {'skipTests': true}).then(function (result) {
        var endTime = microtime.now();
        console.info('startTime = ', params.startTime);
        var timeTaken = parseInt(endTime - params.startTime);
        params.endTime = endTime;
        params.timeTaken = timeTaken;
        console.info('timeTaken = ', params.timeTaken);

        callback(null, params);
    });
}

function _testResultUpdate(params, callback) {
    console.info('timeTaken update = ', params.timeTaken);
    var testExecutionJson = {};
    testExecutionJson.timeTaken = params.timeTaken;
    testExecutionJson.resultStatus = true;
    testExecutionJson.executed = true;
    testExecutionJson.updated = new Date();

    testExecutionServiceImpl.updateObject(params.testExecution._id, testExecutionJson,
            function (err, result) {
        callback(null, params);
    });
}

function _getConvertedResult(params, callback) {
    getResultJson(params, function(err, data) {
        //console.info('result = ', data);
        params.resultJson = data;

        var results = data.results;
        console.info('results = ', results);
        //console.info('** results = ', results);
        //console.info('startTime = ' , new Date(endTime).toString());
        //for (i = 0; i < results.length; i++) {
        var i = 0;
        var docs = [];
        console.info('********************* For Start ******************');
        for (var key in results) {
            var json = results;
            var jmrValues = results[key];
            console.info('jmrvalues = ', jmrValues);
            /*for(var jmrKey in jmrValues) {
             console.info(jmrKey + ' json = ', jmrValues[jmrKey]);
             }*/

            //console.info('result = ', results[key]);
            baseService.assignTestResultValues(jmrValues, params.testExecution, function (err, doc) {
                docs.push(doc);
            });
            //console.info('doc = ', doc);
            //console.info(' filename = ', _.values(json));

        }
        console.info('docs = ', docs);
        params.docs = docs;

        callback(null, params);
    })
}

function _publishToDB(params, callback) {

    for (var i = 0; i < params.docs.length; i++) {
        console.info('for loop');
        testResultServiceImpl.saveTestResultObject(params.docs[0], function (err, result) {
            //console.info('result = ', result);
            //callback(null, projectId, projectDir, maven, req, testExecutions, startTime)
            esServiceImpl.bulkInsert(params.docs[0], function (err, result) {
                //console.info('err = ', err);
                //callback(null, projectId, projectDir, maven, req, testExecutions, startTime)
            });
        });
    }
    console.info('sending response');
    callback(null, params);
}

function _publishToElasticSearch(params, callback) {
    callback(null, params);
}

exports.executeTest = function(req, res, next) {

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
                    //var projectPath = path.join(process.env.PWD, "/dist/projects/58ee4fc25e64e2119641056b");

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
        //testResultDBPublish,
        //testResultElasticSearchPublish,
    ], function (err, result) {
        // result now equals 'done'
        console.info('Process Completed');
        //res.json(result);
        cb(err, result);
    });
}

// async call method 2 executeTest
function executeTest(projectId, projectDir, maven, req, testExecution, startTime, callback) {
    // arg1 now equals 'one' and arg2 now equals 'two'
    //console.info('testExecution = ', testExecution);
    maven.execute(['clean', 'install'], {'skipTests': true}).then(function (result) {
        // As mvn.execute(..) returns a promise, you can use this block to continue
        // your stuff, once the execution of the command has been finished successfully.
        //console.info('result = ', result);
        callback(null, projectId, projectDir, maven, req, testExecution, startTime);
    });
    console.info('mvn');
}

// async call method 3 testExecutionUpdate
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
        callback(null, projectId, projectDir, maven, req, testExecution, startTime, endTime);
    });
}

// async call method 4 testResultUpdate
function testResultUpdate(projectId, projectDir, maven, req, testExecutions, startTime, endTime, callback) {
    console.info('************** getResultJson = ');
    getResultJson(testExecutions[0]._id, function(err, data) {
        var results = data.results;
        //console.info('** results = ', results);
        //console.info('startTime = ' , new Date(endTime).toString());
        //for (i = 0; i < results.length; i++) {
        var i = 0;
        var docs = [];
        console.info('********************* For Start ******************');
        for (var key in results) {
            var json = results;
            var jmrValues = results[key];
            /*for(var jmrKey in jmrValues) {
                console.info(jmrKey + ' json = ', jmrValues[jmrKey]);
            }*/

            //console.info('result = ', results[key]);
            baseService.assignTestResultValues(jmrValues, testExecutions, function (err, doc) {
                docs.push(doc);
            });
            //console.info('doc = ', doc);
            //console.info(' filename = ', _.values(json));
        }

        console.info('********************* For End ******************');
        console.info('docs[0] size = ', docs[0].length);
        //console.info('docs = ', docs[0]);
        testResultServiceImpl.saveTestResultObject(docs[0], function (err, result) {
            //console.info('result = ', result);
            //callback(null, projectId, projectDir, maven, req, testExecutions, startTime)
            esServiceImpl.bulkInsert(docs[0], function (err, result) {
                //console.info('err = ', err);
                callback(null, projectId, projectDir, maven, req, testExecutions, startTime)
            });
        });

        /*var i = 0;
        Object.keys(results).forEach(function(key){
            var value = results[key][i];
            console.log(key + ':' + JSON.stringify(value));
            i++;
        });*/

    });
};

// async call method 5 testResultDBPublish
function testResultDBPublish(projectId, projectDir, maven, req, testExecutions, startTime, callback) {

};


exports.result = function(req, res) {
    getResultJson(req.params.testExecutionId, function (err, result) {
        events.emit("JsonResponse", req, res, result);
    });
}

function getTestResultObject (paramObj, testResultObject, testExecution) {
    var testResult = ModelUtil.getTestResultModel(paramObj, testResultObject, testExecution);
    console.info('testResult = ', testResult);
}
exports.getTestResultObject = getTestResultObject;

function getResultJson(params, callback) {
    console.info('getting json');
    //var project = path.join(process.env.PWD, "/dist/projects/" + testExecutionId);
    //var project = path.join(process.env.PWD, "/dist/projects/58ee4fc25e64e2119641056b");
    var resultsPath = params.path + '/' + constants.JMETER_TARGET_RESULT_PATH;
    console.info('resultsPath = ', resultsPath);
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
                            console.info('items[i] = ', items[i]);
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
                    console.info("*************** jtlFiles[i] = ", jtlFiles[i]);
                    var resultXML = fs.readFileSync(jtlFiles[i], 'utf8');

                    var json = parser.toJson(resultXML);
                    var jsonObj = JSON.parse(json);
                    //console.info('json = ', jsonObj.testResults.httpSample);
                    //convertXMLToJSON(resultXML, function(err, result) {
                    var jmr = {}
                    var fileName = items[i];
                    var compomentId = fileName.substring(0, _.lastIndexOf(fileName, '.'));
                    //console.info('jsonObj = ', jsonObj);
                    jmr[compomentId] = baseService.getJmeterResultObjects(jsonObj);

                    resultJson.results.push(jmr);
                    //});
                }

                callback(null, resultJson);
            }
        ],
        function (err, resultJson) {
            console.info('err = ', err);
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