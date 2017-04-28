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

function getResultJson(testExecutionId, callback) {
    console.info('getting json');
    var project = path.join(process.env.PWD, "/dist/projects/" + testExecutionId);
    //var project = path.join(process.env.PWD, "/dist/projects/58ee4fc25e64e2119641056b");
    var resultsPath = project + constants.JMETER_TARGET_RESULT_PATH;
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