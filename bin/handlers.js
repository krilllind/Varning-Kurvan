$("#openChangelog").click(function() {
	$("#overlay").fadeIn(300, function() {
		$("#changelog").fadeIn(300);
	});
});

$("#settingsBtn").click(function() {
	$("#overlay").fadeIn(300, function() {
		$("#settings").fadeIn(300);
	});
});

document.addEventListener("keyup", function(e) {
	if(e.keyCode == 27) {
		e.preventDefault();

		if($("#settings").css("display") == "block") {
			$("#settings").fadeOut(300);
			$("#overlay").fadeOut(300);
		}
		else {
			$("#overlay").fadeIn(300, function() {
				$("#settings").fadeIn(300);
			});
		}
	}
}, false);

$(".close").click(function() {
	$(this).parent().fadeOut(300);
	$("#overlay").fadeOut(300);
});