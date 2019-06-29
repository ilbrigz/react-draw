import React, { useState, useRef, useEffect } from "react";
import CanvasDraw from "react-canvas-draw";
import images from "./images";

function filterImages(id) {
  const imageToReturn = images.filter(item => item.id === id);
  return imageToReturn[0].largeImageURL;
}

const Artwork = ({ id }) => {
  const canvasRef = useRef(null);

  return (
    <div className="artwork-container">
      <img
        alt="hey"
        src={filterImages(id)}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "100%",
          maxHeight: "100%",

          zIndex: 9999
        }}
      />
      <CanvasDraw
        ref={canvasRef}
        canvasWidth={200}
        canvasHeight={200}
        disabled={true}
      />
    </div>
  );
};

const Artworks = () => {
  const [artworks, setArtworks] = useState([
    {
      id: 1813100
    },
    {
      id: 4288121
    },
    {
      id: 1813100
    },
    {
      id: 4288121
    },
    {
      id: 1813100
    },
    {
      id: 4288121
    }
  ]);
  return (
    <div className="artworks-wrapper">
      <h3>See what the last 10 artwork was.</h3>
      <div className="artworks-container">
        {artworks.map(art => (
          <Artwork key={art.id} id={art.id} />
        ))}
      </div>
    </div>
  );
};

export default Artworks;
