const needle = require('needle');

const logger = require('../models/logger');

const constants = require('./../helpers/constants');

function getCurrentRate(req, res) {
    logger.info({ request: { body: req.query } });
    needle(
        constants.externalFixedApis.koinex_ticker.method,
        constants.externalFixedApis.koinex_ticker.url
    ).then((resp) => {
        logger.info({ response: resp && resp.body });
        return res.send(`resp: ${resp && resp.body}`);
    }).catch((error) => {
        logger.error({ error });
        return res.send(`error: ${error}`);
    });
}

exports.getCurrentRate = getCurrentRate;
