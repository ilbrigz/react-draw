const Artwork = require("./model");

const addArtwork = async (req, res, next) => {
  await Artwork.find({
    createdAt: { $lt: new Date(new Date().getTime() - 1 * 60 * 60 * 1000) }
  }).remove();
  const artwork = await new Artwork(req.body);
  await artwork.save();

  return res.status(200).json({ sucess: true });
};
const getArtwork = async (req, res, next) => {
  Artwork.findById(req.params.id)
    .then(artwork => {
      return res.status(200).json(artwork);
    })
    .catch(e => console.log(e));
};
const getArtworks = async (req, res, next) => {
  Artwork.find()
    .then(artworks => {
      return res.status(200).json(artworks);
    })
    .catch(e => console.log(e));
};
module.exports = { getArtworks, addArtwork, getArtwork };
