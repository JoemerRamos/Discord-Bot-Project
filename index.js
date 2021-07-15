require("dotenv").config();
const { keepAlive } = require("./server");
const Discord = require("discord.js");
const bot = new Discord.Client();
const botCommands = require("./commands/exportCommands");
const { titlesRequest, detailsRequest } = require("./mal-api/apiRequests");
const createComponents = require("./mal-api/utilFunctions");
const { components } = require("./commands/animeAPI");
const TOKEN = process.env.TOKEN;
const guildID = "815610859471896596";
bot.commands = new Discord.Collection();

keepAlive();
bot.login(TOKEN);

const getApp = (guildID) => {
  const app = bot.api.applications(bot.user.id);
  if (guildID) {
    app.guilds(guildID);
  }
  return app;
};

bot.on("ready", async () => {
  const commands = await getApp(guildID).commands.get();

  for (let command in botCommands) {
    const { name, description, options } = botCommands[command];
    await createSlashCommand(name, description, options);
  }

  bot.ws.on("INTERACTION_CREATE", async (interaction) => {
    //console.log(interaction);
    const { type } = interaction;
    //Type 2 is a command interaction
    if (type == 2) {
      const { name, options } = interaction.data;
      const command = name.toLowerCase();
      if (command === "ping") {
        reply(interaction, "pong", undefined);
      } else if (command === "kick") {
        reply(interaction, `Kick <@${options[0].value}>`, options[0]);
      } else if (command === "ask") {
        const animeName = options[0].value;
        const animeList = await titlesRequest(animeName);
        const components = createComponents(animeList);
        reply(
          interaction,
          `You searched: ${animeName}\nChoose which anime title you want more details on:\n`,
          options[0],
          components
        );
      }
      //Type 3 is a message interaction (A button)
    } else if (type == 3) {
      const { custom_id } = interaction.data;
      if (custom_id.includes("searchResult")) {
        //If we choose a specific search result, we want to output and embedded card with all the information for the search result
        const animeTitle = custom_id.replace("searchResult_", "");
        console.log(animeTitle);
        const animeDetails = await detailsRequest(animeTitle);
        const channel = bot.channels.cache.get("815610859471896600");
        const embedObj = new Discord.MessageEmbed()
          .setColor("#0099ff")
          .setTitle(`${animeTitle}`)
          .addFields(
            { name: "English Title", value: animeDetails.title_english },
            { name: "Status", value: animeDetails.status },
            { name: "Rating", value: animeDetails.score },
            { name: "Next Upcoming Episode", value: animeDetails.broadcast }
          );
        //reply(interaction, "Test", undefined, undefined, embedObj);
        channel.send(embedObj);
        reply(interaction, "");
        //
      }
      //console.log(anime);
    }
    //console.log(test);
  });
});

const createSlashCommand = async (name, description, options) => {
  data = {
    name: name,
    description: description,
  };

  if (options) {
    data["options"] = [options];
  }

  getApp(guildID).commands.post({
    data,
  });
};

function reply(interaction, response, options = undefined, components = undefined) {
  let data = {
    type: 4, //Interaction Callback Type 4 is a channel message with source
    data: {
      content: response,
    },
  };
  //console.log(data);
  if (options) {
    data.allowed_mentions = {
      parse: ["user", "roles"],
      users: [options.value],
    };
  }
  //console.log(components);
  if (components) {
    //console.log(components);
    data.data.components = components;
  }

  bot.api.interactions(interaction.id, interaction.token).callback.post({
    data,
  });
}
