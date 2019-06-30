import React, { useState, useRef, useEffect } from "react";
import CanvasDraw from "react-canvas-draw";
import images from "./images";
import axios from "axios";

function filterImages(id) {
  const imageToReturn = images.filter(item => item.id == id);

  return imageToReturn[0].largeImageURL;
}

const Artwork = ({ id, data }) => {
  const [canvassData, setCanvassData] = useState("");
  const canvasRef = useRef(null);
  useEffect(() => {
    canvasRef.current.loadSaveData(data);
  }, [data]);
  return (
    id && (
      <div className="artwork-container">
        <img
          alt="whatever"
          src={`/${filterImages(id)}`}
          className="artwork-image"
        />
        <CanvasDraw
          ref={canvasRef}
          canvasWidth={200}
          canvasHeight={200}
          disabled={true}
        />
      </div>
    )
  );
};

const Artworks = ({ artworks }) => {
  return (
    !!artworks.length && (
      <div className="artworks-wrapper">
        <h3>Check out the artworks in the last 24 hours.</h3>
        <div className="artworks-container">
          {artworks.map(art => (
            <Artwork
              artworks={artworks}
              key={art._id}
              id={art.imageId}
              data={art.canvasData}
            />
          ))}
        </div>
      </div>
    )
  );
};

export default Artworks;
