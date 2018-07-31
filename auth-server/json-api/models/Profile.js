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
  profileImage: {
    type: String,
    require: true
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
  Artists: [
    {
      artist: {
        type: Schema.Types.ObjectId,
        ref: "artists"
      }
    }
  ],
  Albums: [
    {
      artist: {
        type: Schema.Types.ObjectId,
        ref: "albums"
      }
    }
  ],
  Tracks: [
    {
      artist: {
        type: Schema.Types.ObjectId,
        ref: "tracks"
      }
    }
  ],
  followers: [String],

  following: [String],
  Date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Profile = mongoose.model("profiles", ProfileSchema);
