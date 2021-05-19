require("dotenv").config();
const { keepAlive } = require("./server");
const Discord = require("discord.js");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const botCommands = require("./commands/exportCommands");

Object.keys(botCommands).map((key) => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});

const TOKEN = process.env.TOKEN;

keepAlive;
bot.login(TOKEN);

bot.on("ready", () => {
  bot.api
    .applications(bot.user.id)
    .guilds("815610859471896596")
    .commands.post({
      data: {
        name: "hello",
        description: "hello world command",
        // possible options here e.g. options: [{...}]
      },
    });

  bot.ws.on("INTERACTION_CREATE", async (interaction) => {
    const command = interaction.data.name.toLowerCase();
    const args = interaction.data.options;

    if (command === "hello") {
      // here you could do anything. in this sample
      // i reply with an api interaction
      bot.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: "hello world!!!",
          },
        },
      });
    }
  });
});

bot.on("message", (msg) => {
  const args = msg.content.split(/ +/);
  const command = args.shift().toLowerCase();
  console.info(`Called command: ${command}`);

  if (!bot.commands.has(command)) return;

  try {
    bot.commands.get(command).execute(msg, args);
  } catch (error) {
    console.error(error);
    msg.reply("there was an error trying to execute that command!");
  }
});
