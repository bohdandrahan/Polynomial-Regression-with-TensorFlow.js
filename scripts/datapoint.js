class Datapoint{
	constructor(x, y){
		this.position = createVector(x, y);
		this.colorHue = random(360);
		this.setNormalizedPosition()
	}
	setNormalizedPosition(){
		let normalizedX = map(this.position.x, 0, width, 0, 1);
		let normalizedY = map(this.position.y,0, height, 1, 0);
		this.normPosition = createVector(normalizedX, normalizedY)
	}
	isInBorders(){
		let x = this.normPosition.x;
		let y = this.normPosition.y;
		if(x >1 || x < 0 || y >1 || y <0){
			return false
		}else {
			return true
		}
	}
	display(){
	colorMode(HSB)
	fill(this.colorHue, 100,100)
	ellipse(this.position.x, this.position.y, 10)
	colorMode(RGB)
	}
}