//fetching canvas and tool to paint
var canvas= document.getElementById("board");
var cxt= canvas.getContext("2d");

//canvas size 480x320

//Starting position of the Ball
var x= canvas.width/2;
var y= canvas.height - 10;

//displacement each 10 ms
var dx= 2;
var dy= -2;

//Ball propeties
const ballRadius= 8;
var ballColor = "#0095DD";

//Paddle properties
const paddleWidth= 75;
const paddleHeight= 10;
var paddleX= (canvas.width - paddleWidth)/2;

//Paddle Movement
var rightPressed= false;
var leftPressed= false;

function drawBall(){
    cxt.beginPath();
    cxt.arc(x,y,ballRadius,0,(2*Math.PI));
    cxt.stroke();
    cxt.fillStyle = ballColor;
    cxt.fill();
    cxt.closePath();
}

function drawPaddle(){
    cxt.beginPath();
    cxt.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    cxt.fillStyle= "#0095DD";
    cxt.fill();
    cxt.closePath(); 
}

function draw(){                                     //Clears canvas and draws circle every 10 ms
    
    cxt.clearRect(0,0,canvas.width,canvas.height);
    drawBall();
    drawPaddle();

    if( y+dy-ballRadius < 0 || y+dy+ballRadius > canvas.height ){
        dy = -dy;
        ballColor = randomColorGenerator();
    }
    if( x+dx-ballRadius < 0 || x+dx+ballRadius > canvas.width ){
        dx = -dx;
        ballColor = randomColorGenerator();
    }

    if(rightPressed && paddleX+paddleWidth < canvas.width){
        paddleX += 8;
    }else if(leftPressed && paddleX > 0){
        paddleX -= 8;
    }

    x += dx;
    y += dy;
};

function randomColorGenerator(){
    return "rgb("+rgbGen()+","+rgbGen()+","+rgbGen()+")";
}
function rgbGen(){
    let col=300;
    while(col>255){
         col=  Math.round(Math.random()*1000);
    };
    return col;
}

console.log(randomColorGenerator());

document.addEventListener("keydown",keydownHandler,false);
document.addEventListener("keyup",keyupHandler,false);

function keydownHandler(e){
    if(e.key == 'Right' || e.key == 'ArrowRight'){
        rightPressed = true;
    }
    if(e.key == 'Left' || e.key == 'ArrowLeft'){
        leftPressed = true;
    } 
};
function keyupHandler(e){
    if(e.key == 'Right' || e.key == 'ArrowRight'){
        rightPressed = false;
    }
    if(e.key == 'Left' || e.key == 'ArrowLeft'){
        leftPressed = false;
    } 
};

setInterval(draw,10);  //draw function will be executed every 10 ms






