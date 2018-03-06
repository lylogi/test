var http = require('http');
var log = require('simple-node-logger').createSimpleLogger('project.log');
var logger = require('morgan');
var bodyParser = require('body-parser');
var async = require("asyncawait/async");
var await = require("asyncawait/await");
var express = require('express');


var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
var server = http.createServer(app);

app.get('/', (req, res) => {
  console.log('Server running okay');
  res.send("Home page.");
});

app.get('/webhook', function(req, res) {
  console.log('Call webhook');
  if (req.query['hub.verify_token'] === '123456') {
    res.send(req.query['hub.challenge']);
    res.send('ok');
  }
  res.send('Error, wrong validation token');
});

/*app.post('/webhook/', function (req, res) {
    messaging_events = req.body.entry[0].messaging
    for (i = 0; i < messaging_events.length; i++) {
        event = req.body.entry[0].messaging[i]
        sender = event.sender.id
        if (event.message && event.message.text) {
            text = event.message.text
            sendTextMessage(sender, "test")
        }
    }
    res.sendStatus(200)
})*/
app.post('/webhook', function(req, res) {
  var entries = req.body.entry;
  for (var entry of entries) {
    log.info(entries);
    var messaging = entry.messaging;
    for (var message of messaging) {
      var senderId = message.sender.id;
      if (message.message) {
        // If user send text
        if (message.message.text) {
          sendTextMessage(sender, "test")
        }
      }
    }
  }
  res.sendStatus(200)
})
function sendTextMessage(sender, text) {
    var messageData = {
        text:text
    };
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: this._token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}



app.set('port', process.env.PORT || 3002);
app.set('ip', process.env.IP || "127.0.0.1");

server.listen(app.get('port'), function() {
  console.log("Express server listening at %s:%d ", app.get('ip'), app.get('port'));
});
