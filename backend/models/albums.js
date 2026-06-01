import mongoose from 'mongoose'

export default mongoose.model('Albums', new mongoose.Schema({
  id: {type: Number, required: true},
  name:       { type: String, required: true },
  cover:    String,
  artist:      String,
  bgColor: String,
  Songs: Array,
}, { timestamps: true }))