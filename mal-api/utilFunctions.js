const { detailsRequest } = require("../mal-api/apiRequests");

//Creates buttons for top 5 anime results when anime is searched
function createCompForNextEp(animeList) {
  buttons = [];

  for (let i = 0; i < 5; i++) {
    let button = { type: 2, label: `${animeList[i]}`, style: 1, custom_id: `nextEp_${animeList[i]}` };
    buttons.push(button);
  }

  components = [
    {
      type: 1,
      components: buttons,
    },
  ];
  return components;
}

//Creates embed object to answer when the next episode is for the anime chosen from a button
async function createAnimeEmbedNextEp(btnId, Discord) {
  const animeTitle = btnId.replace("nextEp_", "");
  const animeDetails = await detailsRequest(animeTitle);
  console.log(animeDetails);
  const embedObj = new Discord.MessageEmbed()
    .setColor("#0099ff")
    .setTitle(`${animeTitle}`)
    .addFields(
      { name: "English Title", value: animeDetails.title_english },
      { name: "Status", value: animeDetails.status },
      { name: "Rating", value: animeDetails.score.toString() },
      { name: "Next Upcoming Episode", value: animeDetails.broadcast }
    );
  return embedObj;
}

module.exports = { createCompForNextEp, createAnimeEmbedNextEp };
