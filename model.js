const mongoose = require("mongoose");

const artworkSchema = new mongoose.Schema({
  canvasData: {
    type: String,
    trim: true,
    required: true
  },
  imageId: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Artwork", artworkSchema);
