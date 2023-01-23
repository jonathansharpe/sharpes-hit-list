const http = require('http');
const fs = require('fs');
const port = process.env.PORT || 5000;

let express = require('express');
let path = require('path');
let app = express();
console.log(__dirname + '/');
app.use(express.static('public'));
app.use('/styles', express.static(__dirname + 'public/styles'));
app.use('/scripts', express.static(__dirname + 'public/scripts'));

app.get('', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
let currentPage;
app.get('/:pageId', function(req, res) {
	req.params;
	res.sendFile(__dirname + "/public/pages/" + req.params.pageId + ".html", (err) => {
		if (err) {
			res.sendFile(__dirname + "/public/404.html");
		}
	});
	// console.log("code reached");
});

console.log(__dirname + '/public/index.html');
app.listen(port, () => console.info(`Listening on port ${port}`));
