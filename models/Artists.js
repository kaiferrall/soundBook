const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  artistId: {
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
  popularity: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  }
});

module.exports = Artist = mongoose.model("artists", ArtistSchema);
