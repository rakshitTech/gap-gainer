const pino = require('pino');

const logger = pino();

// pino log levels in-order
// 'fatal'
// 'error'
// 'warn'
// 'info'
// 'debug'
// 'trace'

if (process.env.NODE_ENV == 'production') {
    logger.level = 'trace';
} else {
    logger.level = 'trace';
}

logger.info('PINO loaded');
module.exports = logger;
