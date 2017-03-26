/**
 * Created by senthil on 23/03/17.
 */

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var path = require('path');
var express = require('express');

exports.init = function(app) {
// view engine setup
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.set('views', path.join(__dirname, '../../views'));
    app.set('view engine', 'ejs');
    app.use(require('../../src'));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));

    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, '../../public')));

    app.use(session({
        secret: 'secretkey',
        name: 'perfx360',
        proxy: true,
        resave: true,
        saveUninitialized: true
    }));

    app.use(function (err, req, res, next) {
        console.log(err.stack);
        res.status(500).send({"Error": err.stack});
        //rem.emit('ErrorJsonResponse', req, res, {"status" : err});
    });
}