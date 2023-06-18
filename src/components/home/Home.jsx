import React, { useState, useRef, useEffect } from "react";
import "./Home.css";

export const Home = () => {
  const canvasRef = useRef(null);
  const [textTop, setTextTop] = useState("I use coding torque to learn");
  const [textBottom, setTextBottom] = useState(
    "web development by creating projects"
  );
  const [textSizeTop, setTextSizeTop] = useState(10);
  const [textSizeBottom, setTextSizeBottom] = useState(10);
  const [trueSize, setTrueSize] = useState(false);

  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedImageURL, setUploadedImageURL] = useState("");
  const [imgURL, setImgURL] = useState(
    "https://imgflip.com/s/meme/The-Most-Interesting-Man-In-The-World.jpg"
  ); // Replace with your default image URL

  const handleImageURLChange = (event) => {
    setImgURL(event.target.value);
  };

  const handleImgFileChange = (event) => {
    const file = event.target.files[0];
    setUploadedImage(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImageURL(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    // It retrieves the canvas element and the 2D rendering context
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const padding = 15;

    // onload event handler is triggered when the image has finished loading.
    const image = new Image();
    image.onload = () => {
      // checks if imgURL is defined. If it is, it sets the canvas width and height to match the loaded image's dimensions using canvas.width = image.width and canvas.height = image.height. It then draws the image on the canvas using ctx.drawImage(image, 0, 0, canvas.width, canvas.height).
      if (imgURL) {
        canvas.width = image.width;
        canvas.height = image.height;
        // draw the url or upload image on the canvas
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      }
      draw();
    };

    const draw = () => {
      // uppercase the text
      const top = textTop.toUpperCase();
      const bottom = textBottom.toUpperCase();

      // set appropriate canvas size
      canvas.width = image.width;
      canvas.height = image.height;

      // draw the image
      // the image is drawn on the canvas starting from the top-left corner and covering the entire canvas area.
      // image: The image object to draw. In this case, it refers to the image variable, which is an instance of the Image class.
      // 0, 0: The coordinates (x and y) on the canvas where the top-left corner of the image will be placed. In this case, 0, 0 means the image will be drawn starting from the top-left corner of the canvas.
      // canvas.width, canvas.height: The width and height of the image to be drawn on the canvas. In this case, it matches the dimensions of the canvas itself, ensuring that the image fills the entire canvas.
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      // styles
      ctx.fillStyle = "#fff";
      ctx.strokeStyle = "#000";
      ctx.lineWidth = canvas.width * 0.004;

      // By using a percentage value and scaling it based on the canvas width, the text size can be adjusted dynamically depending on the size of the canvas, making it responsive and adaptable to different screen sizes or user preferences.
      const _textSizeTop = (textSizeTop / 100) * canvas.width;
      const _textSizeBottom = (textSizeBottom / 100) * canvas.width;

      // draw top text
      ctx.font = `${_textSizeTop}px Impact`;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      // fillText(text, x coordinate, y coordinate)
      ctx.fillText(top, canvas.width / 2, padding);
      ctx.strokeText(top, canvas.width / 2, padding);

      // draw bottom text
      ctx.font = `${_textSizeBottom}px Impact`;
      ctx.textBaseline = "bottom";
      // actualBoundingBoxAscent: text height
      const bottomHeight = ctx.measureText(bottom).actualBoundingBoxAscent;
      // fillText(text, x, y): draws a text string at the specified coordinates, filling the string's characters with the current fillStyle.
      ctx.fillText(
        bottom,
        canvas.width / 2,
        canvas.height - padding - bottomHeight
      );
      // strokeText(text, x, y):draws the outlines of text string
      ctx.strokeText(
        bottom,
        canvas.width / 2,
        canvas.height - padding - bottomHeight
      );
    };

    if (uploadedImage) {
      image.src = URL.createObjectURL(uploadedImage);
      image.onload = () => {
        draw();
      };
    } else {
      image.src = imgURL;
    }
  }, [textTop, textBottom, textSizeTop, textSizeBottom, uploadedImage, imgURL]);

  const handleTextTopChange = (event) => {
    setTextTop(event.target.value);
  };

  const handleTextBottomChange = (event) => {
    setTextBottom(event.target.value);
  };

  const handleTextSizeTopChange = (event) => {
    setTextSizeTop(parseInt(event.target.value));
  };

  const handleTextSizeBottomChange = (event) => {
    setTextSizeBottom(parseInt(event.target.value));
  };

  const handleExportClick = () => {
    const canvas = canvasRef.current;

    // Convert the canvas to a data URL
    const dataURL = canvas.toDataURL("image/png");

    // Create a download link
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "MyMeme.png";
    link.click();
  };

  return (
    <>
      <div className="full-page">
        <div className="header">
          <h1>Meme Generator React Version</h1>
          <div></div>
        </div>
        <div className="container">
          <div>
            <div id="canvasWrapper">
              {uploadedImageURL && (
                <div>
                  <img src={uploadedImageURL} alt="Uploaded Image" />
                </div>
              )}
              <canvas ref={canvasRef}></canvas>
            </div>
          </div>

          <div className="memeForm">
            <h2>Source Image</h2>
            <div className="box">
              <div>
                <p>From URL</p>
                <div className="text_input">
                  <input
                    id="imgURL"
                    className="input"
                    type="text"
                    placeholder="Link to image"
                    value={imgURL}
                    onChange={handleImageURLChange}
                  />
                </div>
              </div>
              <div>
                <p>Upload from your device</p>
                <input
                  id="imgFile"
                  type="file"
                  accept="image/*"
                  onChange={handleImgFileChange}
                />
              </div>
            </div>
            <hr class="gradient-line" />
            <h2 style={{ marginTop: "10px" }}>Meme Text</h2>
            <div className="box">
              <div>
                <p>Top Text</p>
                <div className="text_input">
                  <input
                    id="textTop"
                    type="text"
                    className="input"
                    placeholder="Top text"
                    value={textTop}
                    onChange={handleTextTopChange}
                  />
                </div>
              </div>
              <div>
                <p>Bottom Text</p>
                <div className="text_input">
                  <input
                    id="textBottom"
                    type="text"
                    className="input"
                    placeholder="Bottom text"
                    value={textBottom}
                    onChange={handleTextBottomChange}
                  />
                </div>
              </div>
            </div>
            <hr class="gradient-line" />
            <h2>Text Size</h2>
            <div className="box">
              <div>
                <p>
                  Top Text: <span id="textSizeTopOut">{textSizeTop}</span>
                </p>
                <div className="sliderContainer">
                  <input
                    id="textSizeTop"
                    type="range"
                    min="2"
                    max="50"
                    step="2"
                    value={textSizeTop}
                    onChange={handleTextSizeTopChange}
                  />
                </div>
              </div>
              <div>
                <p>
                  Bottom Text:{" "}
                  <span id="textSizeBottomOut">{textSizeBottom}</span>
                </p>
                <div className="sliderContainer">
                  <input
                    id="textSizeBottom"
                    type="range"
                    min="2"
                    max="50"
                    step="2"
                    value={textSizeBottom}
                    onChange={handleTextSizeBottomChange}
                  />
                </div>
              </div>
            </div>

            <div className="box">
              <div>
                <h4>Preview Size</h4>
                <input
                  id="trueSize"
                  type="checkbox"
                  checked={trueSize}
                  onChange={() => setTrueSize(!trueSize)}
                />
                <label htmlFor="trueSize">
                  <span>Show true size</span>
                </label>
              </div>
            </div>
            <div>
              <button className="a1" onClick={handleExportClick}>
                CREATE
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
