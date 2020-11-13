function multiply_matrix(a, b){
	var ar = a.length;
	var ac = a[0].length; // == br
	var br = b.length;
	var bc = b[0].length;

	if(ac == br){
		var result_matrix = [];
		for(var row = 0; row < ar; row++){
			var row_matrix = [];
			for(var i = 0; i < bc; i ++){
				row_matrix[i] = 0;
				for(var col = 0; col < ac; col ++){
					row_matrix[i] += a[row][col] * b[col][i];
				}
			}
			result_matrix[row] = row_matrix;
		}
		return result_matrix;
	}
	else{
		console.log("Wrong matrix multiplying");
		return 0;
	}
}
function multiply_matrix_point(a, b){
	var ar = a.length;
	var ac = a[0].length; // == br
	var br = b.length;

	if(ac == br){
		var row_matrix = [];
		for(var row = 0; row < ar; row++){
			row_matrix[row] = 0;
			for(var col = 0; col < ac; col ++){
				row_matrix[row] += a[row][col] * b[col];				
			}
		}
		return row_matrix;
	}
	else{
		console.log("Wrong matrix multiplying");
		return 0;
	}
}