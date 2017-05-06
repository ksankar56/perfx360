/**
 * Created by senthil on 08/04/17.
 */
var jmeterServiceImpl = require('./jmeter.service.impl');

exports.execute = function(req, res, next) {
    jmeterServiceImpl.execute(req, function (err, params) {
     if (err) {

     }

     res.send(params);
     });
}

exports.result = function(req, res) {
    /*getResultJson(req.params.testExecutionId, function (err, result) {
        events.emit("JsonResponse", req, res, result);
    });*/
    res.send('done');
}
