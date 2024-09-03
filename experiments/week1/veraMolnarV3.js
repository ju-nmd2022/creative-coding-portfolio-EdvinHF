function setup() {
  createCanvas(innerWidth, innerHeight);
}
// Based on Garrits code
const size = 60;
const cols = 9;
const rows = 6;

function getRandomValue(pos, variance) {
  return pos + map(Math.random(), 0, 1, -variance, variance);
}

function drawLayers(x, y, size, layers) {
  const variance = size / 10;
  noFill();
  strokeWeight(0.4);
  const exLayers = layers * layers;

  for (let i = exLayers; i > 0; i--) {
    const spacing = 2;
    const squareResizer = 10;
    const layerSize = (size - (layers - i) * spacing) / squareResizer;

    beginShape();
    vertex(
      getRandomValue(x - layerSize, variance),
      getRandomValue(y - layerSize, variance)
    );
    vertex(
      getRandomValue(x + layerSize, variance),
      getRandomValue(y - layerSize, variance)
    );
    vertex(
      getRandomValue(x + layerSize, variance),
      getRandomValue(y + layerSize, variance)
    );
    vertex(
      getRandomValue(x - layerSize, variance),
      getRandomValue(y + layerSize, variance)
    );
    endShape(CLOSE);
  }
}

function draw() {
  background(25, 2, 2);
  translate((width - cols * size) / 2, (height - rows * size) / 2);
  stroke(255, 255, 255);

  for (let y = 0; y < rows; y++) {
    for (let col = 0; col < cols; col++) {
      let layers = (cols + 1) / 2 - Math.abs((cols - 1) / 2 - col);
      drawLayers(size / 2 + col * size, size / 2 + y * size, size, layers);
    }
  }
}
function keyPressed() {
  if (key === "s" || key === "S") {
    saveCanvas("myArtwork", "png");
  }
}
