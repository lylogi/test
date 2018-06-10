var data  = require('./fillter/text');
var score = require("string_score");

class Bot {
    constructor() {
        this.myName = 'Bot';
    }
    reply(message ){
        let obj = null
        if(message === '/stop') {
            obj = "Goodbye!"
        }else{
          var max_core = 0
          data.forEach((data_row) => {
            var inputs = data_row.input;
            var num=0;
            var score = 0
            var body = message;
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
            }
        })
        }
        return obj;
    }
}
module.exports = new Bot;