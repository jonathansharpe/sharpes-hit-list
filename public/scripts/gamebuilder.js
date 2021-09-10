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
        teamClassName: "guardians",
        teamAbbr: "CLE",
        fullName: "Cleveland Indians"
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
    const response = await fetch('../scripts/games.tsv');
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

    // console.log(gamesList);
    // console.log(gamesList.length);
    let totalGames;
    for (let i = 0; i < gamesList.length; i++) {
        let currentGame = gamesList[i]; // assign the current array element to a variable
        // console.log(currentGame);
        let currentYear = currentGame.gameYear;
        if (document.getElementById('accordion'+currentYear) == null) {

            // create a new accordion list item, assign the 'accordion-item' class to it and add an id including the current year so it can be found easily later
            let newAccordionListItem = document.createElement('div');
            newAccordionListItem.classList.add('accordion-item');
            newAccordionListItem.id = 'accordion' + currentYear;

            // create a new h2 element for the header, add the 'accordion-header' class to it and set an id including the current year
            let newHeader = document.createElement('h2');
            newHeader.classList.add('accordion-header');
            newHeader.id = 'header' + currentYear;

            // create a new button element, and add all the things to it so bootstrap can recognize it and so it works as an accordion
            let newButton = document.createElement('button');
            newButton.classList.add('accordion-button');
            newButton.classList.add('collapsed');
            newButton.type = 'button';

            let dataBsToggle = document.createAttribute('data-bs-toggle');
            dataBsToggle.value = 'collapse';
            newButton.setAttributeNode(dataBsToggle);

            let dataBsTarget = document.createAttribute('data-bs-target');
            dataBsTarget.value = '#collapse' + currentYear;
            newButton.setAttributeNode(dataBsTarget);

            let ariaExpanded = document.createAttribute('aria-expanded');
            ariaExpanded.value = 'false';
            newButton.setAttributeNode(ariaExpanded);
            
            let ariaControls = document.createAttribute('aria-controls');
            ariaControls.value = 'collapse' + currentYear;
            newButton.setAttributeNode(ariaControls);

            newButton.innerHTML = currentYear;
            
            // add the button to the header
            newHeader.appendChild(newButton);

            // create a new div to hold the data for the games
            let newCollapseData = document.createElement('div');
            newCollapseData.id = 'collapse' + currentYear;
            newCollapseData.classList.add('accordion-collapse');
            newCollapseData.classList.add('collapse');

            let ariaLabelledBy = document.createAttribute('aria-labelledby');
            ariaLabelledBy.value = 'header' + currentYear;
            newCollapseData.setAttributeNode(ariaLabelledBy);
            
            let dataBsParent = document.createAttribute('data-bs-parent');
            dataBsParent.value = '#yearList';
            newCollapseData.setAttributeNode(dataBsParent);

            let newAccordionBody = document.createElement('div');
            newAccordionBody.classList.add('accordion-body');
            newAccordionBody.id = 'accordionbody' + currentYear;

            newCollapseData.appendChild(newAccordionBody);
            newAccordionListItem.appendChild(newHeader);
            newAccordionListItem.appendChild(newCollapseData);

            document.getElementById("yearList").appendChild(newAccordionListItem);
        }
        let currentBody = document.getElementById('accordionbody'+currentYear);
        
        if (document.getElementById('cardgroup'+currentYear) == null) {
            let newCardGroup = document.createElement('div');
            newCardGroup.classList.add('card-group');
            newCardGroup.classList.add('wrapper');
            newCardGroup.id = ('cardgroup' + currentYear);
            currentBody.appendChild(newCardGroup);
        }
        let currentCardGroup = document.getElementById('cardgroup'+currentYear);
        let newCard = document.createElement('div');
        newCard.classList.add('card');
        newCard.classList.add('bg-light');
        newCard.classList.add('rounded');
        newCard.classList.add('border');
        newCard.classList.add('gamecard'+currentYear);
        
        let newCardHeader = document.createElement('h5');
        newCardHeader.classList.add('card-header');
        newCardHeader.classList.add('text-center');
        let currentDate = new Date(currentGame.gameYear, currentGame.gameMonth-1, currentGame.gameDay);
        let currentMonth = currentDate.toLocaleString('default', {month: 'long'});
        newCardHeader.innerHTML = currentMonth + ' ' + currentGame.gameDay + ' ' + currentGame.gameYear;
        newCard.appendChild(newCardHeader);

        let venueImage = document.createElement('img');
        venueImage.classList.add('card-img-top');
        venueImage.classList.add('rounded-0');
        venueImage.src = '../images/' + currentGame.venue + '.jpg';
        venueImage.alt = currentGame.venue;
        
        newCard.appendChild(venueImage);
        
        newCard.appendChild(scoreboardBuilder(currentGame.roadTeam, currentGame.roadTeamRuns));
        newCard.appendChild(scoreboardBuilder(currentGame.homeTeam, currentGame.homeTeamRuns));

        let newCardBody = document.createElement('div');
        newCardBody.classList.add('card-body');

        let newOffCanvasButton= document.createElement('button');
        newOffCanvasButton.classList.add('btn');
        newOffCanvasButton.classList.add('btn-primary');
        newOffCanvasButton.type = 'button';

        let offCanvasDataBsToggle = document.createAttribute('data-bs-toggle');

        offCanvasDataBsToggle.value = 'offcanvas';
        newOffCanvasButton.setAttributeNode(offCanvasDataBsToggle);

        let offCanvasDataBsTarget = document.createAttribute('data-bs-target');

        offCanvasDataBsTarget.value = '#offcanvas' + dateBuilder(currentGame.gameDay, currentGame.gameMonth, currentGame.gameYear);
        newOffCanvasButton.setAttributeNode(offCanvasDataBsTarget);
        
        let offCanvasAriaControls = document.createAttribute('aria-controls');
        offCanvasAriaControls.value = 'offcanvasRight';
        newOffCanvasButton.setAttributeNode(offCanvasAriaControls);

        newOffCanvasButton.innerHTML = 'Game notes';

        let offCanvasDiv = document.createElement('div');
        offCanvasDiv.classList.add('offcanvas');
        offCanvasDiv.classList.add('offcanvas-end');
        let tabIndex = document.createAttribute('tabindex');
        tabIndex.value = '-1';
        offCanvasDiv.setAttributeNode(tabIndex);
        offCanvasDiv.style.width = '35%';

        offCanvasDiv.id = 'offcanvas' + dateBuilder(currentGame.gameDay, currentGame.gameMonth, currentGame.gameYear);

        let offCanvasAriaLabelledBy = document.createAttribute('aria-labelledby');
        offCanvasAriaLabelledBy.value = 'offcanvasLabel' + dateBuilder(currentGame.gameDay, currentGame.gameMonth, currentGame.gameYear);
        offCanvasDiv.setAttributeNode(offCanvasAriaLabelledBy);

        let offCanvasHeaderDiv = document.createElement('div');
        offCanvasHeaderDiv.classList.add('offcanvas-header');

        let offCanvasHeader = document.createElement('h5');
        offCanvasHeader.id = offCanvasAriaLabelledBy.value; 
        offCanvasHeader.innerHTML = "Game Notes";

        let closeButton = document.createElement('button');
        closeButton.type = 'button';
        closeButton.classList.add('btn-close');
        closeButton.classList.add('text-reset');

        let dataBsDismiss = document.createAttribute('data-bs-dismiss');
        dataBsDismiss.value = offCanvasDataBsToggle.value;
        closeButton.setAttributeNode(dataBsDismiss);

        let offCanvasAriaLabel = document.createAttribute('aria-label');
        offCanvasAriaLabel.value = 'Close';
        closeButton.setAttributeNode(offCanvasAriaLabel);

        offCanvasHeaderDiv.appendChild(offCanvasHeader);
        offCanvasHeaderDiv.appendChild(closeButton);

        let offCanvasBody = document.createElement('div');
        offCanvasBody.classList.add('offcanvas-body');
        offCanvasBody.innerHTML = currentGame.gamenotes;
        offCanvasBody.style.whiteSpace = 'pre-wrap';
        offCanvasBody.style.textAlign = 'justify';

        // newCardBody.appendChild(newOffCanvasButton);
        offCanvasDiv.appendChild(offCanvasHeaderDiv);
        offCanvasDiv.appendChild(offCanvasBody);
        newCardBody.appendChild(offCanvasDiv);

        let newButtonGroup = document.createElement('div');
        newButtonGroup.classList.add('btn-group');
        let buttonGroupRole = document.createAttribute('role');
        buttonGroupRole.value = 'group';
        newButtonGroup.setAttributeNode(buttonGroupRole);
        let buttonGroupAriaLabel = document.createAttribute('aria-label');
        buttonGroupAriaLabel.value = 'game' + dateBuilder(currentGame.gameDay, currentGame.gameMonth, currentGame.gameYear);
        newButtonGroup.setAttributeNode(buttonGroupAriaLabel);
        newButtonGroup.style.width = '100%';

        // let newCardParagraph = document.createElement('p');
        // newCardParagraph.classList.add('card-text');
        // newCardParagraph.innerHTML = currentGame.gamenotes;

        let newCardLink = document.createElement('a');
        let currentTeamIndex = teams.findIndex(arrayItem => arrayItem.fullName == currentGame.homeTeam);
        let currentTeamAbbr = teams[currentTeamIndex].teamAbbr
        newCardLink.href = linkBuilder(currentGame.gameDay, currentGame.gameMonth, currentGame.gameYear, currentTeamAbbr);
        newCardLink.classList.add('btn');
        newCardLink.classList.add('btn-primary');
        newCardLink.innerHTML = 'Boxscore';

        // newCardBody.appendChild(newCardParagraph);
        newButtonGroup.appendChild(newOffCanvasButton);
        newButtonGroup.appendChild(newCardLink);
        newCardBody.appendChild(newButtonGroup);
        newCard.appendChild(newCardBody);

        currentCardGroup.appendChild(newCard);
    }
}

