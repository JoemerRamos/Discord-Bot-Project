require("dotenv").config();
const { keepAlive } = require("./server");
const Discord = require("discord.js");
const bot = new Discord.Client();
const botCommands = require("./commands/exportCommands");
const getRequest = require("./mal-api/getRequest");
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
    console.log(interaction);
    const { type } = interaction;
    if (type == 2) {
      const { name, options } = interaction.data;
      const command = name.toLowerCase();
      if (command === "ping") {
        reply(interaction, "pong", undefined);
      } else if (command === "kick") {
        reply(interaction, `Kick <@${options[0].value}>`, options[0]);
      } else if (command === "ask") {
        const animeList = await getRequest(options[0].value);
        const components = createComponents(animeList);
        reply(interaction, `Anime ${animeList}`, options[0], components);
      }
    } else if (type == 3) {
      const { custom_id } = interaction.data;
      console.log(custom_id);
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
    type: 4,
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
