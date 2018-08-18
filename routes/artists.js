const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");
const validatePost = require("../validation/validatePost");
const dateFormat = require("dateformat");
//Load post model
const Post = require("../models/Posts");
const User = require("../models/User");
const Profile = require("../models/Profile");
const Album = require("../models/Albums");
const Artist = require("../models/Artists");

//@route   /api/artists/add
//@desc    add music to library
//@access  Public
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const selectedArtist = req.body;

    const userId = req.user.id;
    Profile.findOne({ user: userId }).then(profile => {
      Artist.findOne({ artistId: selectedArtist.artistId }).then(artist => {
        if (artist) {
          profile.Artists.push(artist.artistId);
          profile.save().then(savedProfile => {
            res.status(200).json(savedProfile);
          });
        } else {
          const newArtist = new Artist({
            artistId: selectedArtist.artistId,
            cover: selectedArtist.cover,
            name: selectedArtist.name,
            popularity: selectedArtist.popularity,
            genre: selectedArtist.genre
          });
          profile.Artists.push(newArtist.artistId);
          profile.save().then(savedProfile => {
            newArtist.save().then(savedArtist => {
              res.status(200).json(savedProfile);
            });
          });
        }
      });
    });
  }
);

//@route   /api/artists/:profileId
//@desc    returns viewed profile artists
//@access  Public
router.get(
  "/profile/:profileId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileId = req.params.profileId;
    const errors = {};
    Profile.findById(profileId).then(profile => {
      if (profile) {
        Artist.find({ artistId: { $in: profile.Artists } }).then(artists => {
          res.status(200).json(artists);
        });
      } else {
        errors.profile = "No profile";
        res.status(400).json(errors);
      }
    });
  }
);

module.exports = router;
