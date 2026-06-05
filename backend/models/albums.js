import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
  id: Number,
  name: String,
  cover: String,
  artist: String,
  bgColor: String,
  songs: [Number],
});

export default mongoose.model("Album", albumSchema, "albums");