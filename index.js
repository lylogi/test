const login = require("facebook-chat-api");
var account = require('./login/login');
var msg = require('./facebook-bot/bot');
/*var text_trans = require('./facebook-bot/bot-eng/bot-trans.js');*/



// Create simple echo bot
login({email: account.email, password: account.pass}, (err, api) => {
    if(err) return console.error(err);
    api.setOptions({listenEvents: true})
    api.listen((err, event) => {
      switch(event.type) {
        case "message":
          var text = msg.reply(event.body); 
          console.log(text);
          api.sendMessage(text, event.threadID);
          /*var text = text_trans.textTrans(event.body);
          
          api.sendMessage(text, event.threadID)*/
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