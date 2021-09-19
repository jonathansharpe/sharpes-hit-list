let game = {
	gameDay: "",
	gameMonth: "",
	gameYear: "",
	homeTeam: "",
	homeTeamRuns: "",
	roadTeamRuns: "",
	roadTeam: "",
	venue: "",
	boxscoreLink: "",
	gamenotes: ""
};
let gamesList = [];
let teams = [
	{
		teamClassName: "orioles",
		teamAbbr: "BAL",
		fullName: "Baltimore Orioles"
	},
	{
		teamClassName: "redsox",
		teamAbbr: "BOS",
		fullName: "Boston Red Sox"
	},
	{
		teamClassName: "yankees",
		teamAbbr: "NYA",
		fullName: "New York Yankees"
	},
	{
		teamClassName: "rays",
		teamAbbr: "TBA",
		fullName: "Tampa Bay Rays"
	},
	{
		teamClassName: "bluejays",
		teamAbbr: "TOR",
		fullName: "Toronto Blue Jays"
	},
	{
		teamClassName: "whitesox",
		teamAbbr: "CHA",
		fullName: "Chicago White Sox"
	},
	{
		teamClassName: "guardians",
		teamAbbr: "CLE",
		fullName: "Cleveland Guardians"
	},
	{
		teamClassName: "tigers",
		teamAbbr: "DET",
		fullName: "Detroit Tigers"
	},
	{
		teamClassName: "royals",
		teamAbbr: "KCA",
		fullName: "Kansas City Royals"
	},
	{
		teamClassName: "twins",
		teamAbbr: "MIN",
		fullName: "Minnesota Twins"
	},
	{
		teamClassName: "astros",
		teamAbbr: "HOU",
		fullName: "Houston Astros"
	},
	{
		teamClassName: "angels",
		teamAbbr: "ANA",
		fullName: "Los Angeles Angels"
	},
	{
		teamClassName: "athletics",
		teamAbbr: "OAK",
		fullName: "Oakland Athletics"
	},
	{
		teamClassName: "mariners",
		teamAbbr: "SEA",
		fullName: "Seattle Mariners"
	},
	{
		teamClassName: "rangers",
		teamAbbr: "TEX",
		fullName: "Texas Rangers"
	},
	{
		teamClassName: "braves",
		teamAbbr: "ATL",
		fullName: "Atlanta Braves"
	},
	{
		teamClassName: "marlins",
		teamAbbr: "MIA",
		fullName: "Miami Marlins"
	},
	{
		teamClassName: "mets",
		teamAbbr: "NYN",
		fullName: "New York Mets"
	},
	{
		teamClassName: "phillies",
		teamAbbr: "PHI",
		fullName: "Philadelphia Phillies"
	},
	{
		teamClassName: "nationals",
		teamAbbr: "WAS",
		fullName: "Washington Nationals"
	},
	{
		teamClassName: "cubs",
		teamAbbr: "CHN",
		fullName: "Chicago Cubs"
	},
	{
		teamClassName: "reds",
		teamAbbr: "CIN",
		fullName: "Cincinnati Reds"
	},
	{
		teamClassName: "brewers",
		teamAbbr: "MIL",
		fullName: "Milwaukee Brewers"
	},
	{
		teamClassName: "pirates",
		teamAbbr: "PIT",
		fullName: "Pittsburgh Pirates"
	},
	{
		teamClassName: "cardinals",
		teamAbbr: "SLN",
		fullName: "St. Louis Cardinals"
	},
	{
		teamClassName: "dbacks",
		teamAbbr: "ARI",
		fullName: "Arizona Diamondbacks"
	},
	{
		teamClassName: "rockies",
		teamAbbr: "COL",
		fullName: "Colorado Rockies"
	},
	{
		teamClassName: "dodgers",
		teamAbbr: "LAN",
		fullName: "Los Angeles Dodgers"
	},
	{
		teamClassName: "padres",
		teamAbbr: "SDN",
		fullName: "San Diego Padres"
	},
	{
		teamClassName: "giants",
		teamAbbr: "SFN",
		fullName: "San Francisco Giants"
	}
];

