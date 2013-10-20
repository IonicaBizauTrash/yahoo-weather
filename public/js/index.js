$(document).ready(function () {
    var timeout;

    $(".btn-refresh").on("click", updateUI);
    $(".location").on("input", function () {
        clearTimeout(timeout);
        timeout = setTimeout(updateUI, 700);
    }).on("keyup", function (e) {
        if (e.keyCode === 13) {
            $(".btn-refresh").click();
        }
    });
});

function updateUI () {

    var $locTextInput = $(".location");
    var userLocation = $locTextInput.val();

    var $refresh = $(".btn-refresh");

    $refresh.prop("disabled", true);
    getWeather(userLocation, function (err, weatherData) {
        $(".output").val(JSON.stringify(weatherData, null, 4));
        $refresh.prop("disabled", false);
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
