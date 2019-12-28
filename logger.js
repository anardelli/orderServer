var winston = require('winston');
require('winston-daily-rotate-file');

winston.emitErrs = false;

function formatter(args) {
    var dataTimeComponent = new Date();
    var logMessage = dataTimeComponent + ' - ' + args.level + ': ' + args.message;
    return logMessage;
}

var logger = new winston.Logger({
    transports: [
        new winston.transports.DailyRotateFile({
            filename: 'logs/./log',
            handleExceptions: true,
            json: false,
            colorize: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            datePattern: 'yyyy-MM-dd.',
            prepend: true,
            level: 'debug',
            formatter: formatter
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true,
            timestamp: true,
            label: 'shopon-services',
            humanReadableUnhandledException: true
        })
    ],
    exitOnError: false
});

module.exports = logger;

module.exports.stream = {
    write: function (message, encoding) {
        logger.info(message);
    }
};