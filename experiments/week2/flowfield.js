//not a submition code is based on this video https://www.youtube.com/watch?v=KOgRn2Brcdo and chatgpt.
let rows;
let cols;
let size = 12.5;
let xoff = 0;
let yoff = 0;
let zoff = 0;
let r = size / 2;
let arrows = [];
let increment = 0.2;
let particles = [];
let num = 100000;
let randomColor;

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
    randomColor = random(0,100);

  if(randomColor > 50 ){

    fill(210, 0, 0, 10);

  }else{

    fill(0, 0, 0, 10);

  }
    rect(this.position.x, this.position.y, 1, 3);
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
  background(250, 250, 247);
  cols = width / size;
  rows = height / size;
  angleMode(DEGREES);

 
  for (let i = 0; i < num; i++) {
    particles[i] = new Particle(random(0, width), random(0, height));
  }
}

function draw() {
  xoff = 0;
  noStroke();

  for (let i = 0; i < cols; i++) {
    arrows[i] = [];
    yoff = 0;
    for (let j = 0; j < rows; j++) {
     
      let angle = map(noise(xoff, yoff, zoff), 0, 1, 0, 360);
      let flow = createVector(cos(angle), sin(angle));
      let mouseInfluence = createVector(mouseX - i * size, mouseY - j * size);
      mouseInfluence.setMag(0.5); 

      flow.add(mouseInfluence);
      arrows[i][j] = flow.normalize(); 

      yoff += increment;
    }
    xoff += increment;
    zoff += increment / 70;
  }

  if (mouseIsPressed) {
    for (let i = 0; i < num; i++) {
      particles[i].checkEdges();
      particles[i].direction(arrows);
      particles[i].update();
      particles[i].display();
    }
  }
}
