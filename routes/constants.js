function define (obj, name, value) {
    Object.defineProperty (obj, name, {
        value: value,
        enumerable: true,
        writable: false,
        configurable: false
    })
}

exports.externalFixedApis = {};
define(exports.externalFixedApis, "koinex_ticker", {
    url: "https://koinex.in/api/ticker",
    method: "GET"
})
