//https://jikan.docs.apiary.io/#reference/0/manga
const axios = require("axios");

async function apiRequest(animeTitle) {
  const options = {
    method: "GET",
  };

  let animeList = [];
  let response = await axios.get(`https://api.jikan.moe/v3/search/anime?q=${animeTitle}&order_by=title`);
  //console.log(response);
  response.data.results.forEach((anime) => {
    animeList.push(anime.title);
  });
  if (animeList == null) {
    throw new Error("Couldn't produce anime list");
  }
  return animeList.slice(0, 5);
}
/*
apiRequest()
  .then((list) => {
    console.log(list);
  })
  .catch((err) => {
    console.log(err);
  });
*/
module.exports = apiRequest;
