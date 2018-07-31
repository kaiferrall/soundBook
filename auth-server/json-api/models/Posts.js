const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  username: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  title: {
    type: String
  },
  likes: [String],
  tags: [String],
  date: {
    type: String
  },
  mongoDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model("posts", PostSchema);
