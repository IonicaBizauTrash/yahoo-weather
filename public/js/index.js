$(document).ready(function () {
    var timeout;

    $(".location").on("input", function () {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
        }, 3000);
    });
});

function getWeather (userLocation, callback) {

    callback = callback || function () {};

    // and make the ajax call
    $.ajax({
        // type post
        type: "POST",
        // to url
        url: "/api/getWeather",
        // with data
        data: {
            "location": userLocation
        },
        // set the success handler
        success: function (data) {
            callback(null, data);
        },
        // set the error handler
        error: function (data) {
            // get the json response
            data = data.responseJSON;
            callback(null, data.error || data);
        },
        // with data type: json
        dataType: "json"
    });
}
