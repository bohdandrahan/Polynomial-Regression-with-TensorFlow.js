let datapoitns = []
let height = 500;
let polynomial
let maxOrder = 10
function setup() {
  width = 0.9 * windowWidth;
  let canvas = createCanvas(width, height);
  canvas.parent('sketch-holder')
  slider_order = createSlider(0, maxOrder, 2)
  slider_order.parent('slider_0');
  slider_order.style(
  	'width', '100%',
  )

  polynomial = new Polynomial(2, datapoitns)
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
	background(10);
	noStroke();
	datapoitns.forEach(point => {
		point.display();
	});
	document.querySelector(".slider").innerHTML = "Order of Polynomial: " + slider_order.value();
	if (!(polynomial.order === slider_order.value())){
		polynomial.setOrder(slider_order.value())
	}
	if(datapoitns.length > 0){
		polynomial.train();
	}
	polynomial.display()

}

function windowResized() {
  width = 0.9 * windowWidth;
  resizeCanvas(width, height);
}