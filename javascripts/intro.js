var canvas = document.getElementById('example');
var ctx = canvas.getContext('2d');

// ****************************
// draw rectangle:
// ****************************
function draw() {  
      ctx.fillRect(25, 25, 100, 100);
      ctx.clearRect(45, 45, 60, 60);
      ctx.strokeRect(50, 50, 50, 50);
  }

  draw()

ctx.fillStyle="purple";
ctx.fillRect(260, 260, 30, 30);

// ****************************
// draw path
// ****************************
// start the path
ctx.beginPath();
// starting position is x=50, y=50
ctx.moveTo(50, 200);
// draw the line that has final coordinates x=250, y=50
ctx.lineTo(250, 200);
// .stroke() executes the drawing
ctx.stroke();
// start a new line from these coordinates: x=250, y=50
ctx.moveTo(250, 200);
// draw the line that has final coordinates x=250, y=100
ctx.lineTo(250, 250);
// .stroke() executes the drawing
ctx.stroke();
// close the path
ctx.closePath();

// ****************************
// draw circle
// ****************************
ctx.beginPath();
// ctx.arc(x, y, radius, startAngle, endAngle)
ctx.arc(150, 170, 75, 0, Math.PI / 2, true);
ctx.lineWidth = 20;
ctx.strokeStyle = "green"; // !
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.arc(150, 170, 35, 0, Math.PI * 2);
ctx.fillStyle = "red"; // !
// fills the inner circle with red color
ctx.fill();
ctx.closePath();