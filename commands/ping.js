module.exports = {
  name: "ping",
  description: "Pings bot!",
  execute(msg, args) {
    msg.reply("ping");
    msg.channel.send("pong");
  },
};
