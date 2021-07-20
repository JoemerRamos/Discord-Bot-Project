const { titlesRequest } = require("../mal-api/apiRequests");
const { createCompForNextEp } = require("../mal-api/utilFunctions");

module.exports = {
  name: "ask",
  description: "Communicates with anime api",
  options: [
    {
      name: "anime",
      description: "Type name of anime",
      required: true,
      type: 3, //Application Command Type 3 is String
    },
  ],
  async execute(interaction, options) {
    const { value: animeName } = options.get("anime");
    const animeList = await titlesRequest(animeName);
    const components = createCompForNextEp(animeList);

    interaction.reply({
      content: `You searched: ${animeName}\nChoose which anime title you want more details on:\n`,
      components: components,
    });
  },
};
