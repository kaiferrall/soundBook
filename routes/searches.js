const express = require("express");
const router = express.Router();
const passport = require("passport");
const AuthToken = require("../models/AuthToken");
const request = require("request-promise");

router.post("/albums", (req, res) => {
  AuthToken.findOne({ id: 1 })
    .then(tokenData => {
      //The search the user input
      const userSearch = req.body.search;
      //Spotify's access token
      const access_token = tokenData.bearerToken;
      //API search options
      const options = {
        method: "GET",
        url: "https://api.spotify.com/v1/search",
        qs: {
          q: userSearch,
          type: "album",
          limit: "6"
        },
        headers: {
          Authorization: `${access_token}`
        }
      };
      //Send the request
      request(options).then(response => {
        const parsedResponse = JSON.parse(response);
        const resultArray = parsedResponse.albums.items.map(album => {
          return {
            name: album.name,
            artist: album.artists[0].name,
            cover: album.images[0].url,
            release_date: album.release_date,
            id: album.id
          };
        });
        res.status(200).json(resultArray);
      });
    })
    .catch(err => console.log(err));
});

router.post("/artists", (req, res) => {
  AuthToken.findOne({ id: 1 })
    .then(tokenData => {
      //The search the user input
      const userSearch = req.body.search;
      //Spotify's access token
      const access_token = tokenData.bearerToken;
      //API search options
      const options = {
        method: "GET",
        url: "https://api.spotify.com/v1/search",
        qs: {
          q: userSearch,
          type: "artist",
          limit: "3"
        },
        headers: {
          Authorization: `${access_token}`
        }
      };
      //Send the request
      request(options).then(response => {
        const parsedResponse = JSON.parse(response);
        const resultArray = parsedResponse.artists.items.map(artist => {
          if (artist.images.length > 0) {
            coverImage = artist.images[0].url;
          } else {
            coverImage = null;
          }
          return {
            name: artist.name,
            genre: artist.genres[0],
            cover: coverImage,
            popularity: artist.popularity,
            id: artist.id
          };
        });
        res.status(200).json(resultArray);
      });
    })
    .catch(err => console.log(err));
});

module.exports = router;
