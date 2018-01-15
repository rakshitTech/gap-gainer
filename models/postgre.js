const pg = require('pg');
const logger = require('./logger');

async function connectToPostgreSql() {
    logger.info({"DATABASE_URL": process.env.DATABASE_URL});
    const pool = await new pg.Pool({connectionString: process.env.DATABASE_URL});

    if (pool) {
        logger.info('POSTGRE connected...');
    } else {
        logger.error('Error while connecting to Postgre client');
    }
}

exports.connectToPostgreSql = connectToPostgreSql;
