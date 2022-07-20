//fetching canvas and tool to paint
var canvas= document.getElementById("board");
var cxt= canvas.getContext("2d");

//canvas size 480x320

//Starting position of the Ball
var x= canvas.width/2;
var y= canvas.height - 10;

//displacement each 10 ms
const dx= 2;
const dy= -2;

function drawBall(){
    cxt.beginPath();
    cxt.arc(x,y,5,0,(2*Math.PI));
    cxt.stroke();
    cxt.fillStyle = "#0095DD";
    cxt.fill();
    cxt.closePath();
}

function draw(){                                     //Clears canvas and draws circle every 10 ms
    cxt.clearRect(0,0,canvas.width,canvas.height);
    drawBall();

    x += dx;
    y += dy;
};

setInterval(draw,10);  //draw function will be executed every 10 ms






