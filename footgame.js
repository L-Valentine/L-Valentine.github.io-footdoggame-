var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
context.font = "22px Verdana";
context.strokeStyle = "yellow";
canvas.tabIndex = 1000;


var ballmove = [];
var timer = 0;
var dogmove = {x:200, y:450};
var count = 0;
var prize = 0;
var cupmove = [];

var ball = new Image();
ball.src = "ball.png";

var dog = new Image();
dog.src = "zabivaka.png";

var cup = new Image();
cup.src = "cup.png";

var fon = new Image();
fon.src = "fon.png";

canvas.addEventListener("mousemove", function (event) {
dogmove.x=event.offsetX-0.01;
});

fon.onload = function () {
game();	
};

function game () {
update();
render();
requestAnimFrame(game);
};

function update () {
	timer++;
	if (timer%20 == 0) {
		ballmove.push({
			x:Math.random()*600, 
			y:-50, 
			dx:Math.random()*10-4, 
			dy:Math.random()*10+4,
			del:0});
	}
	if (timer%600 == 0) {
		cupmove.push({
			x: Math.random()*600, 
			y: -70,
			del:0});
		}
	
	for (i in ballmove) {
	ballmove[i].x = ballmove[i].x+ballmove[i].dx;
	ballmove[i].y = ballmove[i].y+ballmove[i].dy;

	if (ballmove[i].x>=550 || ballmove[i].x<0) ballmove[i].dx = -ballmove[i].dx;
	if (ballmove[i].y>=600) ballmove.splice(i,1);
	
	if (Math.abs(ballmove[i].x+25-dogmove.x-15)<50 && Math.abs(ballmove[i].y-dogmove.y)<70) {
			ballmove[i].del=1;
		}
	if (ballmove[i].del==1) {
		ballmove.splice(i,1);
		count++;
		document.getElementById("pointOutput").innerHTML = count;
	}
	}

	for (i in cupmove) {
		cupmove[i].x = cupmove[i].x;
		cupmove[i].y = cupmove[i].y+8;

		if (Math.abs(cupmove[i].x+25-dogmove.x-15)<70 && Math.abs(cupmove[i].y-dogmove.y)<50) {
		cupmove[i].del=1;
	}
		if (cupmove[i].del==1) {
		cupmove.splice(i,1);
		prize++;
		document.getElementById("cupOutput").innerHTML = prize;
	}
	}

	
};

function render () {
	context.drawImage(fon, 0, 0, 600, 600);
	for (i in cupmove) context.drawImage(cup, cupmove[i].x, cupmove[i].y, 70, 70);
	context.drawImage(dog, dogmove.x, dogmove.y, 150, 150);
	for (i in ballmove) context.drawImage(ball, ballmove[i].x, ballmove[i].y, 50, 50);
	
	context.strokeText("Points:", 20, 50);
	context.strokeText("Cups:", 20, 80);
};

var requestAnimFrame = (function () {
	return window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function (callback) {
		window.setTimeout(callback, 1000/20);
	};
})();