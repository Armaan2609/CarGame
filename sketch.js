var PLAY=1;
var END=0;
var gameState=PLAY;
var car,carImage;
var road,roadImage,invisibleGround;
var enemy1,enemy1Image,enemy2,enemy2Image;
var invisibleGround1,invisibleGround2;
var score;

function preload(){
  carImage=loadImage("car.png");
  roadImage=loadImage("road1.png");
  enemy1Image=loadImage("enemy1.png");
  enemy2Image=loadImage("enemy2.png");
  enemy3Image=loadImage("enemy3.png");
 
}

function setup() {
  createCanvas(600, 400);

  
  
  
  road=createSprite(300,180);
  road.addImage("path",roadImage);
  road.x=road.width/2;
  road.velocityX=-2;
  
    car=createSprite(150,290);
 car.addImage("move",carImage);
  car.scale=0.4;
  
  

  invisibleGround1=createSprite(300,340,600,5)
  invisibleGround1.visible=false;
  invisibleGround2=createSprite(300,10,600,5)
  invisibleGround2.visible=false;

  enemy1Group=createGroup();
  enemy2Group=createGroup();

  score=0;
}

function draw() {
  background(220);
  car.velocityY=0;

  text("Survival Time:"+ score, 150,390);
  
   if(gameState==PLAY){
    if (road.x < 300){
      road.x = road.width/2;
    }
    
    if(keyDown("up_arrow")){
      car.velocityY=-3;
    }
     if(keyDown("down_arrow")){
      car.velocityY=3;
    }
  
    if(car.isTouching(invisibleGround1)){
      car.collide(invisibleGround1)
    }
  
    if(car.isTouching(invisibleGround2)){
      car.collide(invisibleGround2)
    }

   }
    if (car.isTouching(enemy1Group)){
      gameState=END;
    }else if(gameState==END){
      road.velocityX=0;
      car.velocityX=0;
      enemy1Group.setLifetimeEach(-1);
      enemy2Group.setLifetimeEach(-1);

      enemy1Group.setVelocityXEach(0);
      enemy2Group.setVelocityXEach(0);

      text("Press R Key To Restart",250,390)
    
      if(keyDown("r")){
        reset();
      }
    
    }

    if(frameCount%120==0){
      score=score+1;
    }
    
  
  
  

  
    spawnEnemy1();
   
  
   spawnEnemy2();
    
    
  
    

  drawSprites()
  }

  function spawnEnemy1(){
    if(frameCount%120==0){
      enemy1=createSprite(550,200);
      enemy1.y = Math.round(random(280,120));
      enemy1.addImage( enemy1Image )
      enemy1.scale=0.3;
      enemy1.velocityX=-3;
      enemy1.lifetime=200;
      enemy1Group.add( enemy1);
    } 
  }

  function spawnEnemy2(){
    if(frameCount%150==0){
      enemy2=createSprite(600,145);
       enemy2.y = Math.round(random(80,120));
       enemy2.addImage(enemy2Image )
      enemy2.scale=0.3;
      enemy2.velocityX=-3;
      enemy2.lifetime=200;
       
       enemy2Group.add(enemy2);
    } 
  }

  function reset(){
    gameState=PLAY
   enemy1Group.destroyEach();
  enemy2Group.destroyEach();
  road.velocityX=-2;
    score=0; 
   
  }