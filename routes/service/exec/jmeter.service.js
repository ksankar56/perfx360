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

exports.execute = function(req, res, next) {

    var project = 'dist/projects/' + req.params.projectId;

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
        throw err;
    }

    //var promise = mvn.effectivePom();
    res.json({ title: 'jMeter' + req.params.testId });
};

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
                    var test = {}
                    test[items[i]] = JSON.parse(json)

                    resultJson.results.push(test);
                }

                callback(null, resultJson);
            }
        ],
        function (err, resultJson) {
            if (err) throw err;
            events.emit("JsonResponse", req, res, resultJson);
        }
    );
}