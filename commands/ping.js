module.exports = {
  name: "ping",
  description: "Pings bot!",

  async execute(interaction) {
    await interaction.reply("pong");
  },
};
