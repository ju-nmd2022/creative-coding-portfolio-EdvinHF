export default class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
  }

  update() {
    this.velocity.add(this.acceleration);
  }

  display() {
    ellipse(this.position.x, this.position.y, 10, 10);
  }
}
