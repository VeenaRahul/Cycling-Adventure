var dave, youngDave_img;
var background_img;
var invisibleGround;
var  obs2_img, obstaclesGroup;
var balloon1_img,balloon2_img, balloon3_img, balloon4_img,  balloon5_img, balloonsGroup; 
var rand;

var gameState;

var score;

var restartButton;

function preload(){
  youngDave_img  = loadImage("images/youngDave.png");
  background_img = loadImage("images/sunnybg.jpg");

  obs2_img = loadImage("images/stone2.png");

  balloon1_img = loadImage("images/balloon1.png");
  balloon2_img = loadImage("images/balloon2.png");
  balloon3_img = loadImage("images/balloon3.png"); 
  balloon5_img = loadImage("images/balloon5.png");
}


function setup() {
  createCanvas(displayWidth-10,displayHeight-150);

  scene = createSprite(width/2, height/2, width, height);
  scene.addImage(background_img);
  scene.scale = 5; 
  scene.velocity.x = -5;
  
  
  dave = createSprite(400, 450, 50, 50);
  dave.addImage(youngDave_img);
  dave.scale = 0.4;

  invisibleGround = createSprite(width/2, height - 40, width, 20);
  invisibleGround.visible = false; 

  balloonsGroup = new Group();
  obstaclesGroup = new Group ();

  gameState = "play";

  score = 0;

}

function draw() {
  background("white");
  
  if(gameState == "play") {
    
    if(scene.position.x < 0) {
      scene.position.x = width/2;
    
    }
  
    dave.velocity.y += 0.5;
  
    spawnObstacles();
    spawnBalloons();
  
    obstaclesGroup.overlap(dave, ()=>{
      console.log("overlap");
      gameState = "end";
    })
     
  }

  else if (gameState == "end") {
    console.log("end");
    scene.velocity.x = 0;
    balloonsGroup.setVelocityXEach(0);

    // obstaclesGroup.setVelocityXEach (0);

     restartButton = createButton('Restart');
     restartButton.position(width/2, height/2);

  }

  dave.collide(invisibleGround);

  drawSprites();
  textSize(20);
  textAlign(CENTER);
  fill ("green");
  text ("Score : " + score, width - 200, 100);
}



function keyPressed() {
  if (keyCode === 32) {
   dave.velocity.y = -12;
  } 
}

function spawnObstacles() {
  if(frameCount%100==0){
    var obstacle = createSprite( width-10, height-100, 20, 20);
    obstacle.velocity.x = -10;
    obstacle.scale = 0.15;
    obstacle.addImage(obs2_img);

    obstacle.lifetime = - Math.round(width/obstacle.velocity.x)
    
    obstaclesGroup.add(obstacle);

  }
 
}

function spawnBalloons() {
  if(frameCount%120 == 0) {
    var balloon = createSprite(width, height/2-250, 20, 20);

    balloon.velocity.x = -10;
    balloon.y = random(height/2-250 , height/2 - 150);

    rand  = Math.round(random(1, 4));

    switch(rand){
      case 1: balloon.addImage(balloon1_img);
        break;

      case 2: balloon.addImage(balloon2_img);
        break;

      case 3: balloon.addImage(balloon3_img);
        break;

      case 4: balloon.addImage(balloon5_img);
        break;

      default: break;

    }
    balloon.lifetime = - Math.round(width/balloon.velocity.x)
    console.log(balloon.lifetime);
    balloonsGroup.add(balloon);
  }
}

