const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
  albumId: {
    type: String,
    required: true
  },
  cover: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  date: {
    type: String
  }
});

module.exports = Album = mongoose.model("albums", AlbumSchema);
