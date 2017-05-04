/**
 * Created by senthil on 04/05/17.
 */
var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var async = require('async');
var microtime = require('microtime');
var exec = require('child_process').exec;

exports.execute = function(req, res, next) {
    var command = 'artillery run /Users/senthil/work/projects/perf/work/perfx360/routes/service/exec/test.json';
    var child = exec(command, function(err, out, code) {
        console.info('out = ', out);
    });
    /*child.stdout.on('data', function(data) {
        console.info('data = ', data);
    });*/
    res.send('success');
}