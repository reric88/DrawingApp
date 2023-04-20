const canvas = document.getElementById("canvas");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const sizeElement = document.getElementById("size");
const colorElement = document.getElementById("color");
const clearElement = document.getElementById("clear");
const saveElement = document.getElementById("save");
const noBG = document.getElementById("noBG");
const ctx = canvas.getContext("2d");

let size = 10;
let isPressed = false;
let color = "black";
let x;
let y;

// Draw at coordinates if mouse button is pressed
canvas.addEventListener("mousedown", (e) => {
  isPressed = true;
  x = e.offsetX;
  y = e.offsetY;
  console.log(isPressed, x, y);
});

// Stop drawing if mouse button is released
canvas.addEventListener("mouseup", (e) => {
  isPressed = false;
  x = undefined;
  y = undefined;
  console.log(isPressed, x, y);
});

// If mouse moves, update coordinates and draw at new coordinates
canvas.addEventListener("mousemove", (e) => {
  if (isPressed) {
    const x2 = e.offsetX;
    const y2 = e.offsetY;
    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);
    x = x2;
    y = y2;
    console.log(x2, y2);
  }
});

// Function to draw the point of the 'brush'
function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  console.log("object");
}

// Function to draw a line connecting the circles
function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 2;
  ctx.stroke();
}

// function to update the visual value of the brush size
function updateSizeOnScreen() {
  sizeElement.innerText = size;
}

// Applies the change of color to your brush
colorElement.addEventListener("change", (e) => (color = e.target.value));

// Increases the size of the brush
increaseBtn.addEventListener("click", () => {
  size += 5;
  if (size > 50) {
    size = 50;
  }
  updateSizeOnScreen();
});

// Decreases the size of the brush
decreaseBtn.addEventListener("click", () => {
  size -= 5;
  if (size < 5) {
    size = 5;
  }
  updateSizeOnScreen();
});

// Downloads the drawing as a png file
saveElement.addEventListener("click", () => {
  let link = document.createElement("a");
  link.download = "fileName.png";
  link.href = document.getElementById("canvas").toDataURL("image/png");
  link.click();
});

// Clears the content on the canvas
clearElement.addEventListener("click", () =>
  ctx.clearRect(0, 0, canvas.width, canvas.height)
);