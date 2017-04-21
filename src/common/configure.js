/**
 * Created by senthil on 23/03/17.
 */

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var path = require('path');
var express = require('express')
    , session = require('express-session')
    , morgan = require('morgan')
    , logger = require("../../config/logger")
    , expressLayouts = require('express-ejs-layouts')
    , validator = require('express-validator')
    , cors = require('cors')
    , resEvents = require('./events');

exports.init = function(app) {
    app.use(cookieParser());
    app.use(session({
        secret: 'secretkey',
        name: 'perfx360',
        proxy: true,
        resave: true,
        saveUninitialized: true
    }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(cors());

    // view engine setup
    app.set('views', path.join(__dirname, '../../views'));
    app.set('view engine', 'ejs');
    app.use(expressLayouts);
    app.set('layout extractScripts', true)
    app.set('layout extractStyles', true)
    app.use(require('../../src'));
    app.set('json spaces', 5);

    app.use(morgan('combined', {"stream": logger.stream}));

    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

    app.use(express.static(path.join(__dirname, '../../public')));
    app.use(function(req, res, next) {
        res.locals.stuff = {
            query : req.query,
            url   : req.originalUrl
        }

        res.locals.xhr = req.xhr;

        next();
    });

    app.use(function (err, req, res, next) {
        //res.status(500).send({"Error": err.stack});
        resEvents.emit('ErrorJsonResponse', req, res, {"status" : err});
    });

    app.locals.context = '/';
}