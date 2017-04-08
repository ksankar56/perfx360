/**
 * Created by senthil on 03/04/17.
 */

var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var parseString = require('xml2js').parseString;
var mvn = require('maven');
var async = require('async');
var events = require('../../src/common/events');
var promise = require('bluebird');
var parser = require('xml2json');

/* GET users listing. */
router.get('/mvn/exec/:projectId/:testId', function(req, res, next) {

    var project = 'projects/' + req.params.projectId;
    console.info('project = ', project);

    try {
        const maven = mvn.create({
            cwd: project
        });

        maven.execute(['clean', 'install'], {'skipTests': true}).then(function (result) {
            // As mvn.execute(..) returns a promise, you can use this block to continue
            // your stuff, once the execution of the command has been finished successfully.
            console.info('result = ', result);
        });
        //mvn.install();
    }  catch (err) {
        console.info('err = ', err);
    }

    //var promise = mvn.effectivePom();
    console.info('param id = ', req.params.projectId);
    res.json({ title: 'jMeter' + req.params.testId });
});

/* GET users listing. */
router.get('/mvn/output/:projectId/:testName', function(req, res, next) {
    executeResult(req, res, req.params.projectId);
});

function executeResult(req, res, projectId) {
    var project = path.join(process.env.PWD, "/projects/" + projectId);
    var resultsPath = project + '/target/jmeter/results'

    async.waterfall(
        [
            function(callback) {
                var project = path.join(process.env.PWD, "/projects/" + projectId);
                var resultsPath = project + '/target/jmeter/results'

                fs.readdir(resultsPath, function(err, items) {
                    var files = [];
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
                    console.info('item = ', items[i]);
                    var filePath = resultsPath + '/' + items[i];
                    jtlFiles[i] = filePath
                    //jtlFiles.filePaths.push({'filePath': filePath});
                }
                callback(null, jtlFiles, items);
            },
            function(jtlFiles, items, callback) {
                var resultJson = {};
                resultJson.results = [];
                for(var i = 0; i < items.length; i++) {
                    var resultXML = fs.readFileSync(jtlFiles[i], 'utf8');
                    //console.info('resultXML = ', resultXML);
                    /*parser.parseString(resultXML, function (err, result) {
                     resultJson[item[i]] = result;
                     });*/

                    var json = parser.toJson(resultXML);
                    console.info('json = ', json);
                    //resultJson[items[i]] = json;
                    resultJson.results.push(JSON.parse(json));

                }
                //console.info('after for ', resultJson);
                callback(null, resultJson);
            }
        ],
        function (err, resultJson) {
            //console.log('resultJson = ', resultJson);
            // Node.js and JavaScript Rock!
            events.emit("JsonResponse", req, res, resultJson);
        }
    );
    //events.emit("JsonResponse", req, res, resultJson);
}

function readItems(req, res, callback) {

    var project = path.join(process.env.PWD, "/projects/" + req.params.projectId);
    var resultsPath = project + '/target/jmeter/results'

    fs.readdir(resultsPath, function(err, items) {
        var files = [];
        for(var i = 0; i < items.length; i++) {
            if(_.endsWith(items[i], 'jtl')) {
                files.push(items[i]);
            }
        }
        callback(null, items, resultsPath);
    });
}

function readFilePaths(items, resultsPath, callback) {
    //var caption = items +' and '+ arg2;
    var jtlFiles = [];

    for(var i = 0; i < items.length; i++) {
        console.info('item = ', items[i]);
        var filePath = resultsPath + '/' + items[i];
        jtlFiles[i] = filePath
        //jtlFiles.filePaths.push({'filePath': filePath});
    }
    callback(null, jtlFiles, items);
}

function readJtlFileJson(jtlFiles, items, callback) {
    //caption += ' works!';
    var resultJson = [];
    for(var i = 0; i < items.length; i++) {
        var resultXML = fs.readFileSync(jtlFiles[i], 'utf8');
        //console.info('resultXML = ', resultXML);
        /*parser.parseString(resultXML, function (err, result) {
            resultJson[item[i]] = result;
        });*/
        var json = parser.toJson(resultXML);
        console.info('json = ', json);
        resultJson[items[i]] = json;
    }
    //console.info('after for ', resultJson);
    callback(null, resultJson);
}

module.exports = router;
