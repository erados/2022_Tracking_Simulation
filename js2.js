const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = window.innerWidth / 1.05;
const height = window.innerHeight / 1.05;
canvas.width = width;
canvas.height = height;
const unit = (height / size) * 0.9;
ctx.translate(width / 2, height / 2);
const axes = [
  new Point(size * unit, 0, 0),
  new Point(0, -size * unit, 0),
  new Point(0, 0, -size * unit),
];

function drawGrid() {
  ctx.beginPath();
  for (let i = 0; i > -width / 2; i -= unit) {
    ctx.moveTo(i, -height / 2);
    ctx.lineTo(i, height / 2);
  }
  for (let i = unit; i < width / 2; i += unit) {
    ctx.moveTo(i, -height / 2);
    ctx.lineTo(i, height / 2);
  }
  for (let i = 0; i > -height / 2; i -= unit) {
    ctx.moveTo(-width / 2, i);
    ctx.lineTo(width / 2, i);
  }
  for (let i = 0; i < height / 2; i += unit) {
    ctx.moveTo(-width / 2, i);
    ctx.lineTo(width / 2, i);
  }
  ctx.closePath();
  ctx.stroke();
}

function drawRealPoint() {
  ctx.fillStyle = "#0000FF";
  for (let i = 0; i < n; i++) {
    ctx.beginPath();
    ctx.arc(realPoints[i].rx * unit, realPoints[i].ry * unit, 10, 0, Math.PI);
    ctx.strokeText(i, realPoints[i].rx * unit, realPoints[i].ry * unit + 20);
    ctx.closePath();
    ctx.fill();
  }
}

function drawPoint() {
  ctx.fillStyle = "#FF0000";
  for (let i = 0; i < n; i++) {
    ctx.beginPath();
    ctx.arc(points[i].rx * unit, points[i].ry * unit, 10, Math.PI, 0);
    ctx.strokeText(i, points[i].rx * unit, points[i].ry * unit - 10);
    ctx.closePath();
    ctx.fill();
  }
}

function drawAxes() {
  ctx.beginPath();
  for (let i = 0; i < axes.length; i++) {
    axes[i].calculateRotationPos();
    ctx.moveTo(axes[i].rx, axes[i].ry);
    ctx.lineTo(0, 0);
  }
  ctx.closePath();
  ctx.stroke();
}

function erase() {
  ctx.clearRect(-width / 2, -height / 2, width, height);
}

function draw() {
  //	drawGrid();
  drawRealPoint();
  drawPoint();
  drawAxes();
  //	drawSphere();
  ctx.strokeText(calculateError(), -width / 2, -height / 2.1);
}

function animate() {
  for (let i = 0; i < times; i++) {
    updatePos();
  }

  for (let i = 0; i < n; i++) {
    points[i].calculateRotationPos();
    realPoints[i].calculateRotationPos();
  }
  if (eta < etaLimit && error > errorLimit) {
    initiatePos();
    eta = initialEta;
    failureCount++;
  }
  if (error < errorLimit || failureCount >= failureLimit) {
    failureCount = 0;
    if (error < errorLimit) count++;
    init();
    if (count == countGoal) {
      count = 0;
      newTime = new Date().getTime();
      console.table(nodeLimit--, (newTime - startTime) / 1000);
      startTime = newTime;
    }
  }
  eta *= etaGamma;
  erase();
  draw();
  window.requestAnimationFrame(animate);
}
