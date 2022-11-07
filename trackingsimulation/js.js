var n = 30; // 4 or more
var fixed = 4;
var dist_square = [];
var points = [];
var real_points = [];
var gradiants = [];
var initial_eta = 0.01;
var eta = initial_eta;
var eta_limit = initial_eta * 0.8;
var times = 500;
var error;

function randomly_allocate_real_pos() {
  for (var i = 0; i < n; i++) {
    real_points[i] = new Point();
  }
}

function initiate_dist() {
  for (var i = 0; i < n; i++) {
    var temp = [];
    for (var j = 0; j < n; j++) {
      temp.push(0);
    }
    dist_square.push(temp);
  }
}

function initiate_pos() {
  for (var i = 0; i < fixed; i++) {
    points[i] = new Point(real_points[i].x, real_points[i].y, real_points[i].z);
  }
  for (var i = fixed; i < n; i++) {
    points[i] = new Point();
  }
}

function calculate_dist_square() {
  for (var i = 0; i < n; i++) {
    for (var j = i + 1; j < n; j++) {
      if (i != j) {
        dist_square[i][j] = real_points[i].calculate_distance_square(
          real_points[j]
        );
        dist_square[j][i] = dist_square[i][j];
      }
    }
  }
}

function calculate_gradiant() {
  for (var i = fixed; i < n; i++) {
    var temp = new Point(0, 0, 0);
    for (var j = 0; j < n; j++) {
      if (i != j) {
        var common_term =
          4 *
          (points[i].calculate_distance_square(points[j]) - dist_square[i][j]);
        temp.add(points[i].calculate_sub(points[j]).multiply(common_term));
      }
    }
    gradiants[i] = temp;
  }
}

function update_pos() {
  calculate_gradiant();
  for (var i = fixed; i < n; i++) {
    points[i].add(gradiants[i].multiply(-eta));
  }
}

function calculate_error() {
  error = 0;
  for (var i = 0; i < n; i++) {
    for (var j = i + 1; j < n; j++) {
      var temp =
        points[i].calculate_distance_square(points[j]) - dist_square[i][j];
      error += temp * temp;
    }
  }
  return "error : " + error.toFixed(10) + " | eta : " + eta.toFixed(10);
}

function init() {
  randomly_allocate_real_pos();
  initiate_dist();
  initiate_pos();
  calculate_dist_square();
}
