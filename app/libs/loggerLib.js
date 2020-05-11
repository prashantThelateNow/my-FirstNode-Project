'use strict'
const logger = require('pino')()
const moment = require('moment');

let errcapture = (errorMessage, errorOrigin, errorLevel) => {
    let currTime  = moment()

    let errResponse = {
        timestamp: currTime,
        errorMessage: errorMessage,
        errorOrigin: errorOrigin,
        errorLevel: errorLevel
    }
    logger.error(errResponse);
    return errResponse;
}

let captureInfo = (message, origin, importance) => {
    let currTime = moment();

    let infoMessage = {
        timestamp: currTime,
        message: message,
        origin: origin,
        level: importance
    }
    logger.info(infoMessage);
    return infoMessage;
}

module.exports = {
    error: errcapture,
    info: captureInfo
}