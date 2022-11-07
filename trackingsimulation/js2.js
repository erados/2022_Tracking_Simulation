var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = window.innerWidth / 1.2;
var height = window.innerHeight / 1.2;
canvas.width = width;
canvas.height = height;
var unit = (height / size) * 0.9;
ctx.translate(width / 2, height / 2);
var axes = [
  new Point(size * unit, 0, 0),
  new Point(0, -size * unit, 0),
  new Point(0, 0, -size * unit),
];

function draw_grid() {
  ctx.beginPath();
  for (var i = 0; i > -width / 2; i -= unit) {
    ctx.moveTo(i, -height / 2);
    ctx.lineTo(i, height / 2);
  }
  for (var i = unit; i < width / 2; i += unit) {
    ctx.moveTo(i, -height / 2);
    ctx.lineTo(i, height / 2);
  }
  for (var i = 0; i > -height / 2; i -= unit) {
    ctx.moveTo(-width / 2, i);
    ctx.lineTo(width / 2, i);
  }
  for (var i = 0; i < height / 2; i += unit) {
    ctx.moveTo(-width / 2, i);
    ctx.lineTo(width / 2, i);
  }
  ctx.closePath();
  ctx.stroke();
}
function draw_real_point() {
  ctx.fillStyle = "#0000FF";
  for (var i = 0; i < n; i++) {
    ctx.beginPath();
    ctx.arc(real_points[i].rx * unit, real_points[i].ry * unit, 10, 0, Math.PI);
    ctx.strokeText(i, real_points[i].rx * unit, real_points[i].ry * unit + 20);
    ctx.closePath();
    ctx.fill();
  }
}

function draw_point() {
  ctx.fillStyle = "#FF0000";
  for (var i = 0; i < n; i++) {
    ctx.beginPath();
    ctx.arc(points[i].rx * unit, points[i].ry * unit, 10, Math.PI, 0);
    ctx.strokeText(i, points[i].rx * unit, points[i].ry * unit - 10);
    ctx.closePath();
    ctx.fill();
  }
}

function draw_axes() {
  ctx.beginPath();
  for (var i = 0; i < axes.length; i++) {
    axes[i].calculate_rotation_pos();
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
  //	draw_grid();
  draw_real_point();
  draw_point();
  draw_axes();
  //	draw_sphere();
  ctx.strokeText(calculate_error(), -width / 2, -height / 2.1);
}

function animate() {
  for (var i = 0; i < times; i++) {
    update_pos();
  }

  for (var i = 0; i < n; i++) {
    points[i].calculate_rotation_pos();
    real_points[i].calculate_rotation_pos();
  }
  if (eta < eta_limit && error > 0.00001) {
    initiate_pos();
    eta = initial_eta;
  }
  if (error < 0.000001) {
    init();
  }
  eta *= 0.99;
  erase();
  draw();
  window.requestAnimationFrame(animate);
}
