module.exports = {
  name: "kick",
  description: "Threatens to kick user out",
  options: {
    name: "name",
    description: "Mention name to kick",
    required: true,
    type: 9,
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
