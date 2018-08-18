const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  username: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  bio: {
    type: String,
    required: true
  },
  tags: [String],
  socials: {
    twitter: {
      type: String,
      require: true
    },
    facebook: {
      type: String,
      require: true
    },
    instagram: {
      type: String,
      require: true
    }
  },
  Threads: [String],
  Artists: [String],
  Albums: [String],
  Tracks: [String],
  followers: [String],
  following: [String],
  Date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Profile = mongoose.model("profiles", ProfileSchema);
