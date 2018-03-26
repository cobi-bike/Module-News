// init project
var express = require('express');
var request = require('request');
var app = express();

// Set port from environment variable or default
var port = process.env.PORT || 3000;

// Set environment variables
var newsapi_key = process.env.NEWSAPI_KEY;

// If env variables are not set, quit application with error exit code
if (!newsapi_key) {
  console.log("Error: Missing environment variables")
  process.exit(1);
}

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(req, resp) {
  resp.sendFile(__dirname + '/views/index.html');
});

// Serve a proxy to the newsapi backend
app.get('/news/:source', function(req, resp) {
  var url = 'https://newsapi.org/v2/top-headlines?sources=' + req.params.source + '&apiKey=' + newsapi_key;
  request.get(url).pipe(resp);
});

// listen for requests :)
var listener = app.listen(port, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
