$.getJSON("build/packages.json", function(json) {
    $("#version").html("Current version: " + json.version);
    $("#startscreen h1").html(json.name);
    $("#title").html(json.name);

    $.ajax({
    	url: "./build/fetch.php?uri="+json.version,
    	async: true,
    	type: "GET",
    	success: function(data) {
        	var d = JSON.parse(data);

    		for (var i = 0; i < d.length; i++) {
    			var arr = d[i].split("."),
    				type = arr[arr.length -1];

    			switch(type) {
    				case "js":
    					$.getScript("./build/" + json.version + "/" + d[i]);
    					break;
    				case "css":
    					var el = document.createElement("link");
    					el.setAttribute("rel", "stylesheet");
    					el.setAttribute("type", "text/css");
    					el.setAttribute("href", "./build/" + json.version + "/" + d[i]);
    					$("head").append(el);
    					break;
    				default:
    					break;
    			}
    		}
    	}
    });
});

$(function() {
    $.ajax({
        url: "./build/getLogData.php",
        async: true,
        type: "GET",
        success: function(logs) {
            var l = JSON.parse(logs);

            for (var i = 0; i < l.length; i++) {
                var dir = "./build/"+l[i]+"/log.html";

                $.get(dir, function(data) {
                    $("#log").append(data);
                });
            }
        }
    });
});