var ironman, ironmanImage;
var bg, bgImg;
var stoneImage, stoneGroup;
var diamondImage, diamondGroup;
var diamondScore = 0;
var obstacleGroup, spikesObstacleImage;

function preload() {
  bgImg = loadImage("images/bg.jpg");
  ironmanImage = loadImage("images/iron.png");
  stoneImage = loadImage("images/stone.png");
  diamondSound = loadSound("sounds/coinSound.mp3");
  diamondImage = loadImage("images/diamond.png");
  spikesObstacleImage = loadImage("images/spikes.png");
  dieSound = loadSound("sounds/dieSound.mp3");
}

function setup() {
  createCanvas(1000, 600);
  bg = createSprite(580, 300);
  bg.addImage(bgImg);
  bg.scale = 2;
  bg.velocityX = -6;

  ironman = createSprite(200, 505, 20, 50);
  ironman.addImage(ironmanImage);
  ironman.scale = 0.3;

  ironman.debug = true;
  ironman.setCollider("rectangle", 100, 0, 200, 400);

  ground = createSprite(200, 585, 400, 10);
  ground.visible = false;

  stoneGroup = new Group();
  diamondGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {

  if (bg.x < 100) {
    bg.x = bg.width / 4;
  }

  if (ironman.x < 200) {
    ironman.x= 200;
  }
  if (ironman.y < 50) {
    ironman.y = 50;
  }

  if (keyDown("up")) {
    ironman.velocityY = -10;
  }

  //  if (keyDown("left")){
  //  ironman.x = velocity.x =-5;
  //  }

  //  if (keyDown("right")){
  //    ironman.x = velocity.x = +5;
  //  }

  ironman.velocityY = ironman.velocityY + 0.5;


  generateStone();

  for (var i = 0; i < (stoneGroup).length; i++) {
    var temp = (stoneGroup).get(i);
    if (temp.isTouching(ironman)) {
      ironman.collide(temp);
    }
  }
  generateObstacles();

  generatediamonds();
  for (var i = 0; i < (diamondGroup).length; i++) {
    var temp = (diamondGroup).get(i);

    if (temp.isTouching(ironman)) {
      diamondSound.play();
      diamondScore++;
      temp.destroy();
      temp = null;
    }

  }

  ironman.collide(ground);

  drawSprites();
  textSize(20);
  fill("red")
  text("diamonds Collected: " + diamondScore, 500, 50);

}


function generateStone() {

  if (frameCount % 70 === 0) {
    var stone = createSprite(1200, 120, 40, 10);
    stone.y = random(50, 450)
    stone.addImage(stoneImage)
    stone.scale = 0.5;
    stone.velocityX = -5;
    stone.lifetime = 250;
    stoneGroup.add(stone);
  }


}
function generatediamonds() {
  if (frameCount % 50 === 0) {
    var diamond = createSprite(1200, 120, 40, 10);
    diamond.addImage(diamondImage)
    diamond.y = Math.round(random(80, 350));
    diamond.scale = 0.5;
    diamond.velocityX = -3;
    diamond.lifetime = 1200;
    diamondGroup.add(diamond);
  }
}
function generateObstacles() {
  if (frameCount % 100 === 0) {
    var obstacle = createSprite(1200, 545, 10, 40);
    obstacle.velocityX = -4;
    obstacle.scale = 0.5;
    var rand = Math.round(random(1));
    switch (rand) {
      case 1:
        obstacle.addAnimation("spikes", spikesObstacleImage);
        break;
        default:
          break;
    }
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);


  }
}

