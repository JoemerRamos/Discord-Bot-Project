components = [];

for (let i = 0; i < 5; i++) {
  let obj = { type: 2, label: `Click me ${i + 1}!`, style: 1, custom_id: `click_${i + 1}` };
  components.push(obj);
}

module.exports = {
  name: "ask",
  description: "Communicates with anime api",
  options: {
    name: "anime",
    description: "Type name of anime",
    required: true,
    type: 3,
  },
  components: [
    {
      type: 1,
      components: components,
    },
  ],
  execute(msg, args) {
    if (msg.mentions.users.size) {
      const taggedUser = msg.mentions.users.first();
      msg.channel.send(`You wanted to kick: ${taggedUser.username}`);
    } else {
      msg.reply("Please tag a valid user!");
    }
  },
};
