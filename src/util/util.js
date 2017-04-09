/**
 * Created by senthil on 04/04/17.
 */
var _ = require('lodash')


var Utils = function f(options) {
    var self = this;
};

Utils.buildErrorResponse = function(name, type, message, detail, errorCode) {
    var response = {};
    response.name = name;
    response.type = type;
    response.message = message;
    response.detail = detail;
    response.errorCode = errorCode;

    return response;
};

Utils.getUniqueArrayElements = function (items) {
    var temp = [];
    for (var i = 0; i < items.length; i++) {
        if (i == 0 ) {
            temp.push(items[i]);
        } else {

        }
    }

    return temp;
}

module.exports = Utils;