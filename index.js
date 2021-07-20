require("dotenv").config();
const { keepAlive } = require("./server");
const fs = require("fs");
const Discord = require("discord.js");
const bot = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const { createAnimeEmbedNextEp } = require("./mal-api/utilFunctions");
const TOKEN = process.env.TOKEN;
let cmdHandler = new Discord.Collection();

keepAlive();
bot.login(TOKEN);

bot.on("ready", async () => {
  setCommands(cmdHandler);
});

bot.on("interactionCreate", async (interaction) => {
  //Type 2 is a command interaction
  if (interaction.isCommand()) {
    const { commandName, options } = interaction;

    try {
      await cmdHandler.get(commandName).execute(interaction, options);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
    }
  } else if (interaction.isButton()) {
    const { customId } = interaction;
    if (customId.includes("nextEp")) {
      //If we choose a specific search result, we want to output and embedded card with all the information for the search result
      embedObj = await createAnimeEmbedNextEp(customId, Discord);
      interaction.reply({ embeds: [embedObj] });
    }
  }
});

//Adds commands to a map collection so that we can dynamically access commands for interactions
async function setCommands(cmdController) {
  cmdObjects = [];

  const commandFiles = fs.readdirSync("./commands").filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    cmdObjects.push(command);
    cmdController.set(command.name, command);
  }

  //Registers the slash commands to show in discord chat
  await bot.guilds.cache.get("815610859471896596")?.commands.set(cmdObjects);
}

async function deleteGuildCommands(guildID) {
  await bot.guilds.cache.get(guildID)?.commands.set([]);
}
