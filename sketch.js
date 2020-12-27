
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running, ground;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstaclesGroup;
var invisibleGround;
var score = 0;
var monkeyGroup;
var gameOver;

function preload(){
  
  gameOver = loadImage("gameOver.png");
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  monkeyGroup = new Group();
}



function setup() {
  createCanvas(600, 400);
  
  ground = createSprite(0, 400, 1200, 20);
  
  monkey = createSprite(100, 350, 10, 10);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  monkeyGroup.add(monkey);

  invisibleGround = createSprite(0, 400, 1200, 20);
  invisibleGround.visible = false;
}


function draw() {
  background("white");
  
  if(gameState === PLAY) {
      
  ground.velocityX = -8;
  if(keyDown("space") && monkey.collide(ground)) {
    monkey.velocityY = -19;
    
  }
    
    if(monkey.isTouching(FoodGroup)) {
      FoodGroup.destroyEach();
      score = score + 1;
    }
  monkey.velocityY = monkey.velocityY + 0.8;
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  
  
  if(monkey.isTouching(obstaclesGroup)) {
    gameState = END;
  }
  }
  
   spawnBananas();
  
  monkey.collide(invisibleGround);
  
  spawnObstacles();
  drawSprites();
 
  
  if(gameState === END) {
    ground.velocityX = 0;
    monkeyGroup.destroyEach();
    
  var over = createSprite(200, 200, 10, 10);
  over.addImage(gameOver);
  over.scale = 0.5;
    FoodGroup.destroyEach(); 
    obstaclesGroup.destroyEach();
    
  }
  text("SURVIVAL TIME:  " +score, 300, 100);
  
}





function spawnBananas() {
  var ran = Math.round(random(200, 300));
  if(frameCount%100 === 0) {
    var banana = createSprite(700, ran, 10, 10);
    banana.addImage(bananaImage);
    banana.velocityX = -8;
    banana.scale = 0.1;
    FoodGroup.add(banana);
  }
}



function spawnObstacles() {
  if(frameCount%110 === 0) {
    var obstacle = createSprite(1200, 351, 10, 10);
    obstacle.velocityX = ground.velocityX;
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.2;
    obstaclesGroup.add(obstacle);
  }
}


