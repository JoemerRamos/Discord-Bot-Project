require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const { execSync } = require('child_process');
const { keepAlive } = require('./server');

const bot = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });
const { createAnimeEmbedNextEp } = require('./mal-api/utilFunctions');

if (process.platform !== 'win32') {
  const output = execSync('npm i --save-dev node@16 && npm config set prefix=$(pwd)/node_modules/node && export PATH=$(pwd)/node_modules/node/bin:$PATH', { encoding: 'utf-8' }); // the default is 'buffer'
  console.log('Output was:\n', output);
}

const { TOKEN } = process.env;
const cmdHandler = new Discord.Collection();

keepAlive();
bot.login(TOKEN);

// Adds commands to a map collection so that we can dynamically access commands for interactions
async function setCommands(cmdController) {
  const cmdObjects = [];

  const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));

  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    cmdObjects.push(command);
    cmdController.set(command.name, command);
  }

  // Registers the slash commands to show in discord chat
  await bot.guilds.cache.get('815610859471896596')?.commands.set(cmdObjects);
}

bot.on('ready', async () => {
  setCommands(cmdHandler);
});

bot.on('interactionCreate', async (interaction) => {
  // Type 2 is a command interaction
  if (interaction.isCommand()) {
    const { commandName, options } = interaction;
    // console.log(interaction);
    try {
      await cmdHandler.get(commandName).execute(interaction, options);
    } catch (error) {
      interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  } else if (interaction.isButton()) {
    const { customId } = interaction;
    if (customId.includes('nextEp')) {
      /* If we choose a specific search result, we want to output and
      embedded card with all the information for the search result */
      const embedObj = await createAnimeEmbedNextEp(customId, Discord);
      interaction.reply({ embeds: [embedObj] });
    }
  }
});
/*
async function deleteGuildCommands(guildID) {
  await bot.guilds.cache.get(guildID)?.commands.set([]);
}
*/
