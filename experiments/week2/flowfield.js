let rows;
let cols;
let size = 50;
let xoff = 0;
let yoff = 0;
let zoff = 0;
let r = size / 2;
let arrows = [];
let increment = 0.2;
let particles = [];
let num = 1000;

class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.lastPosition = createVector(x, y);
    this.velocity = createVector(1, 0);
    this.acceleration = createVector(0, 0);
  }

  update() {
    this.lastPosition = this.position.copy();
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.velocity.limit(2);
    this.acceleration.mult(0);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  direction(flowfield) {
    let i = floor(this.position.x / size);
    let j = floor(this.position.y / size);
    i = constrain(i, 0, cols - 1);
    j = constrain(j, 0, rows - 1);
    let force = flowfield[i][j];
    this.applyForce(force);
  }

  display() {
    push();
    noStroke();
    fill(0, 0, 0, 50);
    ellipse(this.position.x, this.position.y, 2, 1);
    pop();
  }

  checkEdges() {
    if (this.position.x > width) {
      this.position.x = 0;
      this.lastPosition.x = 0;
    }
    if (this.position.x < 0) {
      this.position.x = width;
      this.lastPosition.x = width;
    }
    if (this.position.y > height) {
      this.position.y = 0;
      this.lastPosition.y = 0;
    }
    if (this.position.y < 0) {
      this.position.y = height;
      this.lastPosition.y = height;
    }
  }
}

function setup() {
  createCanvas(800, 800);
  background(255, 255, 255);
  cols = width / size;
  rows = height / size;
  angleMode(DEGREES);

  // Initialize particles
  for (let i = 0; i < num; i++) {
    particles[i] = new Particle(random(0, width), random(0, height));
  }
}

function draw() {
  xoff = 0;
  noStroke();

  // Create the flow field based on Perlin noise with slight mouse influence
  for (let i = 0; i < cols; i++) {
    arrows[i] = [];
    yoff = 0;
    for (let j = 0; j < rows; j++) {
      // Calculate angle based on Perlin noise
      let angle = map(noise(xoff, yoff, zoff), 0, 1, 0, 360);

      // Generate flow vector based mostly on noise
      let flow = createVector(cos(angle), sin(angle));

      // Slight mouse influence, but reduce the impact by 0.1
      let mouseInfluence = createVector(mouseX - i * size, mouseY - j * size);
      mouseInfluence.setMag(0.1); // Set a very small magnitude for the influence

      // Add mouse influence to flow
      flow.add(mouseInfluence);
      arrows[i][j] = flow.normalize(); // Normalize to keep consistent vector strength

      yoff += increment;
    }
    xoff += increment;
    zoff += increment / 70;
  }

  // Move and update particles only if the mouse is pressed
  if (mouseIsPressed) {
    for (let i = 0; i < num; i++) {
      particles[i].checkEdges();
      particles[i].direction(arrows);
      particles[i].update();
      particles[i].display();
    }
  }
}
