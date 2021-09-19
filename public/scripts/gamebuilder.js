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
		// gets the response in the form of text so it can be parsed
		let gamesTSV = text;
		// splits the file by game
		let lines = gamesTSV.split("\t\n");
		
		let numLines = lines.length - 1;
		// for loop that iterates through the split up file
		for (let i = 0; i < numLines; i++) {
			let line = lines[i];
			// console.log(line);
			let words = line.split("\t");
			let numWords = words.length;
			let currentGame = new Object();
			// the next 8 lines assign the parts of the line to their respective values in the currentGame object
			currentGame.gameMonth = words[0];
			currentGame.gameDay = words[1];
			currentGame.gameYear = words[2];
			currentGame.homeTeam = words[3];
			currentGame.homeTeamRuns = words[4];
			currentGame.roadTeam = words[5];
			currentGame.roadTeamRuns = words[6];
			currentGame.venue = words[7];
			currentGame.gamenotes = words[8];
			// adds the currentGame to the array
			gamesList.push(currentGame);
		}
		// console.log('this should show first!');
		// console.log(gamesList);
	});
	// ends the function, more of a formality than anything
	return;
}
// this function is where the entire list of games is generated. the function has to be asynchronus so it can use the await keywoard, even though it essentially operates like a synchronus one.
async function gameBuilder() {
	// the "await" keyword forces an asynchronus function to finish before proceeding with the code. it's extremely important here since it makes sure the array is filled with the games before proceeding, otherwise the array will be empty when trying to write the HTML to the page
	await getGames();
	// console.log('this should show second!');

	// sets the output to an empty string, to ensure it's not null before it is used
	let output = "";
	// for loop that iterates through all the games in the array
	for (let i = 0; i < gamesList.length; i++) {
		let currentGame = gamesList[i]; // assign the current array element to a variable
		// console.log(currentGame);
		let currentYear = currentGame.gameYear;
		if (document.getElementById('accordion'+currentYear) == null) {
			// this block creates the "shell" for a year if it doesn't yet exist. if there were a year with no games in it, this would be the html shown
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
			// the next two lines append the generated html to the page, so it can then be found and added on to after this if statement ends
			let currentYearList = document.getElementById('yearList');
			currentYearList.innerHTML += output;
		}
		// this gets the card group of the current year, so the HTML can be added to it
		let currentCardGroup = document.getElementById('cardgroup'+currentYear);
		// console.log("the value of i is " + i);
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
		// the following variable is not currently used, it's mostly here in case it's needed in the future
		let currentHomeTeamAbbr = teams[currentHomeTeamIndex].teamAbbr;
		let currentHomeTeamClassName = teams[currentHomeTeamIndex].teamClassName;
		let currentHomeFullName = teams[currentHomeTeamIndex].fullName;
		output +=
			currentMonth + " " + currentGame.gameDay + " " + currentGame.gameYear + "</h5>";

		// this creates the element that houses the image of the venue, and creates the first part of the scoreboard
		output +=
			"<img class='card-img-top rounded-0' src='../images/" + currentGame.venue + ".jpg' alt='" + currentGame.venue + "'>\n" + 
			"<ul class='list-group list-group-horizontal rounded border border-dark'>\n" +
			"	<li class='list-group-item text-center fs-5 " + currentRoadTeamClassName + "' style='width:80%;'>";
		if (currentRoadTeamAbbr == 'CLE' && currentYear < 2022) {
			currentRoadFullName = 'Cleveland Indians';
		}

		// this next block finishes the scoreboard
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
		
		// this block sets up the offcanvas. the constant use of the dateBuilder function ensures that all offcanvases are unique and that all the buttons point to the correct game notes
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

		// this final block generates the game notes offcanvas trigger button, and the link to the boxscore for the game. the final tags are there to of course close all divs before the HTML is appended to the page
		output += 
			"<div class='btn-group' role='group' aria-label='game" + dateBuilder(currentGame.gameDay, currentGame.gameMonth, currentGame.gameYear) + "' style='width:100%;'>\n" +
			"	<button class='btn btn-primary' type='button' data-bs-toggle='offcanvas' data-bs-target='#offcanvas" + dateBuilder(currentGame.gameDay, currentGame.gameMonth, currentGame.gameYear) + "' aria-controls='offcanvasRight'>Game Notes</button>\n" +
			"	<a class='btn btn-primary' href='" + linkBuilder(currentGame.gameDay, currentGame.gameMonth, currentGame.gameYear, currentGame.homeTeam) + "'>Boxscore</a>" +
			"</div>\n" +
			"</div>\n" +
			"</div>\n";

		currentCardGroup.innerHTML += output;
	}
}
// this function just builds the link for the boxscore; could probably just be build straight into the main code but this works fine too
function linkBuilder(gDay, gMonth, gYear, hTeam) {
	let currentDate = dateBuilder(gDay, gMonth, gYear);
	return "https://www.baseball-reference.com/boxes/" + hTeam + "/" + hTeam + currentDate +"0.shtml";
}
// this just formats the date correctly
function dateBuilder(gameDay, gameMonth, gameYear) {
	return gameYear + gameMonth + gameDay;
}
// this function generates the list of games I've seen for each team. this function is asynchronus for the same reasons as the gameBuilder function
async function teamsSeenList() {
	// await makes sure getGames has finished before proceeding
	await getGames();
	// console.log('this should show second!');
	// the teamsTable variable is really just an output
	let teamsTable = "";
	// just sets the length of the teams array to the numberOfTeams variable for easier use I guess
	let numberOfTeams = teams.length;
	for (let i = 0; i < numberOfTeams; i++) {
		let currentTeamIndex = teams[i];
		// this if statement creates a new row of teams, based on the fact that there should only be 5 teams in each row, which is exactly one division per row
		if ((i % 5) == 0) {
			teamsTable +=
				'<div class="row m-0 p-0">\n';
		}

		// this block creates the button for the team
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
					'		<table class="table table-bordered border-primary table-sm rounded text-center bg-dark text-light">\n' +
					'			<thead>\n' +
					'				<tr>\n' +
					'					<th scope="col" style="width: 25%;">Date</th>\n' +
					'					<th scope="col" style="width: 25%;">Opponent</th>\n' +
					'					<th scope="col" style="width: 25%;">Park</th>\n' +
					'					<th scope="col" style="width: 25%;">Boxscore</th>\n' +
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
