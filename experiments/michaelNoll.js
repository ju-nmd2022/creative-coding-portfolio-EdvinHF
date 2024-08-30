function setup() {
    createCanvas(600, 600);
    background(255, 255, 255);
}

const rows = 5;
const cols = 5;

function draw() {
    fill(0, 0, 0);
    noStroke();
    
    const centerX = 300;
    const centerY = 300;
    const radius = 150;  // Adjust the radius as needed

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {  
            push();
            
            let r = 0;
            const coinflip = random(0, 100);
            
            if (coinflip > 50) {
                r = PI / 2;
            }

            // Calculate angle and distance
            let angle = map(x, 0, cols, 0, TWO_PI);
            let distance = map(y, 0, rows, 0, radius);

            // Convert polar coordinates to Cartesian
            let posX = centerX + distance * cos(angle);
            let posY = centerY + distance * sin(angle);

            translate(posX, posY);
            rotate(r);

            const rectWidth = random(5, 40);
            const rectHeight = 7;

            rectMode(CENTER);
            rect(0, 0, rectWidth, rectHeight);
            pop();
        }
    }
    noLoop();
}




  










