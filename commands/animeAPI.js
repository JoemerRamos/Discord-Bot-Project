module.exports = {
  name: "ask",
  description: "Communicates with anime api",
  options: {
    name: "anime",
    description: "Type name of anime",
    required: true,
    type: 3,
  },
  execute(msg, args) {
    if (msg.mentions.users.size) {
      const taggedUser = msg.mentions.users.first();
      msg.channel.send(`You wanted to kick: ${taggedUser.username}`);
    } else {
      msg.reply("Please tag a valid user!");
    }
  },
};