// console.log(teams);
function linkBuilder(gDay, gMonth, gYear, hTeam) {
    let currentDate = dateBuilder(gDay, gMonth, gYear);
    
    return "https://www.baseball-reference.com/boxes/" + hTeam + "/" + hTeam + currentDate +"0.shtml";
}
function dateBuilder(gameDay, gameMonth, gameYear) {
    return gameYear + gameMonth + gameDay;
}
function scoreboardBuilder(team, runs) {
    let newList = document.createElement('ul');
    newList.classList.add('list-group');
    newList.classList.add('list-group-horizontal');
    newList.classList.add('rounded');
    newList.classList.add('border');

    let currentTeamIndex = teams.findIndex(arrayItem => arrayItem.fullName == team);
    let currentTeamAbbr = teams[currentTeamIndex].teamAbbr;
    let currentTeamClassName = teams[currentTeamIndex].teamClassName;
    let currentFullName = teams[currentTeamIndex].fullName;
    // console.log(currentFullName);

    let isTeam = true;
    for (let i = 0; i < 2; i++) {
        let newListItem = document.createElement('li');
        newListItem.classList.add('list-group-item')
        newListItem.classList.add('text-center');
        newListItem.classList.add('fs-5');
        newListItem.classList.add(currentTeamClassName);
        if (isTeam) {
            newListItem.style.width = '80%';
            newListItem.innerHTML = currentFullName; 
            isTeam = false;
        }
        else {
            newListItem.style.width = '20%';
            newListItem.innerHTML = runs;
        }
        // console.log(newList.innerHTML);
        newList.appendChild(newListItem);
    }
    return newList;
}
