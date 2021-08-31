let game = {
    gameDate: "",
    homeTeam: "",
    roadTeam: "",
    venue: "",
    boxscoreLink: "",
}
let gamesList[];
function gameBuilder() {

}

import data from '../scripts/games.json';
console.log(data);
function linkBuilder(gDate, hTeam) {
    return "https://www.baseball-reference.com/boxes/" + hTeam + "/" + hTeam + gDate +"0.shtml";
}
function dateBuilder(gameDay, gameMonth, gameYear) {
    return gameYear + gameMonth + gameDay;
}
