import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import CanvasDraw from "react-canvas-draw";
import ColorPicker from "./colorPicker";
import images from "./images";
import Tools from "./tools.js";
import Artworks from "./Artworks";

import "./styles.css";
function App() {
  const [brushColor, setBrusholor] = useState("#444");
  const [lastPenColor, setLastPenColor] = useState("#444");
  const [canvasImage, setCanvassImage] = useState({});
  const [brushRadius, setBrushRadius] = useState(30);
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    axios.get("/api/artworks").then(result => setArtworks(result.data));
  }, []);

  // const [savedData, setSavedData] = useState('');

  const canvasRef = useRef(null);
  const canvasRef2 = useRef(null);
  useEffect(() => {
    setCanvassImage(images[1]);
  }, []);
  const handleColorChange = React.useCallback(color => {
    const {
      rgb: { r, g, b, a }
    } = color;
    setBrusholor(`rgba(${r}, ${g}, ${b},${a})`);
    setLastPenColor(`rgba(${r}, ${g}, ${b},${a})`);
  }, []);
  const toolChange = React.useCallback(
    (tool, size) => {
      if (tool === "eraser") {
        setBrusholor("#ffffff");
      }
      if (tool === "pen") {
        setBrusholor(lastPenColor);
      }
    },
    [lastPenColor]
  );
  const handleChangeImage = id => {
    const newImage = images.find(item => id === item.id);
    setCanvassImage(newImage);
    canvasRef.current.clear();
  };
  const saveData = id => {
    const data = canvasRef.current.getSaveData();
    const ran1 = Math.floor(Math.random() * 6 + 5);
    const ran2 = Math.floor(Math.random() * 6 + 4);
    let answer = prompt(`What is ${ran1} multiplied to ${ran2}`);
    if (answer == ran2 * ran1) {
      alert("Wow you got it right. We are saving it now!");
      axios
        .post("/api/artwork", { canvasData: data, imageId: id })
        .then(data => console.log(data))
        .catch(e => console.log(e));
      axios.get("/api/artworks").then(result => setArtworks(result.data));
    } else {
      alert("Oops! Don't give up");
    }
  };
  return (
    <div className="App">
      <h1>Faeiien Art</h1>
      <div className="previews-wrapper">
        {images.map(picture => (
          <div
            key={picture.id}
            onClick={() => handleChangeImage(picture.id)}
            className="preview-container"
          >
            <img
              className="preview-image"
              src={`/${picture.previewURL}`}
              key={picture.id}
              alt={picture.tag}
            />
          </div>
        ))}
      </div>
      <div className="container">
        <div className="main-container">
          <ColorPicker
            brushColor={brushColor}
            handleColorChange={handleColorChange}
          />
          <div className="canvass-container">
            <img
              className="overlay-image"
              src={`/${canvasImage.largeImageURL}`}
              alt="hey"
            />
            <CanvasDraw
              ref={canvasRef}
              brushColor={brushColor}
              brushRadius={brushRadius}
              lazyRadius={5}
            />
          </div>
          <Tools
            setBrushRadius={setBrushRadius}
            handleToolChange={toolChange}
            canvasRef={canvasRef}
            brushRadius={brushRadius}
            immediateLoading={true}
          />
          <button
            className="publish-btn"
            onClick={() => saveData(canvasImage.id)}
          >
            {" "}
            publish artwork{" "}
          </button>
        </div>

        <Artworks artworks={artworks} />
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
