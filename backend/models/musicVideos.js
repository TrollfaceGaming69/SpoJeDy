import mongoose from 'mongoose'

const musicVideoSchema = new mongoose.Schema({
    id: Number,
    name: String,
    src: String,
    cover: String,
    artist: String,
});

export default mongoose.model("MusicVideos", musicVideoSchema);