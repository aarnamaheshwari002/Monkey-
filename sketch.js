var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var obstacleGroup
var score = 0;
var survivalTime = 0 ;
var obstacles
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_collided= loadAnimation("sprite_1.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400, 400);
  background("pink");
  
  monkey = createSprite(20, 365, 20, 20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(200, 370, 500, 10);
  ground.velocityx = -4;
  ground.x = ground.width/2
  console.log(ground.x);

  
  obstaclesGroup=createGroup();
  bananaGroup=createGroup();
}


function draw() {
  
  if (gameState===PLAY){
    
   background("pink");
   if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
     monkey.velocityY = monkey.velocityY + 0.8; 
   
   Obstacles(); 
   Bananas();
    if (monkey.isTouching(bananaGroup)){
      score = score+3
      bananaGroup.destroyEach();
      
    }
    
    stroke("white");
    fill("blue");
    textSize(17);
    text(" Score: "+score,300,30);

    stroke("white");
    fill("blue");
    textSize(17);
    survivalTime = Math.ceil(frameCount/frameRate()) 
    text("Survival Time: "+survivalTime,100,30);

    if (monkey.isTouching(obstaclesGroup)){
      gameState = END
    }
  }
  if (gameState === END){
      background("black");
    stroke("blue");
    textFont("Ink Free");
    fill("yellow");
    textSize(40);
    text("Game Over", 100, 200);
    
    survivalTime = 0;
    score = 0;

    monkey.visible = false;
    banana.visible = false;
    obstaclesGroup.visible = false;
    ground.visible = false;
    
    monkey.velocityY = 0;
    ground.velocityX = 0;
    obstaclesGroup.destroyEach();
  }
  
  monkey.collide(ground);
  
   drawSprites();
  

  
}

function Obstacles(){
  if (frameCount % 97 === 0){
   var obstacle = createSprite(620,350,10,40);
    var rand = Math.round(random(100, 370));
    obstacle.addImage("hi",obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX =-(4);
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
 }
  
}
 
function Bananas(){
 if (frameCount%120 === 0){
    
    banana = createSprite(620,120, 50, 50)
    banana.y = Math.round(random(70,320));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-(4);           
    banana.lifetime = 220;
    bananaGroup.add(banana);
  } 
  }



