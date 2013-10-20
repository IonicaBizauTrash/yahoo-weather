var Util = {};

/*
 *  Send response to the client
 * */
Util.sendResponse = function (req, res, content, status, contentType, force) {

    // if not provided, status is 200
    status = status || 200;

    // set the content type
    contentType = contentType || "application/json";

    // set headers and status code
    res.writeHead(status, {"Content-Type": contentType});

    // handle mongo errors
    if (content instanceof Error) {
        content = content.message;
    }

    // TODO Comments
    var response = (content || {}).constructor === Object ? content : {};
    if (typeof content === "string") {
        response.output = content;
        if (status !== 200) {
            response.error = content;
            delete response.output;
        }
    }

    if (force) {
        res.end(content);
        return;
    }

    // TODO Simulate a timeout
    setTimeout(function () {
        res.end(JSON.stringify(response, null, 4));
    }, 1000);
};

/*
 *  Finds value in object using dot notation
 *
 * */
Util.findValue = function (parent, dotNot) {

    if (!dotNot) return undefined;

    var splits = dotNot.split(".");
    var value;

    for (var i = 0; i < splits.length; i++) {
        value = parent[splits[i]];
        if (value === undefined) return undefined;
        if (typeof value === "object") parent = value;
    }

    return value;
}

/*
 *  Returns true if the validation is NOT passed
 *  and false if the validation IS passed
 * */
Util.isRequired = function (value) {
    if (["", undefined].indexOf(value) > -1) {
        return true;
    }
    return false;
}

module.exports = Util;
