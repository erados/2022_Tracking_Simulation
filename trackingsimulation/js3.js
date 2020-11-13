var old_pos = new Point(0, 0, 0);
var new_pos = new Point(0, 0, 0);
var isdraging = false;
var axis_vector = new Point(0, 0, 0);
var theta = Math.PI/180;
var cos_theta = Math.cos(theta);
var sin_theta = Math.sin(theta);
canvas.addEventListener('mousedown', mousedown);
canvas.addEventListener('mousemove', mousemove);
canvas.addEventListener('mouseup', mouseup);	


function mousedown(e){
	isdraging = true;
	x = e.layerX-width/2;
	y = e.layerY-height/2;
	z = Math.sqrt(width * width / 4 - x * x - y * y);
	old_pos.set_pos(x, y, z);
}

function mousemove(e){
	if(isdraging){
		x = e.layerX-width/2;
		y = e.layerY-height/2;
		z = Math.sqrt(width * width / 4 - x * x - y * y);
		new_pos.set_pos(x, y, z);
		
		//rotation part here
		var cp = old_pos.cross_product(new_pos);
		if(cp.x != 0){
			axis_vector = cp.nomalize();
			rotation_quaternion = new Quaternion(cos_theta, axis_vector.multiply(sin_theta));
			var temp = rotation_quaternion.calculate_rotation_matrix();
			matrix = multiply_matrix(temp, matrix);
			old_pos.set_pos(x, y, z);
		}
	}
}

function mouseup(e){
	isdraging = false;
}