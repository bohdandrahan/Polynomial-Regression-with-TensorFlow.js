class Polinomial{
	constructor(order){
		this.order = order;
		this.setCoefficients();
	}
	setCoefficients(){
		this.coefficients = []
		for (let i = 0, i < this.order + 1, i++){
			this.coefficients.push(tf.variable(tf.scalar(random(1))));
		}
	}
	getPredictedPoints(xs){
		let b = this.coefficients[0]
		let m = this.coefficients[1]
		const tfxs = tf.tensor1d(xs);
		let ys = tfxs.mul(m).add(b)
		return ys
	}
}
