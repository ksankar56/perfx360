/**
 * Created by senthil on 10/04/17.
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
var pa11y = require('pa11y');

var Test = require('../../../src/model/Test');
var TestExecution = require('../../../src/model/TestExecution');

var testServiceImpl = require('../test/test.service.impl');
var testExecutionServiceImpl = require('../test/test.execution.service.impl');
var testResultServiceImpl = require('../test/test.results.service.impl');
var esServiceImpl = require('../elasticsearch/es.service.impl');

exports.executeAccessibility = function(req, res, next) {
    var urls = req.body.urls;

    console.info('urls = ', urls);
    try {
        //console.info('microtime.now() = ',  microtime.now());

        var testId = req.body.testId;
        var startTime = microtime.now();

        console.info('testId = ', testId);

        testServiceImpl.getTestObject(testId, function (err, tests) {
            if (!_.isEmpty(tests)) {
                //console.info('ProjectId = ', tests[0].project._id);
                console.info('tests = ', tests);
                //testService.getTest
                var project = tests[0].project;

                var testExecutionJson = {};
                testExecutionJson.name = project.name;
                testExecutionJson.description = project.description;
                testExecutionJson.test = testId;
                testExecutionJson.project = project;
                testExecutionJson.executedComponents = project.components;

                testExecutionServiceImpl.saveTestExecutionObject(testExecutionJson, req, function(err, testExecutions) {
                    //console.info('testExecution callback = ', testExecution[0]._id);
                    var textExecutionId = testExecutions[0]._id;

                    testSetup(req, testExecutions, startTime, function (err, result) {
                        console.info('done done');
                    });

                    res.json(testExecutions);
                });
            }
        });

        //mvn.install();
    }  catch (err) {
        logger.debug(err);
    }

};

function testSetup(req, testExecutions, startTime, cb) {
    async.waterfall([
        function(callback) {
            console.info('function');
            callback(null, req, testExecutions, startTime);
        },
        executeTest,
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

function executeTest (req, testExecutions, startTime, callback) {
    console.info('calling testAccessibility');
    testAccessibility(req.body.urls, function(err, results) {
        var endTime = microtime.now();
        var timeTaken = parseInt(endTime - startTime);
        callback(null, req, testExecutions, startTime, endTime, timeTaken, results);
    });
}

function testResultUpdate (req, testExecutions, startTime, endTime, timeTaken, results, callback) {
    console.info('calling testResultUpdate');

    var docs = [];
    for (var key in results) {
        var json = results;
        var accValues = results[key];
        console.info('acc values = ', accValues);
        baseService.getAccessibilityTestResultValues(accValues, testExecutions, function (err, doc) {
            docs.push(doc);
        });
    }

    testResultServiceImpl.saveTestResultObject(docs[0], function (err, result) {
        //console.info('result = ', result);
        //callback(null, projectId, projectDir, maven, req, testExecutions, startTime)
        esServiceImpl.bulkInsertAccessibility(docs[0], function (err, result) {
            //console.info('err = ', err);
            //callback(null, projectId, projectDir, maven, req, testExecutions, startTime)
            console.info('docs = ', docs);
            callback(null, results, testExecutions);
        });
    });


}

function testAccessibility(urlList, callback) {
    /*var test = pa11y({});

    test.run('luxepick.com', function (err, results) {
        //console.info('result = ', results);
        callback(err, results)
    });*/

    // Create a test instance with some default options
    var test = pa11y({

        screenCapture: __dirname,
        // Log what's happening to the console
        log: {
            debug: console.log.bind(console),
            error: console.error.bind(console),
            info: console.log.bind(console)
        }

    });

    // Define some URLs to test, and a concurrency
    var urls = urlList;
    var concurrency = 2; // Run two tests at a time

    // Use the async library to create a queue. This accepts a
    // function to handle the URLs, and a concurrency.
    // https://github.com/caolan/async
    var resultJson = {};
    var queue = async.queue(function(url, done) {

        // The queue function will be called with each URL. We
        // can then run the pa11y test function on them and call
        // `done` when we're finished to free up the queue
        test.run(url, function(err, results) {
            if (err) {
                return console.error(err.message);
            }
            //callback(err, results)
            //resultJson.push(results);
            resultJson[url] = results;
            done();
        });

    }, concurrency);

    // Add a function that is triggered when the queue
    // drains (it runs out of URLs to process)
    queue.drain = function() {
        //console.log('All done!' , resultJson);
        callback(null, resultJson)
    };

    // Lastly, push the URLs we wish to test onto the queue
    queue.push(urls);
}