const http = require('http');
const fs = require('fs');
const port = process.env.PORT || 5000;

var express = require('express');
var path = require('path');
var app = express();
console.log(__dirname + '/');
app.use(express.static('public'));
app.use('/styles', express.static(__dirname + 'public/styles'));
app.use('/scripts', express.static(__dirname + 'public/scripts'));

app.get('', (req, res) => {
    res.sendFile(__dirname + '/public/pages/index.html');
});
app.get('/games-attended', function(req, res) {
    res.sendFile(__dirname + '/public/pages/games-attended.html');
});
app.get('/teams-seen', function(req, res) {
    res.sendFile(__dirname + '/public/pages/teams-seen.html');
});
app.get('/about', function(req, res) {
    res.sendFile(__dirname + '/public/pages/about.html');
});
app.get('/tmobilepark', function(req, res){
	res.sendFile(__dirname + '/public/pages/tmobilepark.html');
});
app.get('/empirical-project', function(req, res){
	res.sendFile(__dirname + '/public/pages/empirical-project.html');
});
/*
const server = http.createServer((request, response) => {
    response.writeHead(200, {'content-type': 'text/html'});
    fs.createReadStream('/pages/index.html').pipe(response);

});
server.listen(port, (err) => {
  if (err) {
    return console.log("Something went wrong");
  }
  console.log(`Server listening on ${port}`);
});
*/

console.log(__dirname + '/public/pages/index.html');
app.listen(port, () => console.info(`Listening on port ${port}`));
