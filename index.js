require("dotenv").config();
const { keepAlive } = require("./server");
const Discord = require("discord.js");
const bot = new Discord.Client();
const botCommands = require("./commands/exportCommands");
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
    const { name, options } = interaction.data;
    const command = name.toLowerCase();

    if (command === "ping") {
      reply(interaction, "pong");
    } else if (command === "kick") {
      reply(interaction, `Kick <@${options[0].value}>`, options[0]);
    }
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

function reply(interaction, response, options = undefined) {
  let data = {
    type: 4,
    data: {
      content: response,
    },
  };

  if (options) {
    data.allowed_mentions = {
      parse: ["user", "roles"],
      users: [options.value],
    };
  }
  bot.api.interactions(interaction.id, interaction.token).callback.post({
    data,
  });
}
