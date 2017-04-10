/**
 * Created by senthil on 08/04/17.
 */
var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var parseString = require('xml2js').parseString;
var mvn = require('maven');
var async = require('async');
var events = require('../../../src/common/events');
var promise = require('bluebird');
var parser = require('xml2json');
var constants = require('../../../src/common/constants');
var baseService = require('../../../src/common/base.service');
var logger = require('../../../config/logger');
var Test = require('../../../src/model/Test');
var TestExecution = require('../../../src/model/TestExecution');

var testServiceImpl = require('../test/test.service.impl');
var testExecutionServiceImpl = require('../test/test.execution.service.impl');

exports.execute = function(req, res, next) {

    //var projectDir = 'dist/projects/' + req.params.projectId;

    try {


        async.waterfall([
            function(callback) {
                var testId = req.params.testId;

                testServiceImpl.getTestObject(testId, function (err, tests) {
                    if (!_.isEmpty(tests)) {
                        //console.info('ProjectId = ', tests[0].project._id);

                        //testService.getTest
                        var project = tests[0].project;
                        var projectId = project._id;
                        var projectDir = 'dist/projects/' + projectId;
                        const maven = mvn.create({
                            cwd: projectDir
                        });
                        var paramObj = {}
                        paramObj.projectId = projectId;
                        paramObj.projectDir = projectDir;
                        paramObj.project = project;


                        var testExecutionJson = {};
                        testExecutionJson.name = project.name;
                        testExecutionJson.description = project.description;
                        testExecutionJson.test = testId;
                        testExecutionJson.project = project;
                        testExecutionJson.executedComponents = project.components;

                        testExecutionServiceImpl.saveTestExecutionObject(testExecutionJson, req, function(err, testExecution) {
                            //console.info('testExecution callback = ', testExecution)
                            paramObj.testExecution = testExecution;
                            callback(null, projectId, projectDir, maven, req, testExecution);
                        });
                    }
                });
            },
            executeTest,
            resultUpdate,
        ], function (err, result) {
            // result now equals 'done'
            console.info('done');
        });


        /*var testExecutionJson = {};
        testExecutionJson.description = ,
            test: testExecutionJson.test,
            project: testExecutionJson.project,
            executedBy: testExecutionJson.executedBy,
            resultStatus: testExecutionJson.resultStatus,
            timeTaken: testExecutionJson.timeTaken,
            executedComponents: testExecutionJson.executedComponents*/

        /*maven.execute(['clean', 'install'], {'skipTests': true}).then(function (result) {
            // As mvn.execute(..) returns a promise, you can use this block to continue
            // your stuff, once the execution of the command has been finished successfully.
            console.info('result = ', result);
        });*/
        //mvn.install();
    }  catch (err) {
        logger.debug(err);
    }

    //var promise = mvn.effectivePom();
    res.json({ title: 'jMeter' + req.params.testId });
};

function executeTest(projectId, projectDir, maven, req, testExecution, callback) {
    // arg1 now equals 'one' and arg2 now equals 'two'
    console.info('testExecution = ', testExecution);
    maven.execute(['clean', 'install'], {'skipTests': true}).then(function (result) {
        // As mvn.execute(..) returns a promise, you can use this block to continue
        // your stuff, once the execution of the command has been finished successfully.
        //console.info('result = ', result);
        callback(null, projectId, projectDir, maven, testExecution, req);
    });

}

function resultUpdate(projectId, projectDir, maven, req, testExecution, callback) {
    // arg1 now equals 'three'
    console.info('last arg1 = ', projectId);
    callback(null, 'done');
}

exports.output = function(req, res) {
    var projectId = req.params.projectId;
    var project = path.join(process.env.PWD, "/dist/projects/" + projectId);
    var resultsPath = project + constants.JMETER_TARGET_RESULT_PATH;

    async.waterfall(
        [
            function(callback) {
                fs.readdir(resultsPath, function(err, items) {
                    var files = [];

                    if(!items) {
                        res.status(constants.HTTP_OK).send({
                            status: baseService.getStatus(req, res, constants.HTTP_OK, "No Results found.")});
                        return;
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
            events.emit("JsonResponse", req, res, resultJson);
        }
    );
}

function convertXMLToJSON(resultXML, callback) {
    parseString(resultXML, function (err, result) {
        callback(err, result);
    });
}