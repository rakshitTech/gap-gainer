const pg = require('pg');
const logger = require('./logger');

async function connectToPostgreSql() {
    const client = await new pg.Pool().connect();

    if (client) {
        logger.info('POSTGRE connected...');
    } else {
        logger.error('Error while connecting to Postgre client');
    }
}

exports.connectToPostgreSql = connectToPostgreSql;
