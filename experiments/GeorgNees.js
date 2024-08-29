function setup() {
  createCanvas(600, 800);
  background(255, 255, 244);
}
let cols = 10;
let rows = 15;
let squareSize = 40;

function draw() {
  noFill();
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let angle = random(-PI / 4, PI / 4) * y * 0.1 + random(-0.01, 0.01);
      push();
      translate(x * squareSize + 110, y * squareSize + 110);
      const c = color(255, 127, 80);
      const alpha = 1;
      c.setAlpha(alpha);
      stroke(c);
      rotate(angle);
      rectMode(CENTER);
      rect(x, y, squareSize, squareSize);
      pop();
    }
  }
  noLoop();
}
