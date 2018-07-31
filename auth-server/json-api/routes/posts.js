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
//@route   /api/users/test
//@desc    test json response
//@access  Public
router.get("/test", (req, res) => {
  res.json("test");
});

//@route   /api/posts/create
//@desc    create a post
//@access  Private
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { isValid, errors } = validatePost(req.body);

    if (!isValid) {
      res.status(400).json(errors);
    }

    const userId = req.user.id;
    User.findById(userId).then(user => {
      const postInput = {};
      if (req.body.title) postInput.title = req.body.title;
      if (req.body.text) postInput.text = req.body.text;
      if (req.body.tags) postInput.tags = req.body.tags;
      if (typeof req.body.tags !== "undefine") {
        postInput.tags = req.body.tags.split(",");
      }

      const newPost = new Post({
        user: req.user.id,
        username: user.username,
        title: postInput.title,
        text: postInput.text,
        tags: postInput.tags
      });
      const now = new Date();
      const date = dateFormat(now, "mmmm dS, yyyy, h:MM TT");
      newPost.date = date;
      newPost.save().then(post => {
        res.json(post);
      });
    });
  }
);

//@route   /api/posts/all
//@desc    return all post from user following
//@access  Private
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userId = req.user.id;
    const errors = {};
    Profile.findOne({ user: userId })
      .then(profile => {
        const followingArray = profile.following;
        followingArray.push(userId);
        Post.find({ user: { $in: followingArray } }, null, {
          sort: { mongoDate: "descending" }
        }).then(posts => {
          res.status(200).json(posts);
        });
      })
      .catch(err => {
        errors.posts = "No posts found";
        res.status(404).json(errors);
      });
  }
);

module.exports = router;
