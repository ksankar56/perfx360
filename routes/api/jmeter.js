/**
 * Created by senthil on 03/04/17.
 */

var express = require('express');
var router = express.Router();
var path = __dirname + '/views/';

const mvn = require('maven').create({
    cwd: 'projects/3'
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

module.exports = router;