async function getGames() {
	const response = await fetch('../scripts/games.txt');
	await response.text().then(function (text) {
		let gamesTSV = text;
		// console.log(gamesTSV);
		let lines = gamesTSV.split("\t\n");
		// console.log(lines);
		let numLines = lines.length - 1;
		for (let i = 0; i < numLines; i++) {
			let line = lines[i];
			// console.log(line);
			let words = line.split("\t");
			let numWords = words.length;
			let currentGame = new Object();
			currentGame.gameMonth = words[0];
			currentGame.gameDay = words[1];
			currentGame.gameYear = words[2];
			currentGame.homeTeam = words[3];
			currentGame.homeTeamRuns = words[4];
			currentGame.roadTeam = words[5];
			currentGame.roadTeamRuns = words[6];
			currentGame.venue = words[7];
			currentGame.gamenotes = words[8];
			// console.log(currentGame.gamenotes);
			gamesList.push(currentGame);
		}
		console.log('this should show first!');
		// console.log(gamesList);
	});
	return;
}

async function gameBuilder() {
	await getGames();
	console.log('this should show second!');

	let output = "";
	for (let i = 0; i < gamesList.length; i++) {
		let currentGame = gamesList[i]; // assign the current array element to a variable
		// console.log(currentGame);
		let currentYear = currentGame.gameYear;
		if (document.getElementById('accordion'+currentYear) == null) {
			// create a new accordion list item, assign the 'accordion-item' class to it and add an id including the current year so it can be found easily later

		// the output here is replacing the previous output, so the single "=" is correct; it should NOT be "+="
			output = 
				"<div class='accordion-item bg-dark text-light' id='accordion" + currentYear + "'>\n" +
				"	<h2 class='accordion-header' id='header" + currentYear + "'></h2>\n" +
				"		<button class='accordion-button collapsed bg-dark text-light' type='button' data-bs-toggle='collapse' data-bs-target='#collapse" + currentYear + "' aria-expanded='false' aria-controls='collapse" + currentYear + "' data-bs-parent='#yearList'>" + currentYear + "</button>\n" +
				"		<div id='collapse" + currentYear + "' class='accordion-collapse collapse' aria-labelledby='header" + currentYear + "' data-bs-parent='#yearList'>\n" + 
				"			<div class='accordion-body' id='accordionbody" + currentYear + "'>\n" +
				"				<div class='card-group wrapper' id='cardgroup" + currentYear + "'>\n" +
				"				</div>\n" +
				"			</div>\n" +
				"		</div>\n" +
				"</div>\n";
			let currentYearList = document.getElementById('yearList');
			currentYearList.innerHTML += output;
		}
		let currentCardGroup = document.getElementById('cardgroup'+currentYear);
		console.log("the value of i is " + i);
		// the output here is replacing the previous output, so the single "=" is correct; it should NOT be "+="

		output = 
			"<div class='card bg-dark rounded border border-primary gamecard" + currentYear + "'>\n" +
			"	<h5 class='card-header text-center text-light'>";

		let currentDate = new Date(currentGame.gameYear, currentGame.gameMonth - 1, currentGame.gameDay);
		let currentMonth = currentDate.toLocaleString('default', {month: 'long'});
		let currentRoadTeamIndex = teams.findIndex(arrayItem => arrayItem.teamAbbr == currentGame.roadTeam);
		let currentRoadTeamAbbr = teams[currentRoadTeamIndex].teamAbbr;
		let currentRoadTeamClassName = teams[currentRoadTeamIndex].teamClassName;
		let currentRoadFullName = teams[currentRoadTeamIndex].fullName;

		let currentHomeTeamIndex = teams.findIndex(arrayItem => arrayItem.teamAbbr == currentGame.homeTeam);
		let currentHomeTeamAbbr = teams[currentHomeTeamIndex].teamAbbr;
		let currentHomeTeamClassName = teams[currentHomeTeamIndex].teamClassName;
		let currentHomeFullName = teams[currentHomeTeamIndex].fullName;
		output +=
			currentMonth + " " + currentGame.gameDay + " " + currentGame.gameYear + "</h5>";

		output +=
			"<img class='card-img-top rounded-0' src='../images/" + currentGame.venue + ".jpg' alt='" + currentGame.venue + "'>\n" + 
			"<ul class='list-group list-group-horizontal rounded border border-dark'>\n" +
			"	<li class='list-group-item text-center fs-5 " + currentRoadTeamClassName + "' style='width:80%;'>";
		if (currentRoadTeamAbbr == 'CLE' && currentYear < 2022) {
			currentRoadFullName = 'Cleveland Indians';
		}

		output +=
			currentRoadFullName + 
			"	</li>\n" +
			"	<li class='list-group-item text-center fs-5 " + currentRoadTeamClassName + "' style='width:20%;'>" + currentGame.roadTeamRuns+ "</li>\n" +
			"</ul>\n" +
			"<ul class='list-group list-group-horizontal rounded border border-dark'>\n" +
			"	<li class='list-group-item text-center fs-5 " + currentHomeTeamClassName + "' style='width:80%;'>" +
			currentHomeFullName +
			"	</li>\n" +
			"	<li class='list-group-item text-center fs-5 " + currentHomeTeamClassName + "' style='width:20%;'>" + currentGame.homeTeamRuns + "</li>\n" +
			"</ul>\n";
		
		output +=
			"<div class='card-body'>\n" +
				"<div id='offcanvas" + dateBuilder(currentGame.gameDay, currentGame.gameMonth, currentGame.gameYear) + "' class='offcanvas offcanvas-end bg-dark text-light' tabindex='-1' style='width: 35%;' aria-labelledby='offcanvasLabel" + dateBuilder(currentGame.gameYear, currentGame.gameMonth, currentGame.gameDay)+ "'>\n" +
			"<div class='offcanvas-header'>\n" +
			"	<h5 id='offcanvasLabel" + dateBuilder(currentGame.gameDay, currentGame.gameMonth, currentGame.gameYear) + "'>Game Notes</h5>\n" +
			"	<button class='btn-close text-reset' type='button' data-bs-dismiss='offcanvas' aria-label='Close'></button>\n" +
			"</div>\n" +
			"<div class='offcanvas-body' style='white-space: pre-wrap; text-align: justify;'>\n" +
			currentGame.gamenotes + "\n" +
			"</div>\n" + 
			"</div>\n";

		output += 
			"<div class='btn-group' role='group' aria-label='game" + dateBuilder(currentGame.gameDay, currentGame.gameMonth, currentGame.gameYear) + "' style='width:100%;'>\n" +
			"	<button class='btn btn-primary' type='button' data-bs-toggle='offcanvas' data-bs-target='#offcanvas" + dateBuilder(currentGame.gameDay, currentGame.gameMonth, currentGame.gameYear) + "' aria-controls='offcanvasRight'>Game Notes</button>\n" +
			"	<a class='btn btn-primary' href='" + linkBuilder(currentGame.gameDay, currentGame.gameMonth, currentGame.gameYear, currentGame.homeTeam) + "'>Boxscore</a>" +
			"</div>\n" +
			"</div>" +
			"</div>";

		currentCardGroup.innerHTML += output;


	}
}
function linkBuilder(gDay, gMonth, gYear, hTeam) {
	let currentDate = dateBuilder(gDay, gMonth, gYear);
	return "https://www.baseball-reference.com/boxes/" + hTeam + "/" + hTeam + currentDate +"0.shtml";
}
function dateBuilder(gameDay, gameMonth, gameYear) {
	return gameYear + gameMonth + gameDay;
}
async function teamsSeenList() {
	await getGames();
	console.log('this should show second!');
	let teamsTable = "";
	let numberOfTeams= 30;
	for (let i = 0; i < numberOfTeams; i++) {
		let currentTeamIndex = teams[i];
		if ((i % 5) == 0) {
			teamsTable +=
				'<div class="row m-0 p-0">\n';
		}

		teamsTable += 
			'	<div class="col p-0 m-0" style="min-width:200px">\n' +
			'		<button class="btn ' + currentTeamIndex.teamClassName + ' fs-4" style="width:100%; min-width: 200px;" type="button" data-bs-toggle="collapse" data-bs-target="#' + currentTeamIndex.teamClassName + 'btn" aria-expanded="false" aria-controls="' + currentTeamIndex.teamClassName + 'btn">\n' +
			'			' + currentTeamIndex.fullName + '\n' + 
			'		</button>\n' +
			'	</div>\n';

		if (((i + 1) % 5 == 0)) {
			console.log(i);
			teamsTable += 
				'</div>\n';
			teamsTable +=
				'<div class="row m-0 p-0">\n';
			for (let k = i - 4; k <= i; k++) {
				console.log(k);
				currentTeamIndex = teams[k];
				let currentTeamAbbr = currentTeamIndex.teamAbbr;
				console.log(currentTeamAbbr);
				teamsTable += 
					'<div class="collapse w-100 bg-dark text-light" id="' + currentTeamIndex.teamClassName + 'btn">\n' +
					'	<div class="card card-body bg-dark text-light">\n' +
					'		<table class="table table-bordered table-sm rounded text-center bg-dark text-light">\n' +
					'			<thead>\n' +
					'				<tr>\n' +
					'					<th scope="col">Date</th>\n' +
					'					<th scope="col">Opponent</th>\n' +
					'					<th scope="col">Park</th>\n' +
					'					<th scope="col">Boxscore</th>\n' +
					'				</tr>\n' +
					'			</thead>\n' +
					'			<tbody>\n';
				for (let j = 0; j < gamesList.length; j++) {
					let currentGame = gamesList[j];
					if (currentGame.homeTeam == currentTeamAbbr || currentGame.roadTeam == currentTeamAbbr) {
						let currentGame = gamesList[j];
						let currentDate = new Date(currentGame.gameYear, currentGame.gameMonth-1, currentGame.gameDay);
						let opponentAbbr = "";
						if (currentGame.homeTeam == currentTeamAbbr) {
							opponentAbbr = currentGame.roadTeam;
						}
						else {
							opponentAbbr = currentGame.homeTeam;
						}
						let opponentIndex = teams.findIndex(arrayItem => arrayItem.teamAbbr == opponentAbbr);

						let currentMonth = currentDate.toLocaleString('default', {month: 'long'});
						teamsTable += 
							'				<tr class="align-middle">\n' + 
							'					<td scope="row">' + currentMonth + ' ' + currentGame.gameDay +  ' ' + currentGame.gameYear + '</td>\n' +
							'					<td class="' + teams[opponentIndex].teamClassName + '">' + teams[opponentIndex].fullName + '</td>\n' +
							'					<td>' + currentGame.venue + '</td>\n' +
							'					<td>\n' +
							'						<a class="btn btn-primary" href="' + linkBuilder(currentGame.gameDay, currentGame.gameMonth, currentGame.gameYear, currentGame.homeTeam) + '">Boxscore</a>\n' +
							'					</td>\n' +
							'				</tr>\n';
					}
				}
				teamsTable +=
					'			</tbody>\n' +
					'		</table>\n' +
					'	</div>\n' +
					'</div>\n';

			}
			teamsTable += 
				'</div>\n';
		}
	}
	teamsTable +=
		'</div>';
	console.log(teamsTable);
	document.getElementById("teamCollapse").innerHTML = teamsTable;
	return;
}
