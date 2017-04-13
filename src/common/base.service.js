/**
 * Created by senthil on 08/04/17.
 */
var express = require('express');
var _ = require('lodash');
var Status = require('./domains/Status');
var JMeterResult = require('./domains/JMeterResult');

exports.getStatus = function(req, res, statusCode, statusMessage) {
    Status.code = statusCode;
    Status.message = statusMessage;

    return Status;
}

exports.getJmeterResultObjects =  function(result) {

    var jmeterResults = [];
    var parentHttpSample = result.testResults.httpSample;
    //parentHttpSample.parent = true;
    var parent;
    var children;

    console.info("parentHttpSample instanceof Array = ", parentHttpSample instanceof Array);
    if (parentHttpSample instanceof Array) {
        var i = 0;
        console.info('parentHttpSample.length = ', parentHttpSample.length);
        _.forEach(parentHttpSample, function(httpSamples) {
            children = parentHttpSample[i];
            console.info('children.httpSample = ', children.httpSample);
            if (children.httpSample) {
                _.forEach(children.httpSample, function (httpSample) {
                    //console.log('httpSample = ', httpSample);
                    console.info('for each = ', httpSample);
                    jmeterResults.push(httpSample);
                });
            } else {
                jmeterResults.push(children);
            }
            i++;
        });
    } else {
        children = parentHttpSample
        _.forEach(children.httpSample, function(httpSample) {
            //console.log('httpSample = ', httpSample);
            console.info('for each');
            jmeterResults.push(httpSample);
        });
    }

    //jmeterResults.push(_getResultObject(parentHttpSample, true));
    //console.info ('parentHttpSample = ', parentHttpSample instanceof Array);
    //console.info ('parentHttpSample = ', parentHttpSample);


    return jmeterResults;
}

function _getResultObject (httpSample, parent) {
    console.info("httpSample = ", httpSample);
    var jmr = {};

    jmr.t = httpSample.t;
    jmr.lt = httpSample.lt;
    jmr.ts = httpSample.ts;
    jmr.s = httpSample.s;
    jmr.lb = httpSample.lb;
    jmr.rc = httpSample.rc;
    jmr.rm = httpSample.rm;
    jmr.tn = httpSample.tn;
    jmr.dt = httpSample.dt;
    jmr.by = httpSample.by;

    if (parent) {
        jmr.parent = true;
    }

    return jmr;
}

exports.assignTestResultValues =  function(documents, testExecutions, callback) {

    var assignedDocuments = [];

    for(var key in documents) {
        //console.info(key + ' json = ', documents[key]);
        var results = documents[key];
        //console.info('result = ', results.length);
        var testExecution = testExecutions[0];
        console.info('jmrValues = ', results.length);

        for (var i = 0; i < results.length; i++) {
            var result = results[i];
            var assignedDocument = {};
            assignedDocument.project_id = testExecution.project._id.toString();
            assignedDocument.component_id = key;
            assignedDocument.group_id = key;
            assignedDocument.project_name = testExecution.name;
            assignedDocument.project_description = testExecution.description;
            assignedDocument.environment_id = testExecution.test.environment._id.toString();
            assignedDocument.environment_name = testExecution.test.environment.name;
            assignedDocument.test_id = testExecution.test._id.toString();
            assignedDocument.test_name = testExecution.test.name;
            assignedDocument.test_execution_id = testExecution._id.toString();
            assignedDocument.execution_time = 1; //testExecution.executedComponents.timeTaken;
            assignedDocument.version = 1.0;
            if (result.parent) {
                assignedDocument.group = true;
            } else {
                assignedDocument.group = false;
            }
            assignedDocument.file_name = key + '.jtl';
            if (result.t) {
                assignedDocument.t = parseInt(result.t);
            }
            if (result.it) {
                assignedDocument.it = parseInt(result.it);
            }
            if (result.lt) {
                assignedDocument.lt = parseInt(result.lt);
            }
            if (result.ct) {
                assignedDocument.ct = parseInt(result.ct);
            }
            if (result.ts) {
                assignedDocument.ts = result.ts;
            }
            if (result.s) {
                assignedDocument.s = Boolean(result.s);
            }
            if (result.lb) {
                assignedDocument.lb = result.lb;
            }
            if (result.rc) {
                assignedDocument.rc = parseInt(result.rc);
            }

            if (result.rm) {
                assignedDocument.rm = result.rm;
            }
            if (result.tn) {
                assignedDocument.tn = result.tn;
            }
            if (result.dt) {
                assignedDocument.dt = result.dt;
            }
            if (result.de) {
                assignedDocument.de = result.de;
            }
            if (result.by) {
                assignedDocument.by = parseInt(result.by);
            }
            if (result.sby) {
                assignedDocument.sby = parseInt(result.sby);
            }
            if (result.sc) {
                assignedDocument.sc = parseInt(result.sc);
            }
            if (result.ec) {
                assignedDocument.ec = parseInt(result.ec);
            }
            if (result.ng) {
                assignedDocument.ng = parseInt(result.ng);
            }
            if (result.na) {
                assignedDocument.na = parseInt(result.na);
            }

            if (result.hn) {
                assignedDocument.hn = result.hn;
            }

            if (result.requestHeader) {
                var requestHeader = {}
                requestHeader.class = result.requestHeader.class;
                requestHeader.t = result.requestHeader.$t;

                assignedDocument.requestHeader = requestHeader;
            }

            if (result.responseData) {
                var responseData = {}
                responseData.class = result.responseData.class;
                responseData.t = result.responseData.$t;

                assignedDocument.responseData = responseData;
            }
            if (result.responseFile) {
                var responseFile = {}
                responseFile.class = result.responseFile.class;

                assignedDocument.responseFile = responseFile;
            }
            if (result.cookies) {
                var cookies = {}
                cookies.class = result.cookies.class;

                assignedDocument.cookies = cookies;
            }
            if (result.method) {
                var method = {}
                method.class = result.method.class;

                assignedDocument.method = method;
            }
            if (result.queryString) {
                var queryString = {}
                queryString.class = result.queryString.class;

                assignedDocument.queryString = queryString;
            }
            if (result.redirectLocation) {
                var redirectLocation = {}
                redirectLocation.class = result.redirectLocation.class;
                redirectLocation.t = result.redirectLocation.$t;

                assignedDocument.redirectLocation = redirectLocation;
            }

            if (result.url) {
                assignedDocument.url = result.url;
            }
            assignedDocument.created = new Date();

            assignedDocuments.push(assignedDocument);
        }
    }

    //console.info('assignedDocuments = ', assignedDocuments);
    callback(null, assignedDocuments);
}

function _isArray(ob) {
    return ob.constructor === Array;
}