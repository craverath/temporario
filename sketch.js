let d;
let ctx;
var size;

// setup and draw functions are abstracted by p5.js to create and draw stuff to the canvas
function setup() {
  size = min(windowHeight, windowWidth); // The image generated by NFA after rendering will be 2000x2000 by default
  createCanvas(size, size); // Create the canvas covering the whole window is optional, the NFT image will have the size of the canvas, not the window
}

function draw() {
  const seed = nfaRandom(0, 4294967295); // Sets up the subsequent random() and noise() functions to have deterministic outputs
  console.log("seed is", seed);
  randomSeed(seed);
  noiseSeed(seed);

  noLoop(); //noLoop tells p5.js to stop rendering the image after it's completed (only animations wouldn't want this)
  background(0);
  noFill();

  console.log(random(0, 5));

  //Define circle colors and shadows
  stroke(255);
  d = displayDensity();
  ctx = drawingContext;
  ctx.shadowColor = "#fff";
  ctx.shadowBlur = 20;

  let circlesPerRow = int(random(1, 30)); // Generates a pseudorandom number between 1 and 30

  console.log("circles", circlesPerRow);

  let totalRadius = 0;

  // Creates a matrix with circles
  for (let i = 0; i < circlesPerRow; i++) {
    for (let j = 0; j < circlesPerRow; j++) {
      strokeWeight(random(1, 5)); // The circles stroke weight will be randomized from 1 to 5

      // circle position is set as it's postion in the i/j matrix
      let x = (width / circlesPerRow) * i + width / (circlesPerRow * 2);
      let y = (height / circlesPerRow) * j + height / (circlesPerRow * 2);

      // each circle's size is randomized in a range based in the total amount of circles
      let circleRadius = random(
        size / 6 / circlesPerRow,
        (size * 1) / circlesPerRow
      );

      totalRadius += circleRadius;

      circle(x, y, circleRadius); // draw the circle
    }
  }

  // Calculate NFT attributes
  const totalCircles = circlesPerRow * circlesPerRow;
  const circlesSize = totalRadius / totalCircles > 20 ? "big" : "small";

  // Tell the NFA system to finish the NFT generation with it's traits
  nfaFinish([
    {
      trait_type: "totalCircles",
      value: totalCircles.toString(),
    },
    {
      trait_type: "averageSize",
      value: circlesSize,
    },
  ]);
}
