let oldPos = new Point(0, 0, 0);
let newPos = new Point(0, 0, 0);
let isdraging = false;
let axisVector = new Point(0, 0, 0);
const theta = Math.PI / 180;
const cosTheta = Math.cos(theta);
const sinTheta = Math.sin(theta);
canvas.addEventListener("mousedown", mousedown);
canvas.addEventListener("mousemove", mousemove);
canvas.addEventListener("mouseup", mouseup);

function mousedown(e) {
  isdraging = true;
  x = e.layerX - width / 2;
  y = e.layerY - height / 2;
  z = Math.sqrt((width * width) / 4 - x * x - y * y);
  oldPos.setPos(x, y, z);
}

function mousemove(e) {
  if (isdraging) {
    x = e.layerX - width / 2;
    y = e.layerY - height / 2;
    z = Math.sqrt((width * width) / 4 - x * x - y * y);
    newPos.setPos(x, y, z);

    //rotation part here
    let cp = oldPos.crossProduct(newPos);
    if (cp.x != 0) {
      axisVector = cp.nomalize();
      rotationQuaternion = new Quaternion(
        cosTheta,
        axisVector.multiply(sinTheta)
      );
      let temp = rotationQuaternion.calculateRotationMatrix();
      matrix = multiplyMatrix(temp, matrix);
      oldPos.setPos(x, y, z);
    }
  }
}

function mouseup(e) {
  isdraging = false;
}
