const { detailsRequest } = require('./apiRequests');

// Creates buttons for top 5 anime results when anime is searched
function createCompForNextEp(animeList) {
  const buttons = [];

  for (let i = 0; i < 5; i += 1) {
    const button = {
      type: 2, label: `${animeList[i]}`, style: 1, custom_id: `nextEp_${animeList[i]}`,
    };
    buttons.push(button);
  }

  const components = [
    {
      type: 1,
      components: buttons,
    },
  ];
  return components;
}

// Helper function for processing anime broadcast data
function decideBroadcastString(bcString, animeStatus) {
  const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  bcString = bcString.substring(0, bcString.length - 1);
  const dayNum = dayOrder.findIndex((arrayElmt) => bcString === arrayElmt);
  const currentDay = new Date();
  const currentDayIndex = currentDay.getDay() - 1;

  if (animeStatus === 'Finished Airing') {
    return 'No upcoming episode!';
  }

  if (currentDayIndex !== 6) {
    return dayNum > currentDayIndex ? `New episode released this ${dayOrder[dayNum]}!` : `New episode released next ${dayOrder[dayNum]}!`;
  }

  return dayNum === 1 ? `New episode released this ${dayOrder[dayNum]}!` : `New episode released next ${dayOrder[dayNum]}!`;
}

// Creates embed object to answer when the next episode is for the anime chosen from a button
async function createAnimeEmbedNextEp(btnId, Discord) {
  const animeTitle = btnId.replace('nextEp_', '');
  const animeDetails = await detailsRequest(animeTitle);
  // Check if broadcast time is before or after current day
  console.log(animeDetails.broadcast.split(' ')[0]);
  const bcString = decideBroadcastString(animeDetails.broadcast.split(' ')[0], animeDetails.status); // bcString = broadcast string
  const embedObj = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle(`${animeTitle}`)
    .addFields(
      { name: 'English Title', value: animeDetails.title_english },
      { name: 'Status', value: animeDetails.status },
      { name: 'Rating', value: animeDetails.score.toString() },
      { name: 'Next Upcoming Episode', value: bcString },
    );
  return embedObj;
}

module.exports = { createCompForNextEp, createAnimeEmbedNextEp };
