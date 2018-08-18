const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");
const validateThread = require("../validation/validateThreads");
const dateFormat = require("dateformat");
//Load post model
const Post = require("../models/Posts");
const User = require("../models/User");
const Profile = require("../models/Profile");
const Threads = require("../models/Threads");

//@route   /api/threads/create
//@desc    create a thread
//@access  Private
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { isValid, errors } = validateThread(req.body);
    if (!isValid) {
      res.status(400).json(errors);
    } else {
      const userId = req.user.id;
      const threadInput = {};
      if (req.body.name) threadInput.name = req.body.name;
      if (req.body.private) threadInput.private = req.body.private;
      if (req.body.desc) threadInput.desc = req.body.desc;

      const now = new Date();
      const date = dateFormat(now, "mmmm dS, yyyy, h:MM TT");
      Thread.findOne({ name: threadInput.name }).then(thread => {
        if (thread) {
          console.log("test");
          errors.threads = "That thread name is taken";
          res.status(400).json(errors);
        } else {
          console.log("test2");
          const newThread = new Thread({
            owner: userId,
            name: threadInput.name,
            description: threadInput.desc,
            private: threadInput.private,
            date: date
          });
          Profile.findOne({ user: userId }).then(profile => {
            profile.Threads.push(newThread._id);
            profile.save();
          });
          newThread.members.push(userId);
          newThread.save().then(thread => {
            res.status(200).json(thread);
          });
        }
      });
    }
  }
);

//@route   /api/threads/all
//@desc    Returns the all the profiles thread
//@access  Private
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userId = req.user.id;
    const errors = {};
    Profile.findOne({ user: userId }).then(profile => {
      if (profile) {
        const threads = profile.Threads;
        const projection = {
          comments: { $slice: -1 },
          members: 0,
          topics: 0,
          owner: 0
        };

        Thread.find({ _id: { $in: threads } }, projection).then(threads => {
          if (threads) {
            res.status(200).json(threads);
          } else {
            errors.threads = "No threads";
            res.status(400).json(errors);
          }
        });
      }
    });
  }
);

//@route   /api/threads/:name
//@desc    Returns the specific thread
//@access  Private
router.get(
  "/:name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userId = req.user.id;
    const threadName = req.params.name;
    const errors = {};

    Thread.findOne({ name: threadName }).then(thread => {
      if (thread) {
        res.status(200).json(thread);
      } else {
        errors.thread = "Thread not found";
        res.status(400).json(errors);
      }
    });
  }
);

//@route   /api/threads/comment
//@desc    Leave a comment in a thread
//@access  Private
router.post(
  "/comment",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userId = req.user.id;
    const threadId = req.body.thread;
    Profile.findOne({ user: userId }).then(profile => {
      Thread.findById(threadId).then(thread => {
        const now = new Date();
        const date = dateFormat(now, "mmmm dS, h:MM TT");
        const newComment = {
          username: profile.username,
          text: req.body.text,
          likes: [],
          replies: [],
          date: date
        };
        thread.comments.push(newComment);
        thread.save().then(thread => {
          res.status(200).json(thread);
        });
      });
    });
  }
);

module.exports = router;
