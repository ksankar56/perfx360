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

var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

exports.executeSelenium = function(req, res, next) {

    _executeTest(req, res, function(err, result) {
        res.send('success');
    });
};

function _executeTest(req, res, callback) {
    try {
        driver.get('https://www.google.com');
        driver.findElement(By.name('q')).sendKeys('perfx360');
        driver.findElement(By.id('search-button')).click();
        driver.wait(until.titleIs('google.com'), 1000);
        driver.quit();
    } catch (err) {
        callback(null, false);
    }

    callback(null, true);
}