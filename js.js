const n = 40; // 4 or more
let nodeLimit = 10;
const fixed = 4;
let distSquare = [];
const points = [];
let realPoints = [];
const gradiants = [];
const initialEta = 0.01;
let eta = initialEta;
const etaLimit = initialEta * 0.8;
const etaGamma = 0.98;
const times = 2500;
let error;
const errorLimit = 0.0000000001;
let count = 0;
const countGoal = 1000;
let startTime = new Date().getTime();
const nodeToConnect = {};
let failureCount = 0;
const failureLimit = 5;

function selectNodeToConnect() {
  for (let i = 0; i < n; i++) {
    nodeToConnect[i] = Array.from({ length: fixed }, (v, i) => i);
    while (nodeToConnect[i].length != nodeLimit) {
      const node = Math.floor(Math.random() * n);
      if (!nodeToConnect[i].includes(node)) nodeToConnect[i].push(node);
    }
  }
}

function randomlyAllocateRealPos() {
  realPoints = Array.from({ length: n }, () => new Point());
}

function initiateDist() {
  distSquare = Array.from({ length: n }, () => Array(n).fill(0));
}

function initiatePos() {
  for (let i = 0; i < fixed; i++) {
    points[i] = new Point(realPoints[i].x, realPoints[i].y, realPoints[i].z);
  }
  for (let i = fixed; i < n; i++) {
    points[i] = new Point();
  }
}

function calculateDistSquare() {
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (i != j) {
        distSquare[i][j] = realPoints[i].calculateDistanceSquare(realPoints[j]);
        distSquare[j][i] = distSquare[i][j];
      }
    }
  }
}

function calculateGradiant() {
  for (let i = fixed; i < n; i++) {
    const temp = new Point(0, 0, 0);
    nodeToConnect[i].forEach((j) => {
      if (i != j) {
        const commonTerm =
          4 * (points[i].calculateDistanceSquare(points[j]) - distSquare[i][j]);
        temp.add(points[i].calculateSub(points[j]).multiply(commonTerm));
      }
    });
    gradiants[i] = temp;
  }
}

// function calculateGradiant() {
//   for (let i = fixed; i < n; i++) {
//     const temp = new Point(0, 0, 0);
//     for (let j = 0; j < n; j++) {
//       if (i != j) {
//         const term = Math.sqrt(
//           distSquare[i][j] / points[i].calculateDistanceSquare(points[j])
//         );
//         temp.add(points[i].calculateSub(points[j])).multiply(2 * (1 - term));
//       }
//     }
//     gradiants[i] = temp;
//   }
// }

function updatePos() {
  calculateGradiant();
  for (let i = fixed; i < n; i++) {
    points[i].add(gradiants[i].multiply(-eta));
  }
}

function calculateError() {
  error = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      let temp =
        points[i].calculateDistanceSquare(points[j]) - distSquare[i][j];
      error += temp * temp;
    }
  }
  return "error : " + error.toFixed(10) + " | eta : " + eta.toFixed(10);
}

function init() {
  selectNodeToConnect();
  randomlyAllocateRealPos();
  initiateDist();
  initiatePos();
  calculateDistSquare();
}
