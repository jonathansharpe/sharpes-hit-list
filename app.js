const http = require('http');
const fs = require('fs');
const port = process.env.PORT || 5000;

const server = http.createServer((request, response) => {
    response.writeHead(200, {'content-type': 'text/html'});
    fs.createReadStream('public/pages/index.html').pipe(response);
});

server.listen(port, (err) => {
  if (err) {
    return console.log("Something went wrong");
  }
  console.log(`Server listening on ${port}`);
});
