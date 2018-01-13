const fs = require('fs');
const moment = require('moment');
const pino = require('pino');

let logger = null;

// pino log levels in-order
// 'fatal'
// 'error'
// 'warn'
// 'info'
// 'debug'
// 'trace'

if (process.env.NODE_ENV == 'production') {
    logger = pino(fs.createWriteStream(`./logs/app_${moment().format('YYYYMMDD')}.log`, { flags: 'a' }));
    logger.level = 'warn';
} else {
    logger = pino();
    logger.level = 'trace';
}

// logger.info('PINO loaded');
module.exports = logger;
