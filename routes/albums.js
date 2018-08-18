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

//@route   /api/albums/test
//@desc    test json response
//@access  Public

//@route   /api/albums/add
//@desc    add music to library
//@access  Public
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const selectedAlbum = req.body;
    const userId = req.user.id;
    Profile.findOne({ user: userId }).then(profile => {
      Album.findOne({ albumId: selectedAlbum.albumId }).then(album => {
        if (album) {
          profile.Albums.push(album.albumId);
          profile.save().then(savedProfile => {
            res.status(200).json(savedProfile);
          });
        } else {
          const newAlbum = new Album({
            albumId: selectedAlbum.albumId,
            cover: selectedAlbum.cover,
            name: selectedAlbum.name,
            artist: selectedAlbum.artist,
            date: selectedAlbum.date
          });
          profile.Albums.push(newAlbum.albumId);
          profile.save().then(savedProfile => {
            newAlbum.save().then(savedAlbum => {
              res.status(200).json(savedProfile);
            });
          });
        }
      });
    });
  }
);

//@route   /api/albums/:profileId
//@desc    return logged in users music
//@access  Public
router.get(
  "/profile/:profileId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileId = req.params.profileId;
    const errors = {};
    Profile.findById(profileId).then(profile => {
      if (profile) {
        Album.find({ albumId: { $in: profile.Albums } }).then(albums => {
          res.status(200).json(albums);
        });
      } else {
        errors.profile = "No profile";
        res.status(400).json(errors);
      }
    });
  }
);

module.exports = router;
