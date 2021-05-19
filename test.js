const Discord = require("discord.js");
const client = new Discord.Client();
require("dotenv").config();
const TOKEN = process.env.TOKEN;
//815610859471896596
const commandData = {
  name: "echo",
  description: "Replies with your input!",
  options: [
    {
      name: "input",
      type: "STRING",
      description: "The input which should be echoed back",
      required: true,
    },
  ],
};

client.once("ready", () => {
  // Creating a global command
  client.application.commands.create(commandData);

  // Creating a guild-specific command
  client.guilds.cache.get("815610859471896596").commands.create(commandData);
});

client.on("interaction", (interaction) => {
  // If the interaction isn't a slash command, return
  if (!interaction.isCommand()) return;

  // Check if it is the correct command
  if (interaction.commandName === "echo") {
    // Get the input of the user
    const input = interaction.options[0].value;
    // Reply to the command
    interaction.reply(input);
  }
});
