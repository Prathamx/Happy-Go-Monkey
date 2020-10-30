var PLAY = 1
var END = 0
var gameState = 1;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score,survivalTime;
var ground;
function preload(){
  
  monkey_stop = loadAnimation("sprite_0.png");
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
}



function setup() {
  createCanvas(900,400)
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("stop",monkey_stop);
  monkey.scale = 0.1;
  //monkey.debug = true;
  monkey.setCollider("circle",0,0,280)
  
  ground = createSprite(400,350,900,10);
  ground.x = ground.width/2;
  ground.velocityX = -(5);
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  survivalTime = 0;
  score = 0;
}


function draw() {
  background("white");
  
  monkey.collide(ground);
  //console.log(World.mouseX);
  
  
  if(gameState === 1) {   
    if(keyDown("space") && monkey.y >= 314) {
       monkey.velocityY = -18; 
    }
    monkey.velocityY = monkey.velocityY +0.8;
    ground.x = ground.width/2;
    if(FoodGroup.isTouching(monkey)) {
      score =score +1;
      FoodGroup.destroyEach();
    }
    survivalTime = Math.ceil(frameCount/frameRate());
    if(obstacleGroup.isTouching(monkey)) {
      gameState = 0;
    }
    food();
    obstacles();
  }else if(gameState === 0) {
    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);  
    monkey.changeAnimation("stop",monkey_stop);
    monkey.collide(obstacleGroup);
  }
  
  drawSprites();
  fill("black");
  textSize(20);
  text("SurvivalTime:- " +survivalTime,500,50);
  text("Score:- " +score,230,50);
}

function food() {
  if(frameCount % 150 === 0) {
    banana = createSprite(900, (Math.round(random(120,200))), 20, 20);
    banana.addImage(bananaImage);
    banana.velocityX = -6;
    banana.scale = 0.08; 
    banana.lifeTime = 100;
    
    FoodGroup.add(banana); 
  }
}

function obstacles() {
  if(frameCount % 300 === 0) {
     obstacle = createSprite(900,310,20,20);
     obstacle.addImage(obstacleImage);
     obstacle.velocityX = -10;
     obstacle.scale = 0.2;
     obstacle.lifeTime = 100;
    
     obstacleGroup.add(obstacle);
  }
}



