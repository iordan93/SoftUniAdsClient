app.filter("standardDate", ["$filter", function ($filter) {
    return function (input) {
        return $filter("date")(input, "dd-MMM-yyyy");
    };
}]);