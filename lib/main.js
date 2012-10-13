var request = require("request");
var sentiment = require("sentiment");
var qs = require("querystring");
var async = require("async");

module.exports = function(a, b) {
    var query, cb;

    if("function" === typeof a) {
        cb = a;
    } else if("function" === typeof b) {
        query = a;
        cb = b;
    }

    request({
        uri: "http://search.twitter.com/search.json?" + qs.stringify({
            q: query && query !== "" ? query.toString() : ":) OR :(",
            lang: "en"
        }),
        json: true
    }, function(err, res, data) {
        if(err || !data || !data.results) return cb(err, false);

        var results = data.results;
        var length = results.length;
        var yeps = 0;
        var nopes = 0;

        async.forEach(results, function(result, next) {
            sentiment(result.text, function(err, result) {
                if(result.score < 1) nopes++;
                else yeps++;

                next(err);
            });
        }, function(err) {
            if(err) return cb(err, false);

            cb(null, yeps >= nopes);
        });
    });
};
