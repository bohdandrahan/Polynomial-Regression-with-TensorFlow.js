let datapoitns = []
let height = 500;
function setup() {
  width = 0.9 * windowWidth;
  let canvas = createCanvas(width, height);
  canvas.parent('sketch-holder')
}
function mousePressed(){
	mouseDragged();
}
function mouseDragged() {
	let point = new Datapoint(mouseX, mouseY)
	if (point.isInBorders()){
		datapoitns.push(point);
	}
}
function draw() {
	background(51);
	noStroke();
	datapoitns.forEach(point => {
		point.display();
	});
}

function windowResized() {
  width = 0.9 * windowWidth;
  resizeCanvas(width, height);
}