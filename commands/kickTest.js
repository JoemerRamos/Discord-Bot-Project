module.exports = {
  name: "kick",
  description: "Threatens to kick user out",
  options: [
    {
      name: "name",
      description: "Mention name to kick",
      required: true,
      type: 9,
    },
  ],
  async execute(interaction, options) {
    const { id: mentionId } = options.get("name").user;
    interaction.reply(`Kick <@${mentionId}>`);
  },
};
