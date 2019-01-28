class Polynomial{
	constructor(order, datapoints){
		this.order = order;
		this.setCoefficients();
		this.learningRate = 0.1;
		this.optimizer = tf.train.adam(this.learningRate);
		this.datapoints = datapoints
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
			this.coefficients.push(tf.variable(tf.scalar(random(0,1))));
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

	train(){//should be good.
		tf.tidy(()=>{
			if (this.datapoints.length > 0) {
      	const ys = tf.tensor1d(this.getY_values());
      	this.optimizer.minimize(() => this.loss());
			}
		});
	}

	display(){
	const curveX = [];
  for (let x = -1; x <= 1; x += 0.02) {
    curveX.push(x);
  }
  const ys = tf.tidy(() => this.getPrediction(curveX));
  let curveY = ys.dataSync();
  ys.dispose();

  beginShape();
  noFill();
  stroke(255);
  strokeWeight(2);
  for (let i = 0; i < curveX.length; i++) {
    let x = map(curveX[i], 0, 1, 0, width);
    let y = map(curveY[i], 0, 1, height, 0);
    vertex(x, y);
  }
  endShape();

	}
}
