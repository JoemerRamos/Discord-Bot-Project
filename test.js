const Discord = require("discord.js");
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
require("dotenv").config();
const TOKEN = process.env.TOKEN;

client.once("ready", async () => {
  console.log("Ready!");
});

client.on("messageCreate", async (message) => {
  if (!client.application?.owner) await client.application?.fetch();

  if (message.content.toLowerCase() === "!deploy" && message.author.id === client.application?.owner.id) {
    const data = {
      name: "ping",
      description: "Replies with Pong!",
    };

    //const command = await client.application?.commands.set(data);
    //const command3 = await client.guilds.cache.get("815610859471896596")?.commands.create(data);
    //await client.guilds.cache.get("815610859471896596").commands.delete("865637338183893072");
    //console.log(command);
    //console.log("-----NEWWWW STUFFF _--------------------");
    //console.log(client.guilds.cache.get("815610859471896596").commands.guild.commands.guild);
    let command = await client.guilds.cache.get("815610859471896596").commands.cache.find((command) => {
      return command.name === "ping";
    });
    //const test = await client.guilds.cache.get("815610859471896596").commands.set([]);
    //await client.guilds.cache.get("815610859471896596").commands.cache;
    //console.log("command", command);
    //console.log(test);
    const test2 = await client.application?.commands.set([]);
    //const test2 = await client.application?.commands.fetch();
    console.log(test2);
  }
});

client.on("interactionCreate", async (interaction) => {
  console.log(interaction.isCommand());
  interaction.reply("d");
  //interaction.defer({ ephemeral: true });
});

client.login(TOKEN);
