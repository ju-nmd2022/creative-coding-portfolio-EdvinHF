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

  seek(target) {
    let desired = p5.Vector.sub(target, this.position);
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);
    this.applyForce(steer);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  handleEdges() {
    if (this.position.x > width) this.position.x = 0;
    if (this.position.x < 0) this.position.x = width;
    if (this.position.y > height) this.position.y = 0;
    if (this.position.y < 0) this.position.y = height;
  }

  render(agentSize) {
    let distance = dist(
      this.position.x,
      this.position.y,
      this.lastPosition.x,
      this.lastPosition.y
    );

    if (distance < width / 2 && distance < height / 2) {
      stroke(235, 235, 255, 150);
      strokeWeight(agentSize);
      line(
        this.lastPosition.x,
        this.lastPosition.y,
        this.position.x,
        this.position.y
      );
    }

    this.lastPosition = this.position.copy();
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

  for (let i = 0; i < 100; i++) {
    let agent = new Agent(
      random(width),
      random(height),
      random(0.5, 3),
      random(0.05, 0.15)
    );
    agents.push(agent);
  }
}

function draw() {
  fill(5, 5, 100, 100);
  rect(0, 0, width, height);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let xOffset = i * 0.1;
      let yOffset = j * 0.1;
      let angle = noise(xOffset, yOffset, zOffset) * TWO_PI * 2;
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

    if (mouseIsPressed) {
      let mousePos = createVector(mouseX, mouseY);
      agent.seek(mousePos);
    }

    agent.update();
    agent.handleEdges();

    if (mouseIsPressed) {
      agent.render(random(1, 10));
    } else {
      agent.render(agent.maxSpeed * 1.5);
    }
  }
  zOffset += 0.02;
}
