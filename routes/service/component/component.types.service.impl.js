/**
 * Created by senthil on 08/04/17.
 */
var _ = require('lodash')
    , mongoose = require('mongoose')
    , winston = require('winston')
    , resEvents = require('../../../src/common/events')
    , Utils = require('../../../src/util/util')
    , BaseError = require('../../../src/common/BaseError')
    , constants = require('../../../src/common/constants')
    , Status = require('../../../src/common/domains/Status')
    , baseService = require('../../../src/common/base.service')
    , logger = require('../../../config/logger');

var ComponentType = require('../../../src/model/ComponentType');

function getComponentTypes(callback) {
    ComponentType.find(function (err, componentTypes) {
        callback(err, componentTypes);
    });
};

exports.getComponentTypes = getComponentTypes;


function getComponentType(id, callback) {
    ComponentType.find({_id: id}, function (err, componentType) {
        callback(err, componentType);
    });
};

exports.getComponentType = getComponentType;