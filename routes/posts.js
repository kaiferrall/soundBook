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
      console.log("err");
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
        avatar: user.avatar,
        username: user.username,
        title: postInput.title,
        text: postInput.text,
        tags: postInput.tags
      });
      const now = new Date();
      const date = dateFormat(now, "mmmm dS, yyyy, h:MM TT");
      newPost.date = date;
      newPost.save().then(post => {
        res.status(200).json(post);
      });
    });
  }
);

//@route   /api/posts/all
//@desc    return all post from user following
//@access  Private
router.post(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userId = req.user.id;
    const errors = {};
    const min = req.body.min;
    const max = req.body.max;
    Profile.findOne({ user: userId })
      .then(profile => {
        const followingArray = profile.following;
        followingArray.push(userId);
        Post.find({ user: { $in: followingArray } }, null, {
          sort: { mongoDate: "descending" }
        }).then(posts => {
          //How many to send
          const length = posts.length;
          if (length === 0) {
            errors.noPosts = "No posts";
            res.status(400).json(errors);
          } else {
            if (max < length) {
              res.status(200).json(posts.slice(min, max));
            }
            if (max === length) {
              res.status(200).json(posts.slice(min, max));
            }
            if (max > length && length > min) {
              res.status(200).json(posts.slice(min, length));
            } else if (min === length) {
              errors.noMorePosts = "No more posts";
              res.status(400).json(errors);
            } else if (min > length) {
              errors.noMorePosts = "No more posts";
              res.status(400).json(errors);
            }
          }
        });
      })
      .catch(err => {
        errors.posts = "No posts found";
        res.status(404).json(errors);
      });
  }
);

//@route   /api/posts/profile/:id
//@desc    return a single profile's posts
//@access  Private
router.get(
  "/profile/:userId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userId = req.params.userId;
    const errors = {};
    Post.find({ user: userId }, null, {
      sort: { mongoDate: "descending" }
    }).then(posts => {
      if (posts) {
        res.status(200).json(posts);
      } else {
        errors.posts = "You have no posts yet";
        res.status(400).json(errors);
      }
    });
  }
);

//@route   /api/posts/like
//@desc    add a like to a post
//@access  Private
router.post(
  "/like",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userId = req.user.id;
    const postId = req.body.postId;
    const errors = {};
    Post.findById(postId)
      .then(post => {
        const filter = post.likes.filter(like => like === userId);
        if (filter.length > 0) {
          errors.like = "Already liked";
          res.status(400).json(errors);
        } else {
          post.likes.push(userId);
          post.save();
        }
      })
      .catch(err => console.log(err));
  }
);

router.post(
  "/comment",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userId = req.user.id;
    const comment = req.body.comment;
    const postId = req.body.postId;

    User.findById(userId).then(user => {
      Post.findById(postId).then(post => {
        const now = new Date();
        const date = dateFormat(now, "mmmm dS, yyyy, h:MM TT");
        const newComment = {
          text: comment,
          avatar: user.avatar,
          username: user.username,
          date: date
        };
        post.comments.unshift(newComment);
        post.save().then(post => {
          res.json({ newComment: "Commented" });
        });
      });
    });
  }
);

router.post(
  "/comments",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const postId = req.body.postId;
    const errors = {};
    Post.findById(postId).then(post => {
      if (post) {
        const comments = post.comments;
        res.status(200).json(comments);
      } else {
        errors.comments = "No post found";
        res.status(400).json(errors);
      }
    });
  }
);

module.exports = router;
