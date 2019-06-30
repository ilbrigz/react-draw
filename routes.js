const express = require("express");
const router = express.Router();
const { addArtwork, getArtworks, getArtwork } = require("./controller");
router.get("/artworks", getArtworks);
router.get("/artwork/:id", getArtwork);
router.post("/artwork", addArtwork);

module.exports = router;
