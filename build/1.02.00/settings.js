var clsName = "fa fa-user-plus fa-3x",
	usedBtns = [],
	addButton = "<button id=\"addplayerbtn\" onclick=\"addPlayerButtons();\" title=\"Add player\"><i class=\""+clsName+"\"></i></button>";

$(document).on("click", ".keyInput", function() {

	var txt = $(this).text(),
		index = usedBtns.indexOf(txt);

	if(index != -1)
		usedBtns.splice(index, 1);

	for (var i = 0; i < $(".keyInput").length; i++) {

		if($(".keyInput").eq(i).hasClass("selecting")) {

			var txt = $(".keyInput").eq(i).text(),
				index = usedBtns.indexOf(txt);

			if(index != -1)
				usedBtns.splice(index, 1);

			if(i % 2 == 0) {
				$(".keyInput").eq(i).text("Left");
			}
			else {
				$(".keyInput").eq(i).text("Right");
			}

			$(".keyInput").eq(i).removeClass("selecting");
			document.removeEventListener("keyup", addBtnVal);
		}
	}

	$(this).html("..");
	$(this).addClass("selecting");

	document.addEventListener("keyup", function addBtnVal(e) {
		e.preventDefault();

		var c = String.fromCharCode(e.keyCode);

		if(usedBtns.indexOf(c) == -1) {
			usedBtns.push(c);

			$(".selecting").html(c);
			$(".selecting").data("key", e.keyCode);
			$(".selecting").removeClass("selecting");

			document.removeEventListener("keyup", addBtnVal);
		}
	});

});

$(document).on("click", ".removePlayer", function() {
	var index = $(this).siblings(".playerIndex").val();
	$(this).parent().html("");

	var pos = usedPlayerColors.indexOf(parseInt(index));
	usedPlayerColors.splice(pos, 1);

	for (var i = 0; i < $(".boxPlayer").length; i++) {
		if($(".boxPlayer").eq(i).html() == "" && i+1 < $(".boxPlayer").length) {
			if($(".boxPlayer").eq(i+1).html() != addButton)
				$(".boxPlayer").eq(i).html($(".boxPlayer").eq(i+1).html());
			$(".boxPlayer").eq(i+1).html("");
		}
	}

	for (var i = 0; i < $(".boxPlayer").length; i++) {
		if($(".boxPlayer").eq(i).html() == "") {
			$(".boxPlayer").eq(i).append(addButton);
			break;
		}
	}
});

function addPlayerButtons() {
	var leftKey = document.createElement("span"),
 		rightKey = document.createElement("span"),
		name = document.createElement("input"),
 		color = document.createElement("input"),
		id = document.createElement("input"),
		tag = document.createElement("h3"),
		closebtn = document.createElement("button"),
 		spanname1 = document.createTextNode("Left"),
 		spanname2 = document.createTextNode("Right"),
 		info = getPlayerColor();

	leftKey.setAttribute("class", "keyInput");
	leftKey.setAttribute("data-key", null);

	rightKey.setAttribute("class", "keyInput");
	rightKey.setAttribute("data-key", null);

	name.setAttribute("type", "hidden");
	name.setAttribute("class", "playerInfo");
	name.setAttribute("value", info.name);

	color.setAttribute("type", "hidden");
	color.setAttribute("class", "playerInfo");
	color.setAttribute("value", info.color);

	id.setAttribute("type", "hidden");
	id.setAttribute("class", "playerIndex");
	id.setAttribute("value", info.index);

	tag.style.color = info.color;
	tag.innerHTML = info.name;

	closebtn.setAttribute("class", "removePlayer");
	closebtn.setAttribute("title", "Remove player");
	closebtn.innerHTML = "<i class='fa fa-times fa-1x'></i>";

	leftKey.appendChild(spanname1);
	rightKey.appendChild(spanname2);

	for (var i = 0; i < $(".boxPlayer").length; i++) {
		if($(".boxPlayer").eq(i).find("i").hasClass(clsName)) {
			$(".boxPlayer").eq(i).html("");
			$(".boxPlayer").eq(i).append(closebtn);
			$(".boxPlayer").eq(i).append(tag);
			$(".boxPlayer").eq(i).append(leftKey);
			$(".boxPlayer").eq(i).append(rightKey);
			$(".boxPlayer").eq(i).append(name);
			$(".boxPlayer").eq(i).append(color);
			$(".boxPlayer").eq(i).append(id);

			if(i < $(".boxPlayer").length)
				$(".boxPlayer").eq(i+1).append(addButton);

			return;
		}
	}
}

$("#enterGame").click(function() {
	$("#startscreen").fadeOut(400, function() {
		setTimeout(function() {
			$("#menu").fadeIn(300);
		}, 300);
	});
});

addPlayerButtons();
addPlayerButtons();

function resize() {
	var tmp = ctx.getImageData(0, 0, canvas.width, canvas.height);

	document.getElementById("canvas").width = window.innerWidth - (window.innerWidth / 4);
	document.getElementById("canvas").height = window.innerHeight;
	ctx.putImageData(tmp, 0, 0);

	tmp = undefined;
}

resize();
window.addEventListener("resize", resize, false);