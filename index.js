const login = require("facebook-chat-api");
var data  = require('./facebook-bot/fillter/text');
var score = require("string_score");
var account = require('./login/login');


// Create simple echo bot
login({email: account.email, password: account.pass}, (err, api) => {
    if(err) return console.error(err);
    api.setOptions({listenEvents: true,logLevel: "silent"})
    api.listen((err, event) => {
      switch(event.type) {
        case "message":
          if(event.body === '/stop') {
                api.sendMessage("Goodbye…", event.threadID);
                return stopListening();
            }else{
              var max_core = 0
              var obj = null
              data.forEach((data_row) => {
                var inputs = data_row.input;
                var num=0;
                var score = 0
                var body = event.body
                inputs.forEach((input_row) =>{
                  let new_score = body.score(input_row);
                  let re_new_score = input_row.score(body);
                  re_new_score = re_new_score>0.4?re_new_score:0;
                   score += Math.max(new_score, re_new_score)
                  if(new_score>0.3){++num}
                  
              })
                if (score / inputs.length + num > max_core) {
                      max_core = score
                      obj = data_row.output
                      api.sendMessage(obj, event.threadID);
                  }
            })
            }
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