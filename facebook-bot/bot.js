const fs = require("fs");
const login = require("facebook-chat-api");
const request = require('request');

/*login({email: "ngly581@gmail.com", password: "chettoi"}, (err, api) => {
    if(err) return console.error(err);

    // Note this example uploads an image called image.jpg
    var yourID = "100005652216479";
    var msg = {
        body: "test",
    }
    api.sendMessage(msg, yourID);
});*/

function sendMessage(event) {
  let sender = event.sender.id;
  let text = event.message.text;

  console.log(sender);

  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token: PAGE_ACCESS_TOKEN},
    method: 'POST',
    json: {
      recipient: {id: sender},
      message: {text: text}
    }
  }, function (error, response) {
    if (error) {
        console.log('Error sending message: ', error);
    } else if (response.body.error) {
        console.log('Error: ', response.body.error);
    }
  });
}