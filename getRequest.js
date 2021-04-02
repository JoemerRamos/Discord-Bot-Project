//https://jikan.docs.apiary.io/#reference/0/manga
const axios = require("axios");

async function apiRequest() {
  const options = {
    method: "GET",
  };

  let animeList = [];
  let response = await axios.get("https://api.jikan.moe/v3/search/anime?q=jujutsu&order_by=title");
  console.log(response);
  response.data.results.forEach((anime) => {
    animeList.push(anime.title);
  });

  return animeList;
}

apiRequest().then((list) => {
  console.log(list);
});

/*
setTimeout(() => {
  console.log(animeList);
}, 1000);

console.log(animeList);
*/

/*
let titles = [];
for (anime of animeList.results) {
  titles.push(anime.title);
}
console.log(titles);
*/
/*
Past Code
const randomstring = require("randomstring");
const crypto = require("crypto");
const base64url = require("base64url");

const code_verifier = randomstring.generate(100);
const base64Digest = crypto.createHash("sha256").update(code_verifier).digest("base64");
const code_challenge = base64url.fromBase64(base64Digest);

const authURL = {
  response_type: "code",
  client_id: "e140e9f9d63293d4511e527c94a5b8c8",
  state: "YOUR_STATE",
  redirect_uri: "http://localhost:3000/",
  code_challenge: code_challenge,
  code_challenge_method: "plain",
};
const options = {
  method: "GET",
};

let authURLString = "https://myanimelist.net/v1/oauth2/authorize?";

for (objName in authURL) {
  authURLString = authURLString.concat(`${objName}=${authURL[objName]}&`);
}

authURLString = authURLString.concat(" HTTP/1.1 Host: http://localhost:3000/");
console.log(authURLString);
*/
