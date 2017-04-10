/**
 * Created by senthil on 10/04/17.
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

var pa11y = require('pa11y');

exports.executeAccessibility = function(req, res, next) {
    testAccessibility(function (err, results) {
        if (err) {
            logger.debug(err);
            var baseError = new BaseError(Utils.buildErrorResponse(constants.FATAL_ERROR, '', constants.FATAL_ERROR_MSG, err.message, 500));
            resEvents.emit('ErrorJsonResponse', req, res, baseError);
        }

        res.status(constants.HTTP_OK).send({
            status: baseService.getStatus(req, res, constants.HTTP_OK, "Successfully Fetched"),
            data: results});
        //console.info('done done');
    });
};

function testAccessibility(callback) {
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
    var urls = [
        'http://www.google.com/',
        'http://www.twitter.com/',
        'http://www.github.com/'
    ];
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
        console.log('All done!' , resultJson);
        callback(null, resultJson)
    };

    // Lastly, push the URLs we wish to test onto the queue
    queue.push(urls);
}