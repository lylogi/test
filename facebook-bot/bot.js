var data  = require('./fillter/text');
require("string_score");
const {Wit, log} = require('node-wit');

class Bot {
    constructor() {
        this.myName = 'Bot';
    }
    _think(text) {
        var me = this;
        var short_code_fillter = new shortCodeFillter(text);
        var text_fillter = new textFillter(text);
        var spam_fillter = new spamFillter(text);
        return new Promise((resolve, reject) => {
            short_code_fillter.fill()
                .then(text_fillter.fill.bind(me))
                .then(spam_fillter.fill.bind(me))
                .then((result) => {
                    console.log(result);
                    resolve(result || { type: 'TEXT', output: 'NOT_FOUND' });
                });
        })
    }
    data() {
        var me = this;
        const client = new Wit({ accessToken: 'UJFJHXX5EH4OLYK5MJK4GYXQ4H5TPNUI' });
        client.message('what is the weather in London?', {})
            .then((data) => {
                console.log('Yay, got Wit.ai response: ' + data);
                fbAPI.sendTextMessage(me.senderId, data.entities.intent[0].value);
            })
            .catch(console.error);
    }
    reply(senderId, input) {
        var me = this;
        me.input = input
        me.senderId = senderId
        me.data();

        me._think(me.input)
            .then((result) => {
                switch (result.type) {
                    case 'TEXT': {
                        fbAPI.sendTextMessage(me.senderId, result.value);
                        break;
                    }
                    default: {
                        fbAPI.sendTextMessage(me.senderId, 'NO MATCH');
                        break;
                    }
                }
            });
    }
    customReplace(text) {
        text = text.replace(/@myname/g, this.myName);
        return text
    }
}
module.exports = new Bot();