const size = 1;

class Point {
  constructor(
    x = (Math.random() - 0.5) * size,
    y = (Math.random() - 0.5) * size,
    z = (Math.random() - 0.5) * size
  ) {
    this.x = x;
    this.y = y;
    this.z = z;

    this.rx = x;
    this.ry = y;
    this.rz = z;

    return this;
  }

  setPos(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;

    return this;
  }

  crossProduct(point) {
    const temp = new Point(0, 0, 0);
    temp.x = this.y * point.z - this.z * point.y;
    temp.y = this.z * point.x - this.x * point.z;
    temp.z = this.x * point.y - this.y * point.x;

    return temp;
  }

  nomalize() {
    const size = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    return this.calculateDivide(size);
  }

  calculateDistanceSquare(point) {
    return (
      (this.x - point.x) * (this.x - point.x) +
      (this.y - point.y) * (this.y - point.y) +
      (this.z - point.z) * (this.z - point.z)
    );
  }

  add(point) {
    this.x += point.x;
    this.y += point.y;
    this.z += point.z;
    return this;
  }

  calculateSub(point) {
    const temp = new Point(this.x, this.y, this.z);
    temp.x -= point.x;
    temp.y -= point.y;
    temp.z -= point.z;
    return temp;
  }

  multiply(a) {
    this.x *= a;
    this.y *= a;
    this.z *= a;
    return this;
  }

  calculateDivide(a) {
    const temp = new Point(this.x, this.y, this.z);
    temp.x /= a;
    temp.y /= a;
    temp.z /= a;
    return temp;
  }

  calculateRotationPos() {
    const temp = multiplyMatrixPoint(matrix, [this.x, this.y, this.z]);
    this.rx = temp[0];
    this.ry = temp[1];
    this.rz = temp[2];
  }
}
