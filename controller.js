const Artwork = require("./model");

const addArtwork = async (req, res, next) => {
  const artwork = await new Artwork(req.body);
  await artwork.save();

  return res.status(200).json(artwork);
};
const getArtworks = async (req, res, next) => {
  Artwork.find()
    .then(artwork => {
      return res.status(200).json(artwork);
    })
    .catch(e => console.log(e));
};
module.exports = { getArtworks, addArtwork };
