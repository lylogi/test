const fs = require("fs");
const login = require("facebook-chat-api");

login({email: "ngly581@gmail.com", password: "chettoi"}, (err, api) => {
    if(err) return console.error(err);

    // Note this example uploads an image called image.jpg
    var yourID = "100008972867720";
    var msg = {
        body: "Hey!",
    }
    api.sendMessage(msg, yourID);
});