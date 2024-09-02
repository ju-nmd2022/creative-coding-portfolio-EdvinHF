function setup() {
  createCanvas(innerWidth, innerHeight);
  background(15, 15, 15);
}

const cols = 10;
const rows = 15;
const squareSize = 40;

function draw() {
  strokeWeight(0.5);
  noFill();
  translate((width - cols * squareSize) / 2, (height - rows * squareSize) / 2);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let angle = random(-PI / 4, PI / 4) * y * 0.1 + random(-0.01, 0.01);
      let colorValue = map(angle, -PI / 4, PI / 4, 0, 255);
      push();
      translate(x * squareSize, y * squareSize);
      stroke(colorValue, colorValue, colorValue);
      rotate(angle);
      rectMode(CENTER);
      rect(x, y, squareSize, squareSize);
      pop();
    }
  }
  noLoop();
}
