/**
 * Created by senthil on 08/04/17.
 */
var express = require('express');
var _ = require('lodash');
var util = require('util');
var moment  = require('moment');
var Status = require('./domains/Status');
var JMeterResult = require('./domains/JMeterResult');
var constants = require('./constants');
var tc = require('./test.constants');

exports.getStatus = function(req, res, statusCode, statusMessage) {
    Status.code = statusCode;
    Status.message = statusMessage;

    return Status;
}

exports.getParam = function(key, valueObj) {
    var params = {};
    params[key] = valueObj;

    return params;
}

exports.getSummaryInformation = function(testExecution, searchResult) {
    var summary = {};

    if (testExecution && searchResult && testExecution.executed) {
        summary.vu = testExecution.test.virtualUsers;
        summary.testType = testExecution.executedComponents[0].componentType.name;
        summary.started = moment(testExecution.created).format(constants.DATE_FORMAT);
        summary.ended = moment(testExecution.updated).format(constants.DATE_FORMAT);
        var responseTimeCalc = (searchResult.aggregations.max_response_time.value + searchResult.aggregations.max_time.value) - searchResult.aggregations.min_response_time.value;
        var throughput = (searchResult.hits.total / responseTimeCalc) * 1000;

        summary.throughput = throughput.toFixed(1);
        var responseTime = searchResult.aggregations.load_time_outlier.values["95.0"];
        if (responseTime) {
            responseTime = responseTime.toFixed(2);
        }
        summary.responseTime = responseTime;
        summary.error = (searchResult.hits.total - searchResult.aggregations.messages.buckets.success.doc_count) / 100 * 1000;
        summary.averageBandWidth = searchResult.aggregations.average_bytes.value;

        var startDate = moment(testExecution.created).format();//now
        var endDate = moment(testExecution.updated).format();
        var diffTime = moment(testExecution.updated)
            .diff(testExecution.created);
        var duration = moment.duration(diffTime);
        var years = duration.years(),
            days = duration.days(),
            hrs = duration.hours(),
            mins = duration.minutes(),
            secs = duration.seconds();

        summary.duration = mins + " Mins : " + secs + " Secs";
        summary.averageResponseTime = searchResult.aggregations.average_response_time.value.toFixed(2);
    }

    console.info('summary = ', summary);
    return summary;
}

exports.getJmeterResultObjects =  function(result) {

    var jmeterResults = [];
    var testResults = result.testResults;
    var parentHttpSample = result.testResults.httpSample;
    //parentHttpSample.parent = true;
    var parent;
    var children;

    if (testResults) {
        console.info('test results = ', testResults.httpSample instanceof Array);
       if (testResults.httpSample instanceof Array) {
            var i = 0;
            console.info('parentHttpSample.length = ', parentHttpSample.length);
            _.forEach(parentHttpSample, function(httpSamples) {
                children = parentHttpSample[i];
                jmeterResults.push(_getResultObject(children, false));
                i++;
            });
        } else {

           //_.forEach(testResults.httpSample, function(httpSample) {
           //console.log('httpSample = ', httpSample);
           console.info('for each = ', testResults.httpSample);
           jmeterResults.push(_getResultObject(testResults.httpSample, false));
           //});
           //}
       }
    }
    //console.info("parentHttpSample instanceof Array = ", parentHttpSample instanceof Array);
    /*if (parentHttpSample instanceof Array) {
        var i = 0;
        console.info('parentHttpSample.length = ', parentHttpSample.length);
        _.forEach(parentHttpSample, function(httpSamples) {
            children = parentHttpSample[i];
            console.info('children.httpSample = ', children.httpSample);

                jmeterResults.push(_getResultObject(children, false));

            i++;
        });
    } else {
        children = parentHttpSample
        _.forEach(children.httpSample, function(httpSample) {
            //console.log('httpSample = ', httpSample);
            console.info('for each');
            jmeterResults.push(_getResultObject(httpSample, false));
        });
    }*/

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
    jmr.it = httpSample.it;

    if (httpSample.sby) {
        jmr.sby = parseInt(httpSample.sby);
    }
    if (httpSample.sc) {
        jmr.sc = parseInt(httpSample.sc);
    }
    if (httpSample.ec) {
        jmr.ec = parseInt(httpSample.ec);
    }
    if (httpSample.ng) {
        jmr.ng = parseInt(httpSample.ng);
    }
    if (httpSample.na) {
        jmr.na = parseInt(httpSample.na);
    }

    if (httpSample.hn) {
        jmr.hn = httpSample.hn;
    }

    if (httpSample.httpSample) {
        jmr.httpSample = httpSample.httpSample;
    }

    if (parent) {
        jmr.parent = true;
    }

    return jmr;
}

