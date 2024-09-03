import Particle from "./ball.js";
let rows;
let cols;
let size = 50;
let xoff = 0;
let yoff = 0;
let zoff = 0;
let r = size / 2;
let arrows = [];
let increment = 0.1;
let p;

function setup() {
  createCanvas(400, 400);
  background(255);
  cols = width / size;
  rows = height / size;
  angleMode(DEGREES);
  p = new Particle(random(0, width),random(0, height));
  
}

function draw() {
  background(200);
  fill(255);
  xoff = 0;
  for (let i = 0; i < cols; i++) {
    arrows[i] = [];
    yoff = 0;
    for (let j = 0; j < rows; j++) {
      let angle = map(noise(xoff, yoff, zoff), 0, 1, 0, 360);
      rect(i * size, j * size, size, size);
      //text(round(angle, 2), i * size + size / 2, j * size + size / 2);
      arrows[i][j] = createVector(cos(angle), sin(angle));
      let pt0 = createVector(size / 2 + i * size, size / 2 + j * size);
      let pt1 = createVector(r * arrows[i][j].x, r * arrows[i][j].y);
      line(pt0.x, pt0.y, pt0.x + pt1.x, pt0.y + pt1.y);
      ellipse(pt0.x + pt1.x, pt0.y + pt1.y, 4);
      yoff += increment;
    }
    xoff += increment;
    zoff += increment / 70;
  }
  p.checkEdges();
  p.direction(arrows);
  p.update();
  p.display();
  console.log();
}





































