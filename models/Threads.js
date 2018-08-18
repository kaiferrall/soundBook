const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ThreadSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  members: [String],
  name: {
    type: String,
    required: true
  },
  description: String,
  private: {
    type: Boolean
  },
  comments: [
    {
      username: String,
      text: String,
      replies: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "users"
          },
          username: String,
          text: String,
          likes: [String]
        }
      ],
      likes: [String],
      date: String
    }
  ],
  date: {
    type: String
  }
});

module.exports = Thread = mongoose.model("threads", ThreadSchema);
