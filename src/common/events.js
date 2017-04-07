/**
 * Created by senthil on 04/04/17.
 */
var events = require('events');

//create an object of EventEmitter class by using above reference
var rem = new events.EventEmitter();

rem.on('JsonResponse', function (req, res, data) {
    console.info('data = ', data);
    res.status(200).send({sucess: true, data: data});
});

rem.on('ErrorJsonResponse', function (req, res, err) {
    res.status(500).send({sucess: false, data: err});
});

module.exports = rem;
