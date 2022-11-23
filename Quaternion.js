//const matrix = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
let matrix = [
  [0.730415003950535, 0.008259709357830162, 0.6829536581681568],
  [0.3025458868184332, 0.8925611986512936, -0.3343658072103259],
  [-0.6123397001446084, 0.450850622560831, 0.6494411503464521],
];
class Quaternion {
  constructor(w, point) {
    this.w = w;
    this.x = point.x;
    this.y = point.y;
    this.z = point.z;

    return this;
  }

  calculateRotationMatrix() {
    const matrix = [[], [], []];
    const qxx = this.x * this.x;
    const qyy = this.y * this.y;
    const qzz = this.z * this.z;
    const qxz = this.x * this.z;
    const qxy = this.x * this.y;
    const qyz = this.y * this.z;
    const qwx = this.w * this.x;
    const qwy = this.w * this.y;
    const qwz = this.w * this.z;

    matrix[0][0] = 1 - 2 * (qyy + qzz);
    matrix[0][1] = 2 * (qxy + qwz);
    matrix[0][2] = 2 * (qxz - qwy);

    matrix[1][0] = 2 * (qxy - qwz);
    matrix[1][1] = 1 - 2 * (qxx + qzz);
    matrix[1][2] = 2 * (qyz + qwx);

    matrix[2][0] = 2 * (qxz + qwy);
    matrix[2][1] = 2 * (qyz - qwx);
    matrix[2][2] = 1 - 2 * (qxx + qyy);

    return matrix;
  }
}
