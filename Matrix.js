function multiplyMatrix(a, b) {
  const ar = a.length;
  const ac = a[0].length; // == br
  const br = b.length;
  const bc = b[0].length;

  if (ac == br) {
    const resultMatrix = [];
    for (let row = 0; row < ar; row++) {
      const rowMatrix = [];
      for (let i = 0; i < bc; i++) {
        rowMatrix[i] = 0;
        for (let col = 0; col < ac; col++) {
          rowMatrix[i] += a[row][col] * b[col][i];
        }
      }
      resultMatrix[row] = rowMatrix;
    }
    return resultMatrix;
  } else {
    console.log("Wrong matrix multiplying");
    return 0;
  }
}
function multiplyMatrixPoint(a, b) {
  const ar = a.length;
  const ac = a[0].length; // == br
  const br = b.length;

  if (ac == br) {
    const rowMatrix = [];
    for (let row = 0; row < ar; row++) {
      rowMatrix[row] = 0;
      for (let col = 0; col < ac; col++) {
        rowMatrix[row] += a[row][col] * b[col];
      }
    }
    return rowMatrix;
  } else {
    console.log("Wrong matrix multiplying");
    return 0;
  }
}
