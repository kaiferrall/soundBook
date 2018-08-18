const express = require("express");
const router = express.Router();
const fs = require("fs");
const passport = require("passport");
const bCrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    cb(null, req.body.username + "-" + file.originalname);
  }
});
const upload = multer({ storage: storage });

//Load validation
const validateRegister = require("../validation/validateRegister");
const validateLogin = require("../validation/validateLogin");
//Load mongoose models
const User = require("../models/User");
const Profile = require("../models/Profile");
//@route   /api/users/test
//@desc    test json response
//@access  Public
router.get("/test", (req, res) => {
  console.log(req.isAuthenticated());
  res.json("test");
});

//@route   /api/users/register
//@desc    creates a user
//@access  Public
router.post("/register", upload.single("avatar"), (req, res) => {
  const { isValid, errors } = validateRegister(req.body);
  if (!isValid) {
    res.status(400).json(errors);
  } else {
    User.findOne({ username: req.body.username }).then(user => {
      if (user) {
        errors.username = "Username already exists";
        res.status(400).json(errors);
      } else {
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          avatar: req.file.filename,
          password: req.body.password
        });

        bCrypt.genSalt(10, (err, salt) => {
          bCrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                //login user when they register
                const payload = {
                  id: user.id,
                  username: user.username,
                  email: user.email,
                  avatar: user.avatar
                };

                //Create jwt token
                jwt.sign(
                  payload,
                  keys.passport.secretOrKey,
                  { expiresIn: 7200 },
                  (err, token) => {
                    res.status(200).json({
                      user: user,
                      authorization: "true",
                      token: "Bearer " + token
                    });
                  }
                );
              })
              .catch(err => {
                console.log(err);
              });
          });
        });
      }
    });
  }
});

//@route   /api/users/login
//@desc    login with user
//@access  Public
router.post("/login", (req, res) => {
  const { isValid, errors } = validateLogin(req.body);

  if (!isValid) {
    res.status(400).json(errors);
  }

  User.findOne({ username: req.body.username })
    .then(user => {
      if (user) {
        bCrypt
          .compare(req.body.password, user.password)
          .then(didMatch => {
            if (didMatch) {
              //jwt payload
              const payload = {
                id: user.id,
                username: user.username,
                email: user.email,
                avatar: user.avatar
              };
              //Create jwt token
              jwt.sign(
                payload,
                keys.passport.secretOrKey,
                { expiresIn: 7200 },
                (err, token) => {
                  res.status(200).json({
                    authorization: "true",
                    token: "Bearer " + token
                  });
                }
              );
            } else {
              errors.password = "Incorrect password";
              res.status(400).json(errors);
            }
          })
          .catch(err => console.log(err));
      } else {
        errors.username = "Username doesn't exist";
        res.status(400).json(errors);
      }
    })
    .catch(err => console.log(err));
});

//@route   /api/users/user
//@desc    returns the current user
//@access  Private
router.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      username: req.user.username,
      email: req.user.email,
      id: req.user.id
    });
  }
);

module.exports = router;
