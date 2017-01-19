var canvas = document.getElementById("canvas"),
	playerlist = $("#playerlist"),
	ctx = canvas.getContext("2d"),

	usedPlayerColors = [],
	gameTimer,
	players = [],
	maxPoints;

function Player(leftKey, rightKey, name, color) {
	var pos = getStartPos();

	this.name = name;
	this.color = color;
	this.x = pos.x;
	this.y = pos.y;
	this.r = 4;
	this.speed = 1.5;
	this.v = Math.round(Math.random() * (2 * Math.PI) );
	this.va = (Math.PI / 60);
	this.dv = 0;
	this.alive = true;
	this.score = 0;
	this.uuid = null;
	this.getScore = true;
	this.makeGap = false;
	this.timer = getTimerTime();

	this.draw = function() {
		if(this.makeGap) {
			clearCanvas(this.x - (this.r * 1.85), this.y - (this.r * 1.85), this.r * 3.7, this.r * 3.7);
			this.r = 3.5;
		}

		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
		ctx.fill();
		ctx.closePath();

		if(!this.makeGap) {
			this.r = 4;
		}
	}

	this.move = function() {
		this.v += this.dv * this.va;

		var dx = Math.cos(this.v);
		var dy = Math.sin(this.v);

		if(this.alive) {
			this.x += dx * this.speed;
			this.y += dy * this.speed;
		}
	}

	this.checkCollition = function() {
		var x = (Math.cos(this.v) * (this.r)) + this.x;
		var y = (Math.sin(this.v) * (this.r)) + this.y;
		var dataPos = ctx.getImageData(x, y, 1, 1).data;
		var r = dataPos[0], g = dataPos[1], b = dataPos[2];

		if(r != 0 || g != 0 || b != 0)
			this.alive = false;
		else if(this.x < 0 || this.y < 0 || this.x > canvas.width || this.y > canvas.height)
			this.alive = false;
	}

	makeListener(this, leftKey, rightKey);
	makeGapInterval(this);
}

function makeGapInterval(obj) {
	setTimeout(function() {
		obj.makeGap = true;

		setTimeout(function() {
			obj.makeGap = false;
			obj.timer = getTimerTime();

			makeGapInterval(obj);
		}, 190);
	}, obj.timer)
}

function makeListener(obj, leftKey, rightKey) {
	document.addEventListener("keydown", function(e) {
		switch(e.keyCode) {
			case leftKey:
				obj.dv = -1;
				e.preventDefault();
				break;
			case rightKey:
				obj.dv = 1;
				e.preventDefault();
				break;
			default:
				break;
		}
	});

	document.addEventListener("keyup", function(e) {
		switch(e.keyCode) {
			case leftKey:
				obj.dv = 0;
				e.preventDefault();
				break;
			case rightKey:
				obj.dv = 0;
				e.preventDefault();
				break;
			default:
				break;
		}
	});
}

function getTimerTime(start, stop) {
	if(start == undefined)
		start = 3000;
	if(stop == undefined)
		stop = 8000;

	return (Math.floor(Math.random() * stop) + start);
}

function clearCanvas(x, y, w, h) {
	if(x == undefined)
		x = 0;
	if(y == undefined)
		y = 0;
	if(w == undefined)
		w = canvas.width;
	if(h == undefined)
		h = canvas.height;

	ctx.clearRect(x, y, w, h);
}

function getPlayerColor() {
	var colors = [
		{"color":"#fff966", 	"name":"Sunny",			"index":0},
		{"color":"#3fd6fe", 	"name":"Baby blues", 	"index":1},
		{"color":"#ee1e56", 	"name":"Rusty", 		"index":2},
		{"color":"#4bda62", 	"name":"Venom", 		"index":3},
		{"color":"#b43dde", 	"name":"Violet", 		"index":4},
		{"color":"#f7f7f7", 	"name":"Chris", 		"index":5}
	];

	while(true) {
		var r = Math.abs(Math.round(Math.random() * colors.length -1));

		if(usedPlayerColors.indexOf(r) == -1) {
			usedPlayerColors.push(r);
			return colors[r];
		}
	}
}

