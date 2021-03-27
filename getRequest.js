//https://jikan.docs.apiary.io/#reference/0/manga
const https = require("https");
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
const req = https.request("https://api.jikan.moe/v3/search/anime?q=Naruto", options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on("data", (d) => {
    process.stdout.write(d);
  });
});

req.on("error", (error) => {
  console.error(error);
});

req.end();
