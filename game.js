//fetching canvas and tool to paint
var canvas= document.getElementById("board");
canvas.width = window.innerWidth-30;
canvas.height = window.innerHeight-40;

var cxt= canvas.getContext("2d");

//Starting position of the Ball
var x= canvas.width/2;
var y= canvas.height - 14;

//displacement each 10 ms
var dx= 6;
var dy= -6;

//Ball propeties
const ballRadius= 8;
var ballColor = randomColorGenerator();;

//Paddle properties
const paddleWidth= 100;
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
var col= 15;
var row= 8;
var padd= 10;
const brickColor= randomColorGenerator();

var score= 0;
var lives = 3;

var bricks= [];
for( let i=0; i<row; i++){
    bricks[i]= [];
    for(let j=0; j<col; j++){
        bricks[i][j]= { x:0, y:0, status: true };
    }
}


//----------------------Draw Functions--------------------------------------------------------------

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


function drawScore(){
    cxt.font= "14px Arial";
    cxt.fillStyle= "black";
    cxt.fillText('Score: '+score,8,20);
}
function drawLives(){
    cxt.font= "14px Arial";
    cxt.fillStyle= "black";
    cxt.fillText('Lives: '+lives,canvas.width-65,20);
}


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
    cxt.fillStyle = brickColor;
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

//----------------------Drawing the canvas--------------------------------------------------------------
inital = true;
async function draw(){                                     //Clears canvas and draws circle every 10 ms
    
    cxt.clearRect(0,0,canvas.width,canvas.height);
    drawBricks();
    drawBall();
    collisionDetection();
    drawPaddle();
    drawScore();
    drawLives();
    
    if( y+dy-ballRadius < 0 ){
        dy = -dy;
    }else if(y+dy+ballRadius > canvas.height){
        if(x > paddleX && x < paddleX + paddleWidth){                                                 //If touching paddle
            dy = -dy;
        }else{
            if(lives==0){
                alert("Game Over!");
                lives=3;
                document.location.reload();                                                 //Reload page
            }else{
                lives--;
                x= canvas.width/2;
                y= canvas.height - 10;
                paddleX= (canvas.width - paddleWidth)/2;
            }                          
        }
    }
    if( x+dx-ballRadius < 0 || x+dx+ballRadius > canvas.width ){
        dx = -dx;
    }

    if(rightPressed && paddleX+paddleWidth < canvas.width){
        paddleX += 8;
    }else if(leftPressed && paddleX > 0){
        paddleX -= 8;
    }

    x += dx;
    y += dy;
    
    requestAnimationFrame(draw);
};

//----------------------Color Generator------------------------------------------------------------------------------------------------------------------------

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

//----------------------Events--------------------------------------------------------------

document.addEventListener("keydown",keydownHandler,false);
document.addEventListener("keyup",keyupHandler,false);
document.addEventListener("mousemove",mouseHandler,false);

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
function mouseHandler(e){
    var relX= e.clientX - canvas.offsetLeft;
    if( relX>0 && relX<canvas.width){
        paddleX= relX - paddleWidth/2;
    }
}

//----------------------Collisions and Score--------------------------------------------------------------

function collisionDetection(){
    for( let i=0; i<row; i++){
        for(let j=0; j<bricks[i].length; j++){
            let b= bricks[i][j];
            if( x>b.x && x<b.x+brickWidth && y>b.y && y<b.y+brickHeight && b.status==true){
                b.status = false;
                dy = -dy;
                score++;
                if(score== row*col){
                    alert("CONGRATULATIONS! YOU WON");
                    document.location.reload();                      //Reload page                            
                }
            } 
        }
    }
}

draw();






