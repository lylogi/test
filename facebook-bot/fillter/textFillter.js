var data  = require('./text');
require("string_score");

class textFillter {
    constructor(str) {
        this.input = str;
    }
    fill(result) {
        var me = this;
        return new Promise((resolve, reject) => {
            if (result) {
                resolve(result);
                return;
            }
            var max_core = 0
            var obj = null
            data.forEach((data_row) => {
                var inputs = data_row.input
                var score = 0
                var num = 0
                inputs.forEach((input_row) => {
                    let new_score = me.input.score(input_row);
                    let re_new_score = input_row.score(me.input);
                    re_new_score = re_new_score>0.4?re_new_score:0;
    
                    score += Math.max(new_score, re_new_score)
                    if(new_score>0.3) ++num
                })
                if (score / inputs.length + num > max_core) {
                    max_core = score
                    obj = data_row
                }
            })
            if (obj !== null) {
                result = {
                    type: "TEXT",
                    value: obj.output
                }
            }
            resolve(result);
        });
    }
}
module.exports = textFillter;