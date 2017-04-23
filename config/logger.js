/**
 * Created by senthilPeriyasamy on 12/26/2016.
 */

var winston = require('winston');
winston.emitErrs = true;

var logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'debug',
            filename: './logs/perfx360-log.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false,
            showLevel:false
        }),
        new (require('winston-daily-rotate-file'))({
            level: 'debug',
            filename: './logs/daily/daily-log.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false,
            showLevel:false
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
        //logger.info(message);
    }
};
