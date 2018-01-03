var needle = require("needle");
// var moment = require("moment");

var constants = require("./constants");

exports.getCurrentRate = getCurrentRate;

function getCurrentRate (req, res) {
    needle("get", constants.externalFixedApis.koinex_ticker).
        then(resp => {
            console.log("koinex body " + resp.body);
            return res.send("done")
        }).
        catch(error => {
            console.log("koinex error " + error);
            return res.send("error")
        })
}
