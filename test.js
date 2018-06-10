const login = require("facebook-chat-api");
var data  = require('./facebook-bot/fillter/text');
var score = require("string_score");
var account = require('./login/login');
const translate = require('google-translate-api');


// Create simple echo bot
login({email: account.email, password: account.pass}, (err, api) => {
    if(err) return console.error(err);
    api.setOptions({listenEvents: true,logLevel: "silent"})
    api.listen((err, event) => {
      switch(event.type) {
        case "message":
          translate(event.body, {form:'vi', to: 'en'}).then(res => {
              api.sendMessage(res.text, event.threadID);
          }).catch(err => {
              console.error(err);
          });
        break;
        case "event":
          console.log(event);
          break;
      }
  })
});

function replaceMyname(text) {
  text = text.replace(/@myname/g, this.myName);
  //text = text.replace(/@yourname/g, );
  return text
}