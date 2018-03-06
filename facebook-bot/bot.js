const fs = require("fs");
const login = require("facebook-chat-api");

login({email: "ngly581@gmail.com", password: "chettoi"}, (err, api) => {
    if(err) return console.error(err);

    // Note this example uploads an image called image.jpg
    var yourID = "100006652508750";
    var msg = {
        body: "Bot",
    }
    api.sendMessage("bot", yourID);
});