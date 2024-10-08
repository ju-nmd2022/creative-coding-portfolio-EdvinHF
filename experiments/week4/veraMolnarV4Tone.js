let synth;
let isPlaying = false;
let initialized = false;
let distortion;
let reverb;
let volume;
const size = 60;
const cols = 9;
const rows = 6;
let time = 0;
let r = 0;
let g = 0;
let b = 255;

function setup() {
  createCanvas(innerWidth, innerHeight);
  startAudio();
}

function startAudio() {
  window.addEventListener("click", async () => {
    if (!initialized) {
      
      distortion = new Tone.Distortion(0).toDestination();
      reverb = new Tone.Reverb(2).connect(distortion);
      synth = new Tone.PolySynth().connect(reverb);
      initialized = true;
    }
  });
}

function getRandomValue(pos, variance) {
  return pos + map(Math.random(), 0, 1, -variance, variance);
}

function drawLayers(x, y, size, layers) {
  const variance = size / 10;
  noFill();
  strokeWeight(0.4);
  const exLayers = layers * layers;

  for (let i = exLayers; i > 0; i--) {
    const spacing = 2;
    const squareResizer = 10;
    const layerSize = (size - (layers - i) * spacing) / squareResizer;

    beginShape();
    vertex(
      getRandomValue(x - layerSize, variance),
      getRandomValue(y - layerSize, variance)
    );
    vertex(
      getRandomValue(x + layerSize, variance),
      getRandomValue(y - layerSize, variance)
    );
    vertex(
      getRandomValue(x + layerSize, variance),
      getRandomValue(y + layerSize, variance)
    );
    vertex(
      getRandomValue(x - layerSize, variance),
      getRandomValue(y + layerSize, variance)
    );
    endShape(CLOSE);
  }
}

function draw() {
  background(2, 2, 202);
  translate((width - cols * size) / 2, (height - rows * size) / 2);
  stroke(r, g, b);

  const gridX = (width - cols * size) / 2;
  const gridY = (height - rows * size) / 2;
  const gridWidth = cols * size;
  const gridHeight = rows * size;
  let breathing = map(sin(time), -1, 1, 0.5, 1.5);

  for (let y = 0; y < rows; y++) {
    for (let col = 0; col < cols; col++) {
      let layers = (cols + 1) / 2 - Math.abs((cols - 1) / 2 - col);
      let Nsize = size;
      Nsize = size * breathing;
      drawLayers(size / 2 + col * size, size / 2 + y * size, Nsize, layers);
    }
  }
  if (initialized) {
    let distortionAmount = map(time, 0, 7, 0, 1);
    let reverbAmount = map(breathing, 0.5, 1.5, 0, 1);
    distortion.distortion = distortionAmount;
    reverb.reverb = reverbAmount;
  }
  if (
    mouseX > gridX &&
    mouseX < gridX + gridWidth &&
    mouseY > gridY &&
    mouseY < gridY + gridHeight
  ) {
    b -= 3;
    r += 3;
    time += 0.04;

    if (initialized && !isPlaying) {
      synth.triggerAttack("C3");
      hasPlayed = true;
    }
  } else {
    time -= 0.09;
    b += 3;
    r -= 3;
    isPlaying = false;
  }
  if (isPlaying) {
    synth.triggerRelease();
    isPlaying = false;
  }

  b = constrain(b, 0, 255);
  r = constrain(r, 0, 255);
  time = constrain(time, 0, 7);
  time = max(time, 0);
 
}
