app.filter("status", function () {
    return function (input) {
        return input.replace(/[A-Z]/g, " $&");
    };
});