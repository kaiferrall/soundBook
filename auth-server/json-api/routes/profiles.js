const express = require("express");
const router = express.Router();
const passport = require("passport");
const Profile = require("../models/Profile");

const validateProfile = require("../validation/validateProfile");

//@route   /api/profiles/test
//@desc    test json response
//@access  Public
router.get("/test", (req, res) => {
  res.json("test");
});

//@route   /api/profiles/create
//@desc    User creates or edits their profile
//@access  Private
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { isValid, errors } = validateProfile(req.body);
    if (!isValid) {
      res.status(400).json(errors);
    }

    const profileInput = {};
    profileInput.user = req.user.id;
    if (req.body.name) profileInput.name = req.body.name;
    if (req.body.bio) profileInput.bio = req.body.bio;
    profileInput.socials = {};
    if (req.body.twitter) {
      profileInput.socials.twitter = req.body.twitter;
    } else profileInput.socials.twitter = "";
    if (req.body.instagram) {
      profileInput.socials.instagram = req.body.instagram;
    } else profileInput.socials.instagram = "";
    if (req.body.facebook) {
      profileInput.socials.facebook = req.body.facebook;
    } else profileInput.socials.facebook = "";
    if (typeof req.body.tags !== "undefine") {
      profileInput.tags = req.body.tags.toString().split(",");
    }

    User.findById(req.user.id).then(user => {
      if (user) {
        Profile.findOne({ user: req.user.id })
          .then(profile => {
            if (profile) {
              profileInput.username = user.username;
              console.log(profileInput);
              Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileInput },
                { new: true }
              ).then(profile => {
                res.status(200).json(profile);
              });
            } else {
              profileInput.username = user.username;
              new Profile(profileInput).save().then(profile => {
                res.status(201).json(profile);
              });
            }
          })
          .catch(err => console.log(err));
      }
    });
  }
);

//@route   /api/profiles/followers
//@desc    Returns all the followers of that profile
//@access  Private
router.get(
  "/followers",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userId = req.user.id;
    const projection = {
      Date: 0,
      _id: 0,
      socials: 0,
      Artists: 0,
      Albums: 0,
      Tracks: 0,
      bio: 0,
      followers: 0,
      following: 0,
      tags: 0
    };
    Profile.findOne({ user: userId }).then(profile => {
      const followersArray = profile.followers;
      Profile.find({ user: { $in: followersArray } }, projection)
        .then(profiles => {
          res.status(200).json(profiles);
        })
        .catch(err => console.log(err));
    });
  }
);

//@route   /api/profiles/following
//@desc    Returns all the following of that profile
//@access  Private
router.get(
  "/following",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userId = req.user.id;
    const projection = {
      Date: 0,
      _id: 0,
      socials: 0,
      Artists: 0,
      Albums: 0,
      Tracks: 0,
      bio: 0,
      followers: 0,
      following: 0,
      tags: 0
    };
    Profile.findOne({ user: userId }).then(profile => {
      const followingArray = profile.following;
      Profile.find({ user: { $in: followingArray } }, projection)
        .then(profiles => {
          res.status(200).json(profiles);
        })
        .catch(err => console.log(err));
    });
  }
);

//@route   /api/profiles
//@desc    Returns the current users profile
//@access  Private
router.post(
  "/follow/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userId_following = req.user.id;
    const userId_followed = req.params.id;
    const errors = {};

    Profile.findOne({ user: userId_following }).then(profile_following => {
      Profile.findOne({ user: userId_followed }).then(profile_followed => {
        const filter = profile_followed.followers.filter(
          followers => followers === userId_following
        );
        if (filter.length > 0) {
          errors.following = "Already following";
          res.status(400).json(errors);
        } else {
          profile_followed.followers.push(userId_following);
          profile_following.following.push(userId_followed);
          profile_followed.save().then(profile => {
            profile_following.save().then(profile2 => {
              res.status(200).json({ followed: profile, following: profile2 });
            });
          });
        }
      });
    });
  }
);

//@route   /api/profiles
//@desc    Returns the current users profile
//@access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userId = req.user.id;
    Profile.findOne({ user: userId }).then(profile => {
      if (profile) {
        res.status(200).json(profile);
      } else {
        res.status(204).json("No profile");
      }
    });
  }
);

//@route   /api/profiles
//@desc    Returns the current users profile
//@access  Private
router.post("/search", (req, res) => {
  const errors = {};
  const searchData = req.body.search;
  const query = new RegExp(searchData);
  const projection = {
    socials: 0,
    Artists: 0,
    Albums: 0,
    Tracks: 0,
    followers: 0,
    following: 0
  };
  Profile.find({ username: { $regex: query, $options: "i" } }, projection)
    .then(profiles => {
      if (profiles.length > 0) {
        res.status(200).json(profiles);
      } else {
        errors.profiles = "No profiles found";
        res.status(404).json(errors);
      }
    })
    .catch(err => console.log(err));
});

module.exports = router;
