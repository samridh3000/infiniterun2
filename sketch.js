
var monkey , monkey_running, monkeyCollide;
var ground, invisiGround, groundImg;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var backImage
var score = 0;
var bananaScore = 0;
var PLAY = 0;
var END = 1;
var gameState = PLAY;

function preload(){
  sprite_0 = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
    sprite_1 = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkeyCollide = loadAnimation("sprite_1.png");
   monkeyRunning = loadAnimation("sprite_0.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
 
}

function setup(){
 createCanvas(600,300);

  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
 
  monkey = createSprite(80,230,10,10);
  monkey.scale = 0.12;
  monkey.addAnimation("monkey",sprite_0);
  monkey.addAnimation("collide", sprite_1);
  
    
  ground = createSprite(300,340,600,10);
  
  
  
  
  invisiGround = createSprite(300,278,600,7);
  invisiGround.visible = true;
  
}

function draw(){
  background("white");
  fill("black");
  text("SURVIVAL TIME: "+score, 470, 20);
  text("Score: "+bananaScore,300,20);
  
  if (gameState === PLAY){
    obstacles();
    bananas();
    score = score + Math.round(getFrameRate()/60);
    
    ground.velocityX = -(4+score*1.5/100);
  
    if(keyDown("space")&&monkey.y >= 235) {
      monkey.velocityY = -13; 
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if (monkey.isTouching(bananaGroup)){
      bananaScore++;  
      bananaGroup.destroyEach();
    
    }
    
    if (monkey.isTouching(obstacleGroup)){
      gameState = END;
    }

    switch(score){
      case 10: monkey .scale=0.12;
           break;
      case 20: monkey .scale=0.14;
           break;
      case 30: monkey .scale=0.16;
           break;
      case 40: monkey .scale=0.18;
           break;
           default: break
    }
    
  }
  
  if (gameState === END){
    ground.velocityX = 0;
    
    monkey.y = 235;
    monkey.scale = 0.12;
    monkey.changeAnimation("collide", sprite_1);
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    fill("red")
    stroke("black")
    textSize(30);
    text("GAMEOVER!!!", 220, 170);
    fill("black");
    textSize(15);
    text("Press 'R' to play again", 240, 200);
    
    if (keyDown("r")){
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("monkey", sprite_0);
      score = 0;
      bananaScore = 0;
      gameState = PLAY; 
    }
  }
  
  
  
  drawSprites(); 
  
  monkey.collide(invisiGround);
  if(obstacleGroup.isTouching(monkey)){
    monkey.scale=0.2;
  }
  
}

function bananas(){
  if (frameCount%130 === 0){
    
    banana = createSprite(620,120, 50, 50 )
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-(4+score*1.5/100);           
    banana.lifetime = 220;
    bananaGroup.add(banana);
    bananaGroup.add(banana);

    
  }
  

  
}

function obstacles(){
  if (frameCount%200 === 0){
    
    obstacle = createSprite(620,253,50,50);
    obstacle.addAnimation("rock", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 130);
    obstacle.scale = 0.10 ;
    obstacle.velocityX = -(4+score*1.5/100);
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
    
  }


  
}






