<!DOCTYPE html>

<html lang="EN">
<head>
	<title id="title"></title>
	<meta charset="UTF-8">

	<script type="text/javascript" src="./bin/jquery.js"></script>
	<script type="text/javascript" src="./bin/update.js"></script>

	<!--<link href='https://fonts.googleapis.com/css?family=Montserrat|Gloria+Hallelujah|Rock+Salt' rel='stylesheet' type='text/css'>-->
	<link rel="stylesheet" href="./bin/font-awesome/css/font-awesome.min.css">
</head>
<body>
	<div id="overlay"></div>
	<canvas id="canvas"></canvas>

	<div id="changelog">
		<button class="close" title="Close log"><i class='fa fa-times fa-2x'></i></button>
		<h1>Changelog</h1>

		<div id="log"></div>
	</div>

	<div id="settings">
		<button class="close" title="Close settings"><i class='fa fa-times fa-2x'></i></button>
		<h1>Settings</h1>

		<label>
			<input type="checkbox" class="option" id="useGaps" checked>
			<span>Create gaps</span>
		</label>

		<label>
			<input type="radio" name="map" class="option" id="map" value="empty" checked>
			<span>Empty</span>
		</label>

		<label>
			<input type="radio" name="map" class="option" id="map" value="wall">
			<span>Wall</span>
		</label>

		<label>
			<input type="radio" name="map" class="option" id="map" value="map3">
			<span>Map 3</span>
		</label>

		<label>
			<input type="radio" name="map" class="option" id="map"  value="map4">
			<span>Map 4</span>
		</label>
	</div>

	<div id="startscreen">
		<h1 class="noSelect"></h1>
		<span id="enterGame" class="noSelect">Enter game</span>

		<div id="credits" class="noSelect">
			<h2>Game credits</h2>
			<marquee direction="up" scrollamount="3">
				<div>
					<h3>Game development</h3>
					<p>Kristoffer Lindström</p>
				</div>

				<div>
					<h3>Programming</h3>
					<p>Kristoffer Lindström</p>
					<p>Nicklas Hedlund</p>
				</div>

				<div>
					<h3>Design</h3>
					<p><span>Lukas Lindberg</span></p>
					<p>Kristoffer Lindström</p>
				</div>
			</marquee>
		</div>

		<span id="version"></span>
		<span id="openChangelog" class="noSelect"><i class="fa fa-history"></i> View the changelog</span>
		<span id="settingsBtn" class="noSelect"><i class="fa fa-cogs"></i> Settings</span>
	</div>

	<div id="scorboard">
		<h1 class="noSelect">Score</h1>
		<span id="maxPoints" class="noSelect"></span>
		<ul id="playerlist"></ul>
	</div>

	<div id="menu" class="noSelect">
		<h1 class="noSelect">MENU</h1>

		<div class="boxPlayer noSelect"><i class="fa fa-user-plus fa-3x"></i></div>
		<div class="boxPlayer noSelect"></div>
		<div class="boxPlayer noSelect"></div>
		<div class="boxPlayer noSelect"></div>
		<div class="boxPlayer noSelect"></div>
		<div class="boxPlayer noSelect"></div>

		<span id="startbtn" class="noSelect">Play</span>
	</div>

	<div id="winner">
		<div id="first">#1</div>
		<div id="second">#2</div>
		<div id="third">#3</div>
		<span id="restart" class="noSelect">Main menu</span>
	</div>

	<script type="text/javascript" src="./bin/handlers.js"></script>
	<script type="text/javascript" src="./etc/players.js"></script>
</body>
</html>