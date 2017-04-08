/**
 * Created by senthil on 08/04/17.
 */
var express = require('express')
    , router = express.Router()
    , mongoose = require('mongoose')
    , resEvents = require('../../src/common/events')
    , Utils = require('../../src/util/util')
    , BaseError = require('../../src/common/BaseError')
    , _ = require('lodash')
    , constants = require('../../src/common/constants')
    , winston = require('winston');

var User = require('../../src/model/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.json({component:true});
});
