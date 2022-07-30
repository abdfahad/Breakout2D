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

//Brick Properties
var brickWidth= 75;
var brickHeight= 20;
var offTop= 30;
var offLeft= 30;
var col= 5;
var row= 3;
var padd= 10;

var bricks= [];
for( let i=0; i<row; i++){
    bricks[i]= [];
    for(let j=0; j<col; j++){
        bricks[i][j]= { x:0, y:0, status: true };
    }
}

function drawBricks(){
    var brickX=0;
    var brickY=0;
    for(let i=0; i<row; i++){
        for(let j=0; j<col; j++){
            brickX= j*(brickWidth + padd) + offLeft;
            brickY= i*(brickHeight + padd) + offTop;
            bricks[i][j].x= brickX;
            bricks[i][j].y= brickY;
            if(bricks[i][j].status){
                drawBrick(bricks[i][j].x, bricks[i][j].y);
            };
        }
    }
};

function drawBall(){
    cxt.beginPath();
    cxt.arc(x,y,ballRadius,0,(2*Math.PI));
    cxt.stroke();
    cxt.fillStyle = ballColor;
    cxt.fill();
    cxt.closePath();
}

function drawBrick(x,y){
    cxt.beginPath();
    cxt.rect(x, y, brickWidth, brickHeight);
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
    drawBricks();
    drawBall();
    collisionDetection();
    drawPaddle();
    

    if( y+dy-ballRadius < 0 ){
        dy = -dy;
        ballColor = randomColorGenerator();
    }else if(y+dy+ballRadius > canvas.height){
        if(x > paddleX && x < paddleX + paddleWidth){                                                 //If touching paddle
            dy = -dy;
        }else{
            alert("Game Over!");
            document.location.reload();                      //Reload page
            clearInterval(intID);                            //Restart the game
        }
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

function collisionDetection(){
    for( let i=0; i<row; i++){
        for(let j=0; j<col; j++){
            let b= bricks[i][j];
            if( x>b.x && x<b.x+brickWidth && y>b.y && y<b.y+brickHeight){
                b.status = false;
                dy = -dy;
            }
        }
    }
}

console.log(bricks);
var intID= setInterval(draw,10);  //draw function will be executed every 10 ms






