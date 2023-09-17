require('dotenv').config();
const http = require('http');
const fs = require('fs');
const {MongoClient, ServerApiVersion} = require('mongodb');
const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 5000;
const express = require('express');

// console.log("uri:",uri);

const path = require('path');
const app = express();
console.log(__dirname + '/');
app.use(express.static('public'));
app.use(express.json());
app.use('/styles', express.static(__dirname + 'public/styles'));
app.use('/scripts', express.static(__dirname + 'public/scripts'));

const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	}
});

async function run() {
	try {
		await client.connect();

		await client.db("admin").command({ping:1});
		console.log("Pinged your deployment. You successfully connected to MongoDB.");
	} finally {
		await client.close();
	}
}
run().catch(console.dir);

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
