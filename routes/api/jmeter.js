/**
 * Created by senthil on 03/04/17.
 */

var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var parseString = require('xml2js').parseString;
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

const mvn = require('maven').create({
    cwd: 'projects/4'
});

/* GET users listing. */
router.get('/mvn/exec/:projectId/:testId', function(req, res, next) {

    mvn.execute(['clean', 'install'], { 'skipTests': true }).then(function(result) {
        // As mvn.execute(..) returns a promise, you can use this block to continue
        // your stuff, once the execution of the command has been finished successfully.
        console.info('result = ', result);
    });
    //mvn.install();

    //var promise = mvn.effectivePom();
    console.info('param id = ', req.params.projectId);
    res.json({ title: 'jMeter' + req.params.testId });
});

/* GET users listing. */
router.get('/mvn/output/:projectId/:testName', function(req, res, next) {
    var projectFolder = '/projects/4';
    var project = path.join(process.env.PWD, "/projects/" + req.params.projectId);
    var jtlPath =  path.join(project, "/target/jmeter/report/test.jtl");
    fs.readFile(jtlPath, 'utf8', function(err, data) {
        parser.parseString(data, function (err, result) {
            console.dir(result);
            res.json(result);
            console.log('Done');
        });
    });

});

module.exports = router;
