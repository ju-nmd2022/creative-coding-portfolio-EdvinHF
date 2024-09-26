class Agent {
  constructor(x, y, maxSpeed, maxForce) {
    this.position = createVector(x, y);
    this.lastPosition = this.position.copy();
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce;
    this.flowInfluence = 0.5;
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  follow(flow) {
    let desired = flow.copy();
    desired.setMag(this.maxSpeed);
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce * this.flowInfluence);
    this.applyForce(steer);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  handleEdges() {
    if (this.position.x > width + 200) this.position.x = 0;
    if (this.position.x < -200) this.position.x = width;
    if (this.position.y > height + 200) this.position.y = 0;
    if (this.position.y < -200) this.position.y = height;
  }

  render() {
    noStroke();
    strokeWeight();
    push();
    translate(0, -200);
    rect(this.position.x, this.position.y, 5);
    this.lastPosition = this.position.copy();
    pop();
  }
}

let cellSize = 50;
let cols;
let rows;
let field = [];
let zOffset = 0;
let agents = [];

function setup() {
  createCanvas(innerWidth, innerHeight);
  cols = Math.ceil(width / cellSize);
  rows = Math.ceil(height / cellSize);

  for (let i = 0; i < 200; i++) {
    let agent = new Agent(
      random(width),
      random(0, 0),
      random(0.5, 3),
      random(0.05, 0.15)
    );
    agents.push(agent);
  }
}

function draw() {
  background(255, 255, 0);
  if (random(0, 101) > 50) {
    fill(255, 0, 0, 60);
  } else {
    fill(0, 0, 0, 60);
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let xOffset = i * 0.1;
      let yOffset = j * 0.1;
      let angle = noise(xOffset, yOffset, zOffset) * PI * 1.3;
      let flowVector = p5.Vector.fromAngle(angle);

      if (!field[i]) {
        field[i] = [];
      }
      field[i][j] = flowVector;
    }
  }

  for (let agent of agents) {
    let xIndex = Math.floor(agent.position.x / cellSize);
    let yIndex = Math.floor(agent.position.y / cellSize);

    if (xIndex >= 0 && xIndex < cols && yIndex >= 0 && yIndex < rows) {
      let flow = field[xIndex][yIndex];
      agent.follow(flow);
    }
    agent.update();
    agent.handleEdges();
    agent.render();
  }

  zOffset += 0.01;
}
