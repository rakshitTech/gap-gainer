var request = require("request");
// var moment = require("moment");

var constants = require("./constants");

exports.getCurrentRate = getCurrentRate;

function getCurrentRate (req, res) {
    request(constants.externalFixedApis.koinex_ticker, function (error, response, body) {
        if (error) {
            console.log("koinex error" + error);
            return res.send("error");
        }
        console.log("koinex body" + body);
        if (!body) {
            console.log("koinex response" + response);
        }

        return res.send("done");
    })
}
