let gamesList = [];
const teamsList = [];
function importHeadModules() {
	$("head").append("<meta name='viewport' content='width=device-width, initial-scale=1'>\n");
	$("head").append("<link href='https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC' crossorigin='anonymous'>\n");
	$("head").append("<script src='https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js' integrity='sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM' crossorigin='anonymous'></script>\n");
	$("head").append("<link rel='stylesheet' type='text/css' href='styles/stylesheet.css'>\n");
	$("head").append("");
	return;
}
async function getTeams() {
	const response = await fetch('scripts/teams-list.txt');
	await response.text().then(function (text) {
		const teamsTXT = text;
		const lines = teamsTXT.split("\t\n");
		const numLines = lines.length - 1;
		for (let i = 0; i < numLines; i++) {
			const line = lines[i];
			const words = line.split("\t");
			let numWords = words.length;
			const currentTeam = new Object();
			currentTeam.fullName = words[0];
			currentTeam.teamAbbr = words[1];
			currentTeam.teamClassName = words[2];
			currentTeam.games = 0;
			teamsList.push(currentTeam);
		}
	});
	console.log(teamsList);
	return;
}
async function getGames() {
	const responseJSON = await fetch('scripts/games.json');
	await responseJSON.json().then(function (text){
		gamesList = text;
		// gamesList = gamesJSON
	});
	// ends the function, more of a formality than anything
	return;
}
// this function is where the entire list of games is generated. the function has to be asynchronous so it can use the await keyword, even though it essentially operates like a synchronous one.
async function gameBuilder() {
	// the "await" keyword forces an asynchronous function to finish before proceeding with the code. it's extremely important here since it makes sure the array is filled with the games before proceeding, otherwise the array will be empty when trying to write the HTML to the page
	await getGames();
	await getTeams();
	// console.log('this should show second!');

	// sets the output to an empty string, to ensure it's not null before it is used
	let output = "";
	// for loop that iterates through all the games in the array
	for (let i = 0; i < gamesList.length; i++) {
		const currentGame = gamesList[i]; // assign the current array element to a variable
		// console.log(currentGame);
		const currentYear = currentGame.year;
		// if (document.getElementById('accordion'+currentYear) == null) {
		let idName = "#accordion" + currentYear;
		if ($("#accordion" + currentYear).length == 0) {
			// this block creates the "shell" for a year if it doesn't yet exist. if there were a year with no games in it, this would be the HTML shown
			output = 
				"<div style='overflow: auto' class='accordion-item bg-dark text-light' id='accordion" + currentYear + "'>\n" +
				"	<h2 class='accordion-header' id='header" + currentYear + "'></h2>\n" +
				"		<button class='accordion-button collapsed bg-dark text-light' type='button' data-bs-toggle='collapse' data-bs-target='#collapse" + currentYear + "' aria-expanded='false' aria-controls='collapse" + currentYear + "' data-bs-parent='#yearList'>" + currentYear + "</button>\n" +
				"		<div style='overflow: auto' id='collapse" + currentYear + "' class='accordion-collapse collapse' aria-labelledby='header" + currentYear + "' data-bs-parent='#yearList'>\n" + 
				"			<div class='accordion-body' id='accordionbody" + currentYear + "'>\n" +
				"				<div style='min-width: 60em; overflow: auto' class='card-group wrapper' id='cardgroup" + currentYear + "'>\n" +
				"				</div>\n" +
				"			</div>\n" +
				"		</div>\n" +
				"</div>\n";
			// the next two lines append the generated HTML to the page, so it can then be found and added on to after this if statement ends
			// let currentYearList = document.getElementById('yearList');
			// currentYearList.innerHTML += output;
			$("#yearList").append(output)
			// the above line replaces the two lines above that :D
		}
		// this gets the card group of the current year, so the HTML can be added to it
		// the following line is no longer needed but i'm commenting it out for now
		// let currentCardGroup = document.getElementById('cardgroup'+currentYear);
		// console.log("the value of i is " + i);
		// the output here is replacing the previous output, so the single "=" is correct; it should NOT be "+="
		output = 
			"<div class='card bg-dark border border-primary gamecard" + currentYear + "'>\n" +
			"	<h5 style='height: 3em; line-height: 1em;' class='card-header text-center text-light'>";

		const currentDate = new Date(currentGame.year, currentGame.month - 1, currentGame.day);
		// console.log(currentDate);
		const currentMonth = currentDate.toLocaleString('default', {month: 'long'});
		const currentRoadTeamIndex = teamsList.findIndex(arrayItem => arrayItem.teamAbbr == currentGame.roadTeam);
		const currentRoadTeamAbbr = teamsList[currentRoadTeamIndex].teamAbbr;
		const currentRoadTeamClassName = teamsList[currentRoadTeamIndex].teamClassName;
		let currentRoadFullName = teamsList[currentRoadTeamIndex].fullName;

		const currentHomeTeamIndex = teamsList.findIndex(arrayItem => arrayItem.teamAbbr == currentGame.homeTeam);
		// the following variable is not currently used, it's mostly here in case it's needed in the future
		const currentHomeTeamAbbr = teamsList[currentHomeTeamIndex].teamAbbr;
		const currentHomeTeamClassName = teamsList[currentHomeTeamIndex].teamClassName;
		const currentHomeFullName = teamsList[currentHomeTeamIndex].fullName;
		const dateLinkFormat = currentDate.toLocaleString('default', {year: 'numeric'}) + currentDate.toLocaleString('default', {month: '2-digit'}) + currentDate.toLocaleString('default', {day: '2-digit'});
		// console.log(dateLinkFormat);
		output +=
			currentDate.toLocaleString('default', {month: 'long'}) + " " + currentDate.getDate() + " " + currentDate.getFullYear() + "</h5>";

		// this creates the element that houses the image of the venue, and creates the first part of the scoreboard
		output +=
			"<img class='card-img-top rounded-0' src='images/" + currentGame.venue + ".jpg' alt='" + currentGame.venue + "'>\n" + 
			"<table class='table table-borderless rounded'>\n" +
			"	<tr style='height: 4em;'>\n" +
			"		<th class='align-middle " + currentRoadTeamClassName + "'>"+ currentRoadFullName +"</th>\n";
			if (currentRoadTeamAbbr == 'CLE' && currentYear < 2022) {
				currentRoadFullName = 'Cleveland Indians';
			}
		output +=
			"		<th class='align-middle " + currentRoadTeamClassName + "'>"+ currentGame.roadTeamRuns +"</th>\n" +
			"	</tr>\n" +
			"	<tr style='height: 4em;'>\n" +
			"		<th class='align-middle " + currentHomeTeamClassName + "'>"+ currentHomeFullName +"</th>\n" +
			"		<th class='align-middle " + currentHomeTeamClassName + "'>"+ currentGame.homeTeamRuns +"</th>\n" +
			"	</tr>\n" +
			"</table>\n";
		
		// this block sets up the offcanvas. The constant use of the dateBuilder function ensures that all offcanvases are unique and that all the buttons point to the correct game notes
		output +=
			"<div class='card-body'>\n" +
				"<div id='offcanvas" + currentHomeTeamAbbr + currentDate.toLocaleString('default', {year: 'numeric'}) + currentDate.toLocaleString('default', {month: '2-digit'}) + currentDate.toLocaleString('default', {day: '2-digit'}) + "' class='offcanvas offcanvas-end bg-dark text-light' tabindex='-1' style='width: 35%;' aria-labelledby='offcanvasLabel" + dateBuilder(currentGame.gameYear, currentGame.gameMonth, currentGame.gameDay)+ "'>\n" +
			"<div class='offcanvas-header'>\n" +
			"	<h5 id='offcanvasLabel" + currentHomeTeamAbbr + currentDate.toLocaleString('default', {year: 'numeric'}) + currentDate.toLocaleString('default', {month: '2-digit'}) + currentDate.toLocaleString('default', {day: '2-digit'}) + "'>Game Notes</h5>\n" +
			"	<button class='btn-close text-reset' type='button' data-bs-dismiss='offcanvas' aria-label='Close'></button>\n" +
			"</div>\n" +
			"<div class='offcanvas-body' style='white-space: pre-wrap; text-align: justify;'>\n" +
			currentGame.notes + "\n" +
			"</div>\n" + 
			"</div>\n";

		// this final block generates the game notes offcanvas trigger button, and the link to the boxscore for the game. The final tags are there to of course close all divs before the HTML is appended to the page
		output += 
			"<div class='d-grid d-md-flex btn-group' role='group' aria-label='game" + currentDate.toLocaleString('default', {year: 'numeric'}) + currentDate.toLocaleString('default', {month: '2-digit'}) + currentDate.toLocaleString('default', {day: '2-digit'}) + "'>\n" +
			"	<button class='btn btn-primary btn-sm' type='button' data-bs-toggle='offcanvas' data-bs-target='#offcanvas" + currentHomeTeamAbbr + currentDate.toLocaleString('default', {year: 'numeric'}) + currentDate.toLocaleString('default', {month: '2-digit'}) + currentDate.toLocaleString('default', {day: '2-digit'}) + "' aria-controls='offcanvasRight'>Game Notes</button>\n" +
			"	<a class='btn btn-primary btn-sm' href='" + "https://www.baseball-reference.com/boxes/" + currentGame.homeTeam + "/" + currentGame.homeTeam + currentDate.toLocaleString('default', {year: 'numeric'}) + currentDate.toLocaleString('default', {month: '2-digit'}) + currentDate.toLocaleString('default', {day: '2-digit'}) + "0.shtml'>Boxscore</a>" +
			"</div>\n" +
			"</div>\n" +
			"</div>\n";
		// console.log("currentGame.day:" + currentGame.day);
		// console.log("currentGame.month:" + currentGame.month);
		// console.log("currentGame.year:" + currentGame.year);
		// console.log("currentGame.homeTeam:" + currentGame.homeTeam);

		$("#cardgroup"+currentYear).append(output)
		// currentCardGroup.innerHTML += output;
	}
}
// this function just builds the link for the boxscore; could probably just be build straight into the main code but this works fine too
/**
 * @param {any} gDay: the day object of the date, i.e. the 25 in May 25 2022
 * @param {any} gMonth: the month object of the date, i.e. the May in May 25 2022
 * @param {any} gYear: the year object of the date, i.e. the 2022 in May 25 2022
 * @param {any} hTeam: the home team for the current game
 * @returns {string}: returns the URL of the boxscore that goes into the button 
 */
