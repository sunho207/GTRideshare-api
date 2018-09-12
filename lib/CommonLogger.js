/*
* Interface for Application Logging
* Version: 1.0
* Date: 9/12/2018
*/

const winston = require('winston');

/*
* Logs an error
* param: header (string) - log header e.g. 'Error Timestamp: 1519211809934'
* param: message (string) - log message
*/
var error = function(header, message) {
    winston.log('error', header, {
        message: message
    });
}

/*
* Logs a warning
* param: header (string) - log header e.g. 'Error Timestamp: 1519211809934'
* param: message (string) - log message
*/
var warn = function(header, message) {
    winston.log('warn', header, {
        message: message
    });
}

/*
* Logs information
* param: header (string) - log header e.g. 'Error Timestamp: 1519211809934'
* param: message (string) - log message
*/
var info = function(header, message) {
    winston.log('info', header, {
        message: message
    });
}

/*
* Log debug information
* param: header (string) - log header e.g. 'Error Timestamp: 1519211809934'
* param: message (string) - log message
*/
var debug = function(header, message) {
    winston.log('debug', header, {
        message: message
    });
}

/*
* Formats a detailed log message
* param: classIdentifier (string) - the class from which the issue was logged
* param: methodIdentifier (string) - the method from which the issue was logged
* param: issueType (string) - generalizes the issues
* param: issueMessage (string) - details the issue
* param: lineNumber (number) - specifies the line number
*/
var formatMessage = function(classIdentifier, methodIdentifier, issueType, issueMessage, lineNumber) {
    return "Class: " + classIdentifier + " from Method: " + methodIdentifier + " errorType: " + issueType + " errorMessage: " + issueMessage + " @line:" + lineNumber;
}

//CommonLogger.js Interface
exports.error = error;
exports.warn = warn;
exports.info = info;
exports.debug = debug;
exports.formatMessage = formatMessage;