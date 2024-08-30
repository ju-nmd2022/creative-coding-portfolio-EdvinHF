function setup() {
  createCanvas(600, 800);
  background(255, 255, 255);
}
const cols = 10;
const rows = 15;
const squareSize = 40;

function draw() {
  noFill();
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let angle = random(-PI / 4, PI / 4) * y * 0.1 + random(-0.01, 0.01);
      push();
      translate(x * squareSize + 90, y * squareSize + 110);

      rotate(angle);
      rectMode(CENTER);
      rect(x, y, squareSize, squareSize);
      pop();
    }
  }
  noLoop();
}
