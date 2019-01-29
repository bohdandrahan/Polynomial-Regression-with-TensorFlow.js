class Polynomial{
	constructor(order, datapoints){
		this.order = order;
		this.setCoefficients();
		this.learningRate = 0.2;
		this.optimizer = tf.train.adam(this.learningRate);
		this.datapoints = datapoints
		this.hue = random(360)
	}
	setOrder(N){
		this.order = N;
		this.setCoefficients();
	}
	getX_values(){
		let x_vals = []
		for(let i = 0; i < this.datapoints.length; i++){
			x_vals.push(this.datapoints[i].normPosition.x);
		}
		return x_vals;
	}
	getY_values(){
		let y_vals = []
		for(let i = 0; i < this.datapoints.length; i++){
			y_vals.push(this.datapoints[i].normPosition.y)
		}
		return y_vals;
	}

	setCoefficients(){//shold be good. 
		this.coefficients = []
		for (let i = 0; i <= this.order; i++){
			this.coefficients.push(tf.variable(tf.scalar(random(-1,1))));
		}
	}

	loss(){//should be good.
		return this.getPrediction().sub(this.getY_values()).square().mean()
	}
	getPrediction(x_vals = this.getX_values()){//should be good.
		const xs = tf.tensor1d(x_vals);
  	let ys = tf.variable(tf.zerosLike(xs));
		for(let i = 0; i < this.coefficients.length; i++){
			const pow_ts = tf.fill(xs.shape, i);
			const sum = tf.add(ys, this.coefficients[i].mul(xs.pow(pow_ts)));
			ys.dispose();
			ys = sum.clone();
		}
		return ys;
	}

	train(optimizer = this.optimizer){//should be good.
		tf.tidy(()=>{
			if (this.datapoints.length > 0) {
      	const ys = tf.tensor1d(this.getY_values());
      	optimizer.minimize(() => this.loss());
			}
		});
	}

	display(){
		const curveX = [];
	  for (let x = -1; x <= 1; x += 0.01) {
	    curveX.push(x);
	  }
	  const ys = tf.tidy(() => this.getPrediction(curveX));
	  let curveY = ys.dataSync();
	  ys.dispose();

	  colorMode(HSB)
	  fill(this.hue, 100, 100);
	  noStroke();
	  strokeWeight(2);
	  for (let i = 0; i < curveX.length; i++) {
	    let x = map(curveX[i], 0, 1, 0, width);
	    let y = map(curveY[i], 0, 1, height, 0);
	    ellipse(x, y, 3);
	  }
	  colorMode(RGB)
	}
}
