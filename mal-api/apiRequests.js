// https://jikan.docs.apiary.io/#reference/0/manga
const axios = require('axios');

// When anime is searched, function pulls the top 5 results from MAL
async function titlesRequest(animeTitle) {
  const animeList = [];
  const response = await axios.get(`https://api.jikan.moe/v3/search/anime?q=${animeTitle}&order_by=title`);
  // console.log('hi');

  // console.log(response.data.results[0]);
  response.data.results.forEach((anime) => {
    animeList.push(anime.title);
  });

  if (animeList == null) {
    throw new Error("Couldn't produce anime list");
  }
  return animeList.slice(0, 5);
}

// When specific anime is searched, grabs the anime's data object
async function detailsRequest(animeTitle) {
  const searchResult = await axios.get(`https://api.jikan.moe/v3/search/anime?q=${animeTitle}&order_by=title`);

  const animeObj = searchResult.data.results[0];

  if (!animeObj) {
    throw new Error("Couldn't produce anime list");
  }

  const { data: animeDetails } = await axios.get(`https://api.jikan.moe/v3/anime/${animeObj.mal_id}`);

  return animeDetails;
}

module.exports = { titlesRequest, detailsRequest };
