const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const followingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users"
    },
    name: {
      type: String
    },
    profileImage: {
      type: String
    }
  },
  { _id: false }
);
