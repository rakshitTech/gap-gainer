const pg = require('pg');
const logger = require('./logger');

async function connectToPostgreSql() {
    logger.info({"DATABASE_URL": process.env.DATABASE_URL});
    const client = await new pg.Pool().connect({connectionString: process.env.DATABASE_URL});

    if (client) {
        logger.info('POSTGRE connected...');
    } else {
        logger.error('Error while connecting to Postgre client');
    }
}

exports.connectToPostgreSql = connectToPostgreSql;
