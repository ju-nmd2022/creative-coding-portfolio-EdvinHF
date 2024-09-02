function setup() {
  createCanvas(innerWidth, innerHeight);
  background(255, 255, 254);
  stroke(20, 20, 20);
  strokeWeight(0.7);
}
const cols = 10;
const rows = 15;
const squareSize = 40;

function draw() {
  noFill();
  translate((width - cols * squareSize) / 2, (height - rows * squareSize) / 2);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let angle = random(-PI / 4, PI / 4) * y * 0.1 + random(-0.01, 0.01);
      push();
      translate(x * squareSize, y * squareSize);

      rotate(angle);
      rectMode(CENTER);
      rect(x, y, squareSize, squareSize);
      pop();
    }
  }
  noLoop();
}