exports.assignTestResultValues =  function(documents, testExecution, callback) {

    var assignedDocuments = [];

    for(var key in documents) {
        //console.info(key + ' key = ', key);
        //console.info(key + ' json = ', key instanceof Array);
        var results = documents[key];
        //console.info('result = ', results.length);
        //var testExecution = testExecutions[0];
        //console.info('jmrValues = ', results.length);

        for (var i = 0; i < results.length; i++) {
            var result = results[i];
            assignedDocuments.push(_getDocument(key, testExecution, result));
        }
    }

    //console.info('assignedDocuments = ', assignedDocuments);
    callback(null, assignedDocuments);
}

exports.getAccessibilityTestResultValues =  function(documents, testExecutions, callback) {

    var assignedDocuments = [];

    for (var i = 0; i < documents.length; i++) {
        var testExecution = testExecutions[0];
        var result = documents[i];
        assignedDocuments.push(_getDocument("58eaaa110aee8d50b8c43b88", testExecution, result));
    }

    //console.info('assignedDocuments = ', assignedDocuments);
    callback(null, assignedDocuments);
}

function _getDocument(key, testExecution, result) {
    var assignedDocument = {};

    console.info('result = ', result);
    assignedDocument = _getBaseDocument(key, testExecution, assignedDocument);
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
        assignedDocument.ts = parseInt(result.ts);
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

    if (result.httpSample) {
        assignedDocument.httpSample = result.httpSample;
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

    if (result.context) {
        assignedDocument.context = result.context;
    }

    if (result.message) {
        assignedDocument.message = result.message;
    }

    if (result.selector) {
        assignedDocument.selector = result.selector;
    }

    if (result.type) {
        assignedDocument.type = result.type;
    }

    if (result.typeCode) {
        assignedDocument.typeCode = parseInt(result.typeCode);
    }

    assignedDocument.created = new Date();

    console.info('assignedDocument = ', assignedDocument);
    return assignedDocument;
}

function _getBaseDocument(componentId, testExecution, assignedDocument) {
    assignedDocument.project_id = testExecution.project._id.toString();
    assignedDocument.component_id = testExecution.executedComponents[0]._id;
    //assignedDocument.group_id = componentId;
    assignedDocument.project_name = testExecution.name;
    assignedDocument.project_description = testExecution.description;
    assignedDocument.environment_id = testExecution.test.environment._id.toString();
    assignedDocument.environment_name = testExecution.test.environment.name;
    assignedDocument.test_id = testExecution.test._id.toString();
    assignedDocument.test_name = testExecution.test.name;
    assignedDocument.test_execution_id = testExecution._id.toString();
    assignedDocument.execution_time = 1; //testExecution.executedComponents.timeTaken;
    assignedDocument.version = 1.0;
    assignedDocument.group = false;

    return assignedDocument;
}

function _isArray(ob) {
    return ob.constructor === Array;
}

function getArtilleryBasicInfo(fieldsJson) {
    var basicInfo = {};

    basicInfo[tc.PROJECT_ID] = fieldsJson[tc.PROJECT_ID];
    basicInfo[tc.ID] = fieldsJson[tc.ID];
    basicInfo[tc.COMPONENT_TYPE] = fieldsJson[tc.COMPONENT_TYPE];
    basicInfo[tc.DESCRIPTION] = fieldsJson[tc.DESCRIPTION];
    basicInfo[tc.PERF_LOG] = fieldsJson[tc.PERF_LOG];
    basicInfo[tc.METRIC_LOG] = fieldsJson[tc.METRIC_LOG];
    basicInfo[tc.NETWORK_LOG] = fieldsJson[tc.NETWORK_LOG];

    return basicInfo;
}
exports.getArtilleryBasicInfo = getArtilleryBasicInfo;

function getArtilleryConfigurations(fieldsJson) {
    var config = {};

    var phaseItems = fieldsJson[tc.PHASE_TOTAL_COUNT];
    var headerValueItems = fieldsJson[tc.GLOBAL_HEADER_TOTAL_COUNT];
    var payloadItems = fieldsJson[tc.PAYLOAD_TOTAL_COUNT];
    var files = fieldsJson.files;

    var defaults = {}
    var headers = {};
    var phases = [];

    for (i = 1; i <= phaseItems; i++) {
        var phase = {};
        var phaseConfigName = util.format(tc.PHASE_CONFIG_NAME, i);
        var durationName = util.format(tc.PHASE_CONFIG_DURATION, i);
        var arrivalRateName = util.format(tc.PHASE_CONFIG_ARRIVAL_RATE, i);
        var arrivalCountName = util.format(tc.PHASE_CONFIG_ARRIVAL_COUNT, i);
        var rampToName = util.format(tc.PHASE_CONFIG_RAMP_TO, i);
        var pauseName = util.format(tc.PHASE_CONFIG_PAUSE, i);

        var headerValueName = util.format(tc.GLOBAL_HEADER_VALUE, i);
        console.info('headerKeyName = ', headerKeyName);
        console.info('headerValueName = ', headerValueName);

        console.info('Name = ',  fieldsJson[headerKeyName]);
        console.info('Value = ',  fieldsJson[headerValueName]);
        if (fieldsJson[durationName]) {
            phase[tc.DURATION] = fieldsJson[durationName];
        }

        /*if (fieldsJson[phaseConfigName]) {
            phase[tc.CONFIG_NAME] = fieldsJson[phaseConfigName];
        }*/

        if (fieldsJson[arrivalRateName]) {
            phase[tc.ARRIVAL_RATE] = fieldsJson[arrivalRateName];
        }

        if (fieldsJson[arrivalCountName]) {
            phase[tc.ARRIVAL_COUNT] = fieldsJson[arrivalCountName];
        }

        if (fieldsJson[rampToName]) {
            phase[tc.RAMP_TO] = fieldsJson[rampToName];
        }

        var pause = {}
        if (fieldsJson[pauseName]) {
            pause[tc.PAUSE] = fieldsJson[pauseName];
        }

        if(!_.isEmpty(phase)) {
            if (fieldsJson[phaseConfigName]) {
                phase[tc.CONFIG_NAME] = fieldsJson[phaseConfigName];
            }
            phases.push(phase);
        }

        if(!_.isEmpty(pause)) {
            phases.push(pause);
        }
    }

    config.phases  = phases;

    for (i = 1; i <= headerValueItems; i++) {
        var headerKeyName = util.format(tc.GLOBAL_HEADER_KEY, i);
        var headerValueName = util.format(tc.GLOBAL_HEADER_VALUE, i);
        console.info('headerKeyName = ', headerKeyName);
        console.info('headerValueName = ', headerValueName);

        console.info('Name = ',  fieldsJson[headerKeyName]);
        console.info('Value = ',  fieldsJson[headerValueName]);
        headers[fieldsJson[headerKeyName]] = fieldsJson[headerValueName];
        //headers[headerValueName] = fieldsJson[headerValueName];
    }

    var payloads = [];

    for (i = 1; i <= payloadItems; i++) {
        var payload = {};
        var payloadFields = util.format(tc.PAYLOAD_FIELDS, i);
        var payloadOrder = util.format(tc.PAYLOAD_ORDER, i);
        var fileName = files[(i - 1)];
        var fields = fieldsJson[payloadFields];
        var tempField = new Array();
        tempField = fields.split(',');
        console.info('tempField = ', tempField);
        payload.path = fileName;
        payload.fields = tempField;
        if (tc.SEQUENCE = fieldsJson[payloadOrder]) {
            var order = fieldsJson[payloadOrder];
            payload.order = order;
        }

        payloads.push(payload);
        console.info('fileName = ', fileName);
        console.info('fields = ', fields);
        console.info('order = ', order);

    }

    if (payloads.length > 0) {
        config.payload = payloads;
    }

    if (!_.isEmpty(headers)) {
        defaults.headers = headers;
        config.defaults = defaults;
    }

    return config;
}
exports.getArtilleryConfigurations = getArtilleryConfigurations;


function getArtilleryScenarios(fieldsJson) {
    var scenarios = [];
    var scenario = {};
    //scenario.name = '';
    var scenarioItems = fieldsJson[tc.SCENARIO_TOTAL_COUNT];

    for (i = 1; i <= scenarioItems; i++) {
        var scenarioName = util.format(tc.SCENARIO_NAME, i, 1);
        var scenarioWeight = util.format(tc.SCENARIO_WEIGHT, i, 1);
        var scenarioRequestCount = util.format(tc.SCENARIO_REQUEST_COUNT, i);
        scenario.name = fieldsJson[scenarioName];
        scenario.weight = fieldsJson[scenarioWeight];

        console.info('scenarioRequestCount = ', scenarioRequestCount);
        console.info('fieldsJson[scenarioRequestCount] = ', fieldsJson[scenarioRequestCount]);
        var scenarioRequestItems = fieldsJson[scenarioRequestCount];
        var flows = [];
        for (j = 1; j <= scenarioRequestItems; j++) {
            var flow = {};

            var scenarioRequestMethod = util.format(tc.SCENARIO_REQUEST_METHOD, i, j);
            var scenarioRequestUrl = util.format(tc.SCENARIO_REQUEST_URL, i, j);
            var scenarioRequestPause = util.format(tc.SCENARIO_REQUEST_PAUSE, i, j);

            console.info('scenarioRequestMethod = ', scenarioRequestMethod);
            console.info('fieldsJson[scenarioRequestMethod] = ', fieldsJson[scenarioRequestMethod].toLowerCase());
            var requestUrl = {};
            requestUrl.url = fieldsJson[scenarioRequestUrl];
            flow[fieldsJson[scenarioRequestMethod].toLowerCase()] = requestUrl;
            //flow[fieldsJson[scenarioRequestMethod].toLowerCase()].test = 'test';

            var scenarioAuthMode = util.format(tc.SCENARIO_REQUEST_AUTH_MODE, i, j);
            var scenarioAuthUserName = util.format(tc.SCENARIO_REQUEST_AUTH_USERNAME, i, j);
            var scenarioAuthPassword = util.format(tc.SCENARIO_REQUEST_AUTH_PASSWORD, i, j);
            var scenarioHeaderValueItems = util.format(tc.SCENARIO_REQUEST_HEADER_TOTAL_COUNT, i, j);

            var headerValueItems = fieldsJson[scenarioHeaderValueItems];

            var headers = {};
            for (k = 1; k <= headerValueItems; k++) {
                var scenarioHeaderModeKey = util.format(tc.SCENARIO_HEADER_MODE_KEY, j, k);
                var scenarioHeaderModeValue = util.format(tc.SCENARIO_HEADER_MODE_VALUE, j, k);
                headers[fieldsJson[scenarioHeaderModeKey]] = fieldsJson[scenarioHeaderModeValue];
            }

            var scenarioBodyRaw = util.format(tc.SCENARIO_REQUEST_BODY_RAW, i, j);
            var scenarioBodyCapture = util.format(tc.SCENARIO_REQUEST_BODY_CAPTURE, i, j);
            var scenarioRequestBodyRaw = JSON.parse(fieldsJson[scenarioBodyRaw].toString());
            var scenarioRequestBodyCapture = JSON.parse(fieldsJson[scenarioBodyCapture].toString());

            flow[fieldsJson[scenarioRequestMethod].toLowerCase()].headers = headers;
            flow[fieldsJson[scenarioRequestMethod].toLowerCase()].json = scenarioRequestBodyRaw;
            flow[fieldsJson[scenarioRequestMethod].toLowerCase()].capture = scenarioRequestBodyCapture;

            console.info('flow = ', flow);
            flows.push(flow);

            if (fieldsJson[scenarioRequestPause]) {
                var pause = {}
                pause.think = fieldsJson[scenarioRequestPause];
                flows.push(pause);
            }
        }
        scenario.flow = flows;
        scenarios.push(scenario);
    }
    return scenarios;
}
exports.getArtilleryScenarios = getArtilleryScenarios;
