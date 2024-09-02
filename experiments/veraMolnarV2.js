function setup() {
  createCanvas(800, 500);
  background(20, 20, 20);
  frameRate(20);
}
// Based on Garrits code
const size = 60;
//uneven number
const cols = 9;
const rows = 6;

function getRandomValue(pos, variance) {
  return pos + map(Math.random(), 0, 1, -variance, variance);
}

function drawLayers(x, y, size, layers) {
  const variance = size / 10;
  noFill();
  strokeWeight(0.1);
  const exLayers = layers * layers * 0.5;

  for (let i = 0; i < exLayers; i++) {
    const spacing = 1;
    const layerSize = (size - i * spacing) / 2;
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
  translate((width - cols * size) / 2, (height - rows * size) / 2);
  stroke(255, 50, 50);

  for (let y = 0; y < rows; y++) {
    for (let col = 0; col < cols; col++) {
      let layers = (cols + 1) / 2 - Math.abs((cols - 1) / 2 - col);
      drawLayers(size / 2 + col * size, size / 2 + y * size, size, layers);
    }
  }
}
