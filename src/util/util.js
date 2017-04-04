/**
 * Created by senthil on 04/04/17.
 */

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

module.exports = Utils;