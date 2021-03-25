
var monkey , monkey_running
var ground
var bananaGroup
var obstacle, obstacleGroup
var score = 0
var food, banana
var survivalTime = 0;
var gameState = "play"

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2
  console.log(ground.x);
  
  bananaGroup = new Group();
  obstacleGroup = new Group();

}

function draw() {
  background("white");
  
  if (keyDown("space") && monkey.y > 200){
    monkey.velocityY = -10;
  }
  monkey.velocityY = monkey.velocityY + 0.5;
  
  if(ground.x < 0){
    ground.x = ground.width/2
  }
  monkey.collide(ground);
  
  stroke("white");
  textSize(20);
  fill("white");


  stroke("black");
  textSize(20);
  fill("black");
  if (gameState === "play"){
    food();
    obstacles();
    if (monkey.isTouching(bananaGroup)){
      bananaGroup.destroyEach()
      score = score + 10
      monkey.scale = monkey.scale + 0.01
    }
    
    if (monkey.isTouching(obstacleGroup)){
      obstacleGroup.destroyEach()
      monkey.velocityX = 0
      monkey.velocityY = 0
      gameState = "end"    
    }
  }
  if (gameState === "end"){
    ground.x = 0
    monkey.visible = false
    bananaGroup.destroyEach()
    obstacleGroup.destroyEach()
    text("Game Over",200,200)
  }
  
  
  drawSprites();
  text("Score : " + score, 200,50);
  

}

  function food() {
  if (frameCount % 80 === 0){
    banana = createSprite(400, Math.round(random(120,200)));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    banana.lifetime = 100;
    bananaGroup.add(banana);
 }
}
  function obstacles() {
  if (frameCount % 300 === 0){
    obstacle = createSprite(400,340);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -4;
    obstacle.lifetime = 100;
    obstacleGroup.add(obstacle);
  }
}




















