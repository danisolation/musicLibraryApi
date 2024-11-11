const mongoose = require("mongoose");

const trackSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    album: { type: String },
    genre: { type: String },
    releaseYear: { type: String },
    duration: { type: String },
    lyric: { type: String },
    filePath: { type: String, required: true },
  },
  { timestamps: true }
);



module.exports = mongoose.model("Track", trackSchema);