function linkBuilder(gDay, gMonth, gYear, hTeam) {
	const currentDate = dateBuilder(gDay, gMonth, gYear);
	return "https://www.baseball-reference.com/boxes/" + hTeam + "/" + hTeam + currentDate +"0.shtml";
}
// this just formats the date correctly
/**
 * @param {any} gameDay 
 * @param {any} gameMonth 
 * @param {any} gameYear 
 * @returns {} 
 */
function dateBuilder(gameDay, gameMonth, gameYear) {
	gameDay += '';
	gameMonth += '';
	gameYear += '';
	return gameYear + gameMonth + gameDay;
}
/**this function generates the list of games I've seen for each team. this function is asynchronous for the same reasons as the gameBuilder function
 * @returns {void} 
 */
async function teamsSeenList() {
	// await makes sure getGames has finished before proceeding
	await getGames();
	await getTeams();
	// console.log('this should show second!');
	// the teamsTable variable is really just an output
	let teamsTable = "";
	// just sets the length of the teams array to the numberOfTeams variable for easier use I guess
	const numberOfTeams = teamsList.length;
	for (let i = 0; i < numberOfTeams; i++) {
		let currentTeamIndex = teamsList[i];
		// this if statement creates a new row of teams, based on the fact that there should only be 5 teams in each row, which is exactly one division per row
		if ((i % 5) == 0) {
			teamsTable +=
				'<div class="row m-0 p-0">\n';
		}

		// this block creates the button for the team
		teamsTable += 
			'	<div class="container-fluid col p-0 m-0" style="min-width:200px">\n' +
			'		<button class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between btn ' + currentTeamIndex.teamClassName + ' fs-5" style="width:100%; min-width: 200px;" type="button" data-bs-toggle="collapse" data-bs-target="#' + currentTeamIndex.teamClassName + 'btn" aria-expanded="false" aria-controls="' + currentTeamIndex.teamClassName + 'btn">\n' +
			'			' + '<span class="float-start" style="font-family: inherit">' + currentTeamIndex.fullName + '</span>\n' + 
			'		</button>\n' +
			'	</div>\n';

		if (((i + 1) % 5 == 0)) {
			teamsTable += 
				'</div>\n';
			teamsTable +=
				'<div class="row m-0 p-0">\n';
			for (let k = i - 4; k <= i; k++) {
				//console.log(k);
				currentTeamIndex = teamsList[k];
				const currentTeamAbbr = currentTeamIndex.teamAbbr;
				console.log(currentTeamAbbr);
				teamsTable += 
					'<div class="collapse w-100 bg-dark text-light" id="' + currentTeamIndex.teamClassName + 'btn">\n' +
					'	<div class="card card-body bg-dark text-light">\n' +
					'		<table class="table table-sm rounded text-center table-dark table-borderless text-light" id="' + currentTeamIndex.teamClassName + 'table">\n' +
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
					const currentGame = gamesList[j];
					console.log("gamesList: {" + gamesList + "}");
					if (currentGame.homeTeam == currentTeamAbbr || currentGame.roadTeam == currentTeamAbbr) {
						console.log("currentGame: {" + currentGame + "}");
						const currentDate = new Date(currentGame.gameYear, currentGame.gameMonth-1, currentGame.gameDay);
						console.log("currentDate: {" + currentDate + "}");
						let opponentAbbr = "";
						if (currentGame.homeTeam == currentTeamAbbr) {
							opponentAbbr = currentGame.roadTeam;
						}
						else {
							opponentAbbr = currentGame.homeTeam;
						}
						const opponentIndex = teamsList.findIndex(arrayItem => arrayItem.teamAbbr == opponentAbbr);
						console.log("opponentIndex: " + opponentIndex);

						const currentMonth = currentDate.toLocaleString('default', {month: 'long'});
						teamsTable += 
							'				<tr class="align-middle">\n' + 
							'					<td scope="row">' + currentMonth + ' ' + currentGame.gameDay +  ' ' + currentGame.gameYear + '</td>\n' +
							'					<td class="' + teamsList[opponentIndex].teamClassName + '">' + teamsList[opponentIndex].fullName + '</td>\n' +
							'					<td>' + currentGame.venue + '</td>\n' +
							'					<td>\n' +
							'						<a class="btn btn-primary" href="' + linkBuilder(currentGame.gameDay, currentGame.gameMonth, currentGame.gameYear, currentGame.homeTeam) + '">Boxscore</a>\n' +
							'					</td>\n' +
							'				</tr>\n';
						teamsList[k].games++;
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
	$("#teamCollapse").html(teamsTable);
	// document.getElementById("teamCollapse").innerHTML = teamsTable;
	for (let i = 0; i < teamsList.length; i++) {
		console.log(teamsList[i].games);
		$("button").eq(i+1).append('<span class="badge bg-primary" style="color: white; -webkit-text-stroke-color: initial;">' + teamsList[i].games + '</span>')
		// let currentButton = document.getElementsByTagName("button")[i+1];
		// currentButton.innerHTML += '<span class="badge bg-primary" style="color: white; -webkit-text-stroke-color: initial;">' + teamsList[i].games + '</span>';
	}

	return;
}
function buildNavbar() {
	let output = 
		"<nav class='navbar navbar-expand-lg navbar-dark bg-secondary rounded'>\n" +
		"	<div class='container-fluid'>\n" +
		"		<button class='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarCollapse' aria-controls='navbarCollapse' aria-expanded='false' aria-label='Toggle navigation'>\n" +
		"			<span class='navbar-toggler-icon'></span>\n"+
		"		</button>\n" +
		"		<div class='collapse navbar-collapse' id='navbarCollapse'>\n" +
		"			<ul class='navbar-nav me-auto mb-2 mb-lg-0'>\n" +
		"				<li class='nav-item'>\n" +
		"					<a class='nav-link' href='index.html'>Home Page</a>\n" +
		"				</li>\n" +
		"				<li class='nav-item'>\n" +
		"					<a class='nav-link' href='games-attended.html'>Games Attended</a>\n" +
		"				</li>\n" +
		// "				<li class='nav-item'>\n" +
		// "					<a class='nav-link' href='#'>Sections Sat In</a>\n" +
		// "				</li>\n" +
		"				<li class='nav-item dropdown'>\n" +
		"					<a class='nav-link dropdown-toggle' href='#' id='navbarDropdown' role='button' data-bs-toggle='dropdown' aria-expanded='false'>Ballparks</a>\n" +
		"					<ul class='dropdown-menu' aria-labelledby='navbarDropdown'>\n" +
		"						<li><a class='dropdown-item' href='angelstadium.html'>Angel Stadium</a></li>\n" +
		"						<li><a class='dropdown-item' href='dodgerstadium.html'>Dodger Stadium</a></li>\n" +
		"						<li><a class='dropdown-item' href='fenwaypark.html'>Fenway Park</a></li>\n" +
		"						<li><a class='dropdown-item' href='guaranteedratefield.html'>Guaranteed Rate Field</a></li>\n" +
		"						<li><a class='dropdown-item' href='kauffmanstadium.html'>Kauffman Stadium</a></li>\n" +
		"						<li><a class='dropdown-item' href='oaklandcoliseum.html'>Oakland Coliseum</a></li>\n" +
		"						<li><a class='dropdown-item' href='oraclepark.html'>Oracle Park</a></li>\n" +
		"						<li><a class='dropdown-item' href='petcopark.html'>PETCO Park</a></li>\n" +
		"						<li><a class='dropdown-item' href='tmobilepark.html'>T-Mobile Park</a></li>\n" +
		"						<li><a class='dropdown-item' href='targetfield.html'>Target Field</a></li>\n" +
		"						<li><a class='dropdown-item' href='wrigleyfield.html'>Wrigley Field</a></li>\n" +
		"						<li><a class='dropdown-item' href='yankeestadium.html'>Yankee Stadium II</a></li>\n" +
		"					</ul>\n"+
		"				</li>\n" +
		"				<li class='nav-item'>\n" +
		"					<a class='nav-link' href='tier-list.html'>Tier List</a>\n" +
		"				</li>\n" +
		"				<li class='nav-item'>\n" +
		"					<a class='nav-link' href='teams-seen.html'>Teams Seen</a>\n" +
		"				</li>\n" +
		"				<li class='nav-item'>\n" +
		"					<a class='nav-link' href='about.html'>About</a>\n" +
		"				</li>\n" +
		"			</ul>\n" +
		"		</div>\n" +
		"	</div>\n" +
		"</nav>\n";
	$("#teamNavbar").html(output);
	return;
}
