/**
 * Created by senthil on 08/04/17.
 */
var express = require('express');
var Status = require('./domains/Status');

exports.getStatus = function(req, res, statusCode, statusMessage) {
    Status.code = statusCode;
    Status.message = statusMessage;

    return Status;
}
