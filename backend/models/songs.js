import mongoose from "mongoose"

const songSchema = new mongoose.Schema({
    id: Number,
    name: String,
    src: String,
    cover: String,
    artist: String,
    duration: String,
});

export default mongoose.model("Song", songSchema, "songs");