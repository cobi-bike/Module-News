// init project
var express = require('express');
var request = require('request');
var app = express();

// Set port from environment variable or default
var port = process.env.PORT || 3000;

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, resp) {
  resp.sendFile(__dirname + '/views/index.html');
});

app.get('/news/:source', function (req, resp) {
  var newsapi_key = process.env.NEWSAPI_KEY;
  var url = 'https://newsapi.org/v1/articles?source='+req.params.source+'&apiKey='+newsapi_key;
  request.get(url).pipe(resp);
});

// listen for requests :)
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
