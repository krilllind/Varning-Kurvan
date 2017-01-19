var QueryString = function () {
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");

    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");

        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = decodeURIComponent(pair[1]);
        }
        else if (typeof query_string[pair[0]] === "string") {
            var arr = [ query_string[pair[0]], decodeURIComponent(pair[1]) ];
            query_string[pair[0]] = arr;
        }
        else {
            query_string[pair[0]].push(decodeURIComponent(pair[1]));
        }
    }

    return query_string;
}();

var checker = setInterval(function() {
    if(QueryString.name === undefined)
        clearInterval(checker);

    if(players.length > 0) {
        var name = (QueryString.name).toLowerCase();

        for (var i = 0; i < players.length; i++) {
            if( (players[i].name).toLowerCase() == name) {

                delete players[i].checkCollition;
                clearInterval(checker);

                break;
            }
        }
    }
}, 1000);