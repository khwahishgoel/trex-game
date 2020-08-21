//global variable
var trexr,trexc,groundImage;
var trex,ground,iground,cloudImage,ob1,ob2,ob3,ob4,ob5,ob6
var cloudGroup, obstacleGroup,score
var play,end,gameState;
var gameOverimg, restartimg
var gameOver, restart;


function preload(){
  trexr=loadAnimation("trex1.png","trex2.png","trex3.png");
  trexc=loadAnimation("trex_collided.png");
  groundImage=loadImage("ground2.png");
  cloudImage=loadImage("cloud.png");
  ob1=loadImage("obstacle1.png");
  ob2=loadImage("obstacle2.png");
  ob3=loadImage("obstacle3.png");
  ob4=loadImage("obstacle4.png");
  ob5=loadImage("obstacle5.png");
  ob6=loadImage("obstacle6.png");
  gameOverimg=loadImage("gameOver.png");
  restartimg=loadImage("restart.png");
}

function setup(){
  createCanvas(600,200);
  trex=createSprite(50,160);
  trex.addAnimation("trex",trexr);
  trex.addAnimation("trexr",trexc)
  trex.scale=0.5;
  ground=createSprite(300,185);
  ground.addImage("ground",groundImage);
  ground.velocityX=-3;
  ground.x=ground.width/2;
  iground =createSprite(300,190,600,10);
  iground.visible =false
  trex.setCollider("circle",0,0,40);
  obstacleGroup=new Group();
  cloudGroup=new Group();
  score=0;
  play=1;
  end=0;
  gameState=play;
  gameOver=createSprite(300,100);
  gameOver.addImage("gameOverimg",gameOverimg);
  gameOver.scale=0.5;
  restart=createSprite(300,130);
  restart.addImage("restartimg", restartimg);
  restart.scale=0.5;
  gameOver.visible=false;
  restart.visible=false;
}

function draw(){
  background(180);
  textSize(18);
  textFont("Georgia");
  textStyle(BOLD);
  text("Score: "+ score, 450, 50);
  //text(mouseX+","+mouseY,mouseX,mouseY);
  if(gameState==play){
   score = score + Math.round(getFrameRate()/60);
    if(ground.x<0){
      ground.x=ground.width/2;
    } 
    if(keyDown("space")&&trex.y>=165){
       trex.velocityY=-10;
    }
    trex.velocityY=trex.velocityY+1;
    spawnCloud();
    spawnObstacle();
    if(trex.isTouching(obstacleGroup)){
       gameState=end;
    }
  }

  else if(gameState==end){
    ground.velocityX=0;
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    trex.changeAnimation("trexr",trexc);
    gameOver.visible=true;
    restart.visible=true;
    
  } 
   if(mousePressedOver(restart)) {
    reset();
  }
  
  trex.collide(iground);
  console.log(trex.y);
  drawSprites();
  
  
} 
function reset(){
  gameState = play;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  
   trex.changeAnimation("trex",trexr);
  
  score = 0;
  
}
function spawnCloud(){
  if (frameCount%60==0){
    var cloud =createSprite(600,10,10,10);
  cloud.y=Math.round(random(30,150));
  cloud.velocityX=-3;
  cloud.addImage("cloud",cloudImage);
trex.depth=cloud.depth+1;
cloud.lifetime=200;
cloudGroup.add(cloud);
  }
}
function spawnObstacle(){
  if(frameCount%60==0){
  var obstacle=createSprite(600,165,10,10);
  var rand=Math.round(random(1,6));
    switch(rand){
      case 1: obstacle.addImage("ob1",ob1);
        break;
      case 2: obstacle.addImage("ob2",ob2);
        break;
      case 3: obstacle.addImage("ob3",ob3);
        break;
        case 4: obstacle.addImage("ob4",ob4);
        break;
        case 5: obstacle.addImage("ob5",ob5);
        break;
        case 6: obstacle.addImage("ob6",ob6);
        break;
        default: 
        break;
    }
  obstacle.velocityX=-3;
 
  obstacle.scale=0.7;
  obstacle.lifetime=200;
  obstacle.setCollider("circle",0,0,40);
  if(score%100==0&score>0){
    obstacle.velocityX=obstacle.velocityX-1;
  }
  obstacleGroup.add(obstacle);
  
  }
}