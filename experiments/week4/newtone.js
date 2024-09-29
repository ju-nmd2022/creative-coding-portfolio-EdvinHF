let synth;
let initialized = false;
let distortion;
let reverb;
const size = 60;
const cols = 9;
const rows = 6;
let time = 0;
let r = 0;
let g = 0;
let b = 255;
let currentNote = null;

const notesGrid = [
  ["G6", "G5", "G4", "G3", "G2", "G3", "G4", "G5", "G6"],
  ["A6", "A5", "A4", "A3", "A2", "A3", "A4", "A5", "A6"],
  ["B6", "B5", "B4", "B3", "B2", "B3", "B4", "B5", "B6"],
  ["C6", "C5", "C4", "C3", "C2", "C3", "C4", "C5", "C6"],
  ["D6", "D5", "D4", "D3", "D2", "D3", "D4", "D5", "D6"],
  ["E6", "E5", "E4", "E3", "E2", "E3", "E4", "E5", "E6"],
];

function setup() {
  createCanvas(innerWidth, innerHeight);
  startAudio();
}

function startAudio() {
  window.addEventListener("click", async () => {
    if (!initialized) {
      vol = new Tone.Volume(-20).toDestination();
      distortion = new Tone.Distortion(0).connect(vol);
      reverb = new Tone.Reverb().connect(distortion);
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

  const gridX = (width - cols * size) / 2;
  const gridY = (height - rows * size) / 2;
  const gridWidth = cols * size;
  const gridHeight = rows * size;
  let breathing = map(sin(time), -1, 1, 0.5, 1.5);
  //ChatGPT helped me with the logic behind mouse position/detection.
  let colIndex = Math.floor((mouseX - gridX) / size);
  let rowIndex = Math.floor((mouseY - gridY) / size);

  for (let y = 0; y < rows; y++) {
    let alpha = map(y, 0, rows - 1, 70, 255);
    if (
      mouseX > gridX &&
      mouseX < gridX + gridWidth &&
      mouseY > gridY &&
      mouseY < gridY + gridHeight &&
      initialized
    ) {
      stroke(r, g, b, alpha);
    } else {
      stroke(r, g, b);
      noFill();
    }

    for (let col = 0; col < cols; col++) {
      if (y === rowIndex && col === colIndex && initialized) {
        fill(2, 2, 242, 30);
      } else {
        noFill();
      }
      let layers = (cols + 1) / 2 - Math.abs((cols - 1) / 2 - col);
      let Nsize = size;
      Nsize = size * breathing;
      drawLayers(size / 2 + col * size, size / 2 + y * size, Nsize, layers);
    }
  }

  if (initialized) {
    let distortionAmount = map(time, 0, 7, 0, 0.8);
    let reverbAmount = map(breathing, 0.5, 1.5, 0, 0.8);
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

    let note = notesGrid[rowIndex][colIndex];

    if (initialized && currentNote !== note) {
      if (currentNote) {
        synth.triggerRelease(currentNote);
      }
      synth.triggerAttack(note);
      currentNote = note;
    }
  } else {
    time -= 0.09;
    b += 3;
    r -= 3;
    if (currentNote) {
      synth.triggerRelease(currentNote);
      currentNote = null;
    }
  }

  b = constrain(b, 0, 255);
  r = constrain(r, 0, 255);
  time = constrain(time, 0, 7);
  time = max(time, 0);
}