function getStartPos() {
	var x, y, w, h;

	w = ctx.canvas.width - 200;
	h = ctx.canvas.height - 200;

	x = Math.round(Math.random() * w) + 100;
	y = Math.round(Math.random() * h) + 100;

	return {"x":x, "y":y};
}

function showWinner() {
	var winner = {"score":0}, second = {"score":0}, third = {"score":0};

	for (var i = 0; i < players.length; i++) {
		if(players[i].score >= maxPoints && players[i].score > winner.score)
			winner = players[i];
	}

	for (var i = 0; i < players.length; i++) {
		if(players[i].score > second.score && players[i].score < maxPoints)
			second = players[i];
	}

	for (var i = 0; i < players.length; i++) {
		if(players[i].score > third.score && players[i].score <= second.score && players[i].name != second.name)
			third = players[i];
	}

	$("#first").css({"backgroundColor":winner.color});
	$("#second").css({"backgroundColor":second.color});
	$("#third").css({"backgroundColor":third.color});

	$("#overlay").fadeIn(500);
	$("#winner").fadeIn(500);
}

function startGame() {
	for (var i = 0; i < players.length; i++)
		players[i].draw();

	setTimeout(function() {
		gameTimer = setInterval(Game, 1000 / 60);
	}, 2500);
}

function stopGame(clear) {
	clearTimeout(gameTimer);

	if(clear)
		clearCanvas();
}

function restartGame() {
	stopGame();

	setTimeout(function() {
		for (var i = 0; i < players.length; i++) {
			players[i].getScore = true;
			players[i].alive = true;
			players[i].x = getStartPos().x;
			players[i].y = getStartPos().y;
		}

		clearCanvas();
		startGame();
	}, 1000);
}

function initGame() {
	maxPoints = players.length * 10;

	$("#playerlist").empty();
	$("#maxPoints").empty();
	$("#menu").css({"display":"none"});
	$("#maxPoints").append(maxPoints+"p");

	for (var i = 0; i < players.length; i++) {
		players[i].uuid = i;
		$("#playerlist").append("<li id='"+i+"' style='color:"+players[i].color+"'>"+players[i].name+"<span>"+players[i].score+"p</span></li>");
	}

	startGame();
}

function Game() {
	var deadPlayers = 0;

	for (var i = 0; i < players.length; i++) {
		players[i].move();

		if(players[i].hasOwnProperty("checkCollition"))
			players[i].checkCollition();

		if(!players[i].alive) {

			if(players[i].getScore) {

				for (var j = 0; j < players.length; j++) {

					if(players[j].alive) {
						players[j].score += 2;
						$("#"+players[j].uuid).children("span").html(players[j].score+"p");
					}
				}

				players[i].getScore = false;
			}

			deadPlayers++
		}
		else
			players[i].draw();
	}

	if(deadPlayers == players.length -1) {
		var winner = false;

		for (var i = 0; i < players.length; i++)
			if(players[i].score >= maxPoints)
				winner = true;

		if(winner) {
			stopGame();
			showWinner();
			return;
		}
		else {
			restartGame();
		}
	}
}

$("#startbtn").click(function() {
	players = [];

	for (var i = 0; i < $(".keyInput").length; i+=2) {
		var leftKey = $(".keyInput").eq(i).data("key");
		var rightKey = $(".keyInput").eq(i+1).data("key");
		var name = $(".playerInfo").eq(i).val();
		var color = $(".playerInfo").eq(i+1).val();

		if(leftKey != null || rightKey != null)
			players.push(new Player(leftKey, rightKey, name, color));
		else
			stopGame();
	}

	$("#menu").fadeOut(500, function() {
		$("#scorboard").animate({"right":"0"}, 800, function() {
			setTimeout(initGame, 300);
		});
	});
});

$("#restart").click(function() {
	stopGame(true);
	$("#overlay").fadeOut(300);
	$("#scorboard").animate({"right":"-25%"}, 300, function() {
		$("#playerlist").html("");
	});
	$("#winner").fadeOut(300, function() {
		$("#menu").fadeIn(300);
	});
});
