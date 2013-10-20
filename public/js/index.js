$(document).ready(function () {
    var timeout;

    $(".location").on("input", function () {
        clearTimeout(timeout);
        var $locTextInput = $(this);
        timeout = setTimeout(function () {
            updateUI($locTextInput.val());
        }, 700);
    });
});

function updateUI (userLocation, callback) {
    getWeather(userLocation, function (err, weatherData) {
        debugger;
    });
}

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
            callback(data.error || data);
        },
        // with data type: json
        dataType: "json"
    });
}
