const request = require("request-promise"); // "Request" library
const keys = require("./config/keys");
const Auth = require("./models/AuthToken");
const client_id = keys.spotify.client_id; // Your client id
const client_secret = keys.spotify.client_secret; // Your secret

// your application requests authorization
module.exports = function getAuthToken() {
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer(client_id + ":" + client_secret).toString("base64")
    },
    form: {
      grant_type: "client_credentials"
    },
    json: true
  };
  const auth = {};
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      // use the access token to access the Spotify Web API
      const token = body.access_token;
      const bearerToken = "Bearer " + token;
      Auth.findOne({ id: 1 }).then(token => {
        if (token) {
          token.bearerToken = bearerToken;
          token.save().then(token => {
            //console.log("token updated?");
          });
        } else {
          const newAuth = new Auth({
            bearerToken: bearerToken,
            id: 1
          });
          newAuth.save().then(bearerToken => {
            //console.log(bearerToken);
          });
        }
      });
    }
  });
};
