class Polynomial{
	constructor(order, datapoints){
		this.order = order;
		this.setCoefficients();
		console.log(this.coefficients)
		this.learningRate = 0.2;
		this.optimizer = tf.train.sgd(this.learningRate);
		this.datapoints = datapoints
	}
	getX_values(){
		let x_vals = []
		this.datapoints.forEach((point) =>{
			x_vals.push(point.normPosition.x)
		});
		return x_vals;
	}
	getY_values(){
		let y_vals = []
		this.datapoints.forEach((point) =>{
			y_vals.push(point.normPosition.y)
		});
		return y_vals;
	}
	setCoefficients(){
		this.coefficients = []
		for (let i = 0; i < this.order + 1; i++){
			this.coefficients.push(tf.variable(tf.scalar(random(1))));
		}
	}
	loss(){
		this.SetPredictedPoints()
		return this.ys_predicted.sub(this.getY_values()).square().mean()
	}
		SetPredictedPoints(){
		const xs_tf = tf.tensor1d(this.getX_values());
		let ys_predicted = xs_tf.mul(this.coefficients[1]).add(this.coefficients[0])
		this.ys_predicted = ys_predicted
	}
	train(){
		this.optimizer.minimize(() => this.loss());
	}
	display(){
		for (let x = 0;x < 1;x += 0.1){
			let y = this.coefficients[0] + x * this.coefficients[1]
			console.log(x, y)
			// let x_position = map(x, 0, 1 , 0, width)
			// let y_position = map(y, 0, 1, height, 0)
			// ellipse(x_position, y_position, 1)
		}
	}
}
