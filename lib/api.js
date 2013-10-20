var qs = require('querystring');
var Url = require('url');
var Util = require("./util");

var API_ROOT = "/api/"
var objToExport = {};

var JohnnysWeather = require("johnnys-weather");


/*
 * */
objToExport[API_ROOT + "getWeather/"] = function (req, res) {

    getFormData(req, res, function (err, formData) {
        var params = {
            location : formData.location,
            appid    : require("../credentials").appId,
            logging  : true //Debug info or not
        }

        if (err) { return Util.sendResponse(req, res, err, 400); }

        JohnnysWeather(params, function(err, data) {

            if (err) { return Util.sendResponse(req, res, err, 400); }
            Util.sendResponse(req, res, data, 200);
        });
    });
};

module.exports = objToExport;


/*
 *  Returns the form data
 *
 * */
function getFormData(request, response, callback) {

    if (typeof response === "function") {
        callback = response;
    }

    // the request method must be 'POST'
    if (request.method == 'POST') {

        var body = '';

        // on data
        request.on('data', function (data) {
            // add data to body
            body += data;
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6) {
                // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
                request.connection.destroy();
            }
        });

        // and on end
        request.on('end', function () {
            // parse body
            var POST = qs.parse(body);
            // and callback it!
            callback(undefined, POST);
        });
        return;
    }

    // if it's  a get request, maybe we have some query data
    var queryData = Url.parse(request.url, true).query;

    // if not post, callback undefined
    callback(null, queryData);
}


