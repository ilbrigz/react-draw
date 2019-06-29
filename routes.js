const express = require("express");
const router = express.Router();
const { addArtwork, getArtworks } = require("./controller");
router.get("/artworks", getArtworks);
router.post("/artwork", addArtwork);

module.exports = router;
