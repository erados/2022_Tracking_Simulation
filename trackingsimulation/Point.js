var size = 1;

function Point(x = (Math.random() - 0.5) * size, y = (Math.random() - 0.5) * size, z = (Math.random() - 0.5) * size){
	this.x = x;
	this.y = y;
	this.z = z;

	this.rx = x;
	this.ry = y;
	this.rz = z;

	return this;
}

Point.prototype.set_pos = function(x, y, z){
	this.x = x;
	this.y = y;
	this.z = z;

	return this;
}

Point.prototype.cross_product = function(point){
	var temp = new Point(0, 0, 0);
	temp.x = this.y * point.z - this.z * point.y;
	temp.y = this.z * point.x - this.x * point.z;
	temp.z = this.x * point.y - this.y * point.x;
	
	return temp;
}

Point.prototype.nomalize = function(){
	var size = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	return this.calculate_divide(size);
}

Point.prototype.calculate_distance_square = function(point){
	return (this.x - point.x) * (this.x - point.x) + (this.y - point.y) * (this.y - point.y) + (this.z - point.z) * (this.z - point.z);
}

Point.prototype.add = function(point){
	this.x += point.x;
	this.y += point.y;
	this.z += point.z;
	return this;
}
Point.prototype.calculate_sub = function(point){
	var temp = new Point(this.x, this.y, this.z);
	temp.x -= point.x;
	temp.y -= point.y;
	temp.z -= point.z;
	return temp;
}

Point.prototype.multiply = function(a){
	this.x *= a;
	this.y *= a;
	this.z *= a;
	return this;
}

Point.prototype.calculate_divide = function(a){
	var temp = new Point(this.x, this.y, this.z);
	temp.x /= a;
	temp.y /= a;
	temp.z /= a;
	return temp;
}

Point.prototype.calculate_rotation_pos = function(){
	var temp = multiply_matrix_point(matrix, [this.x, this.y, this.z]);
	this.rx = temp[0];
	this.ry = temp[1];
	this.rz = temp[2];
}