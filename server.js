/*Not meant as a means to handle routing between a web app, this is a web server meant
for keeping the bot alive*/

const express = require("express");

const server = express();

server.all("/", (req, res) => {
  res.send("Bot is running!");
});

function keepAlive() {
  server.listen(3000, () => {
    console.log("Server is ready.");
  });
}

module.exports = keepAlive;
//module.exports.keepAlive = keepAlive()
