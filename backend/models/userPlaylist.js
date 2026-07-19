import mongoose from "mongoose";

const userPlaylistSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  cover: {
    type: String,
    default: ""
  },
  description: {
    type: String,
    default: ""
  },
  songs: {
    type: [Number],
    default: []
  }
});

export default mongoose.model("UserPlaylist", userPlaylistSchema, "userPlaylist");
